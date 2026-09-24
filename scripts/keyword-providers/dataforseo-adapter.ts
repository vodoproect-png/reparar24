// @ts-nocheck
const { dedupeKeywords, requireEnv } = require('./common');

const BASE_URL = 'api.dataforseo.com';
const TASK_POST_ENDPOINT = '/v3/keywords_data/google_ads/keywords_for_keywords/task_post';
const TASK_GET_ENDPOINT_PREFIX = '/v3/keywords_data/google_ads/keywords_for_keywords/task_get/';
const QUEUE_MODE = 'standard';

function requestJson(
  hostname: string,
  endpoint: string,
  auth: string,
  method: 'GET' | 'POST',
  body?: unknown,
  timeoutMs = 60000
): Promise<unknown> {
  const https = require('https');
  const payload = body === undefined ? '' : JSON.stringify(body);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      path: endpoint,
      method,
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
      timeout: timeoutMs,
    }, (res: any) => {
      let data = '';
      res.on('data', (chunk: any) => { data += chunk; });
      res.on('end', () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`DataForSEO request failed with status ${res.statusCode}: ${data.slice(0, 300)}`));
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error(`DataForSEO returned invalid JSON: ${data.slice(0, 300)}`));
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getTask(raw: any): any {
  return Array.isArray(raw?.tasks) ? raw.tasks[0] : null;
}

function isPendingTask(task: any): boolean {
  const code = Number(task?.status_code || 0);
  return code === 0 || code === 20100 || code === 40601 || code === 40602;
}

function assertDataForSeoOk(raw: any, context: string): void {
  const code = Number(raw?.status_code || 0);
  const task = getTask(raw);
  const taskCode = Number(task?.status_code || 0);

  if (code >= 40000) {
    throw new Error(`DataForSEO ${context} failed with status_code ${code}: ${raw?.status_message || 'unknown error'}`);
  }

  if (taskCode >= 40000 && !isPendingTask(task)) {
    throw new Error(`DataForSEO ${context} task failed with status_code ${taskCode}: ${task?.status_message || 'unknown task error'}`);
  }
}

function normalizeDataForSeo(raw: any, request: any): any[] {
  const tasks = Array.isArray(raw?.tasks) ? raw.tasks : [];
  const items = tasks.flatMap((task: any) => {
    const results = Array.isArray(task?.result) ? task.result : [];
    return results.flatMap((result: any) => {
      if (Array.isArray(result?.items)) return result.items;
      return result?.keyword ? [result] : [];
    });
  });

  return dedupeKeywords(items
    .map((item: any) => ({
      keyword: String(item?.keyword || '').trim(),
      source: 'dataforseo',
      seed: request.seed,
      country: request.country,
      language: request.language,
      volume: item?.search_volume ?? null,
      difficulty: item?.keyword_difficulty ?? null,
      cpc: item?.cpc ?? null,
      competition: item?.competition ?? null,
      trafficPotential: null,
      raw: item,
    }))
    .filter((item: any) => item.keyword));
}

const dataForSeoAdapter = {
  id: 'dataforseo',
  label: 'DataForSEO Google Ads Keywords Data',
  requiredEnv: ['DATAFORSEO_LOGIN', 'DATAFORSEO_PASSWORD'],
  async collect(request: any): Promise<any> {
    if (!request.execute) {
      return {
        source: 'dataforseo',
        seed: request.seed,
        country: request.country,
        language: request.language,
        limit: request.limit,
        fetchedAt: new Date().toISOString(),
        endpoint: TASK_POST_ENDPOINT,
        queueMode: QUEUE_MODE,
        taskPostEndpoint: TASK_POST_ENDPOINT,
        taskGetEndpoint: `${TASK_GET_ENDPOINT_PREFIX}{id}`,
        raw: {
          dryRun: true,
          message: 'Pass --execute to call DataForSEO Standard Queue.',
          task: {
            keywords: [request.seed],
            location_name: request.country === 'es' ? 'Spain' : request.country,
            language_code: request.language || 'es',
            limit: request.limit,
          },
        },
        keywords: [],
      };
    }

    requireEnv(this.requiredEnv);

    const login = process.env.DATAFORSEO_LOGIN || '';
    const password = process.env.DATAFORSEO_PASSWORD || '';
    const auth = Buffer.from(`${login}:${password}`).toString('base64');

    const body = [{
      keywords: [request.seed],
      location_name: request.country === 'es' ? 'Spain' : request.country,
      language_code: request.language || 'es',
      limit: request.limit,
    }];

    const taskPostRaw = await requestJson(BASE_URL, TASK_POST_ENDPOINT, auth, 'POST', body);
    assertDataForSeoOk(taskPostRaw, 'task_post');

    const taskId = getTask(taskPostRaw)?.id;
    if (!taskId) {
      throw new Error('DataForSEO task_post did not return a task id.');
    }

    let taskGetRaw: any = null;
    const maxPolls = Number(request.maxPolls || 18);
    const pollIntervalMs = Number(request.pollIntervalMs || 10000);

    for (let attempt = 1; attempt <= maxPolls; attempt += 1) {
      if (attempt > 1) await wait(pollIntervalMs);

      taskGetRaw = await requestJson(
        BASE_URL,
        `${TASK_GET_ENDPOINT_PREFIX}${taskId}`,
        auth,
        'GET'
      );
      assertDataForSeoOk(taskGetRaw, 'task_get');

      const task = getTask(taskGetRaw);
      const result = Array.isArray(task?.result) ? task.result : [];
      if (Number(task?.status_code || 0) === 20000 && result.length > 0) {
        break;
      }
    }

    const finalTask = getTask(taskGetRaw);
    const finalResult = Array.isArray(finalTask?.result) ? finalTask.result : [];
    if (!finalTask || Number(finalTask.status_code || 0) !== 20000 || finalResult.length === 0) {
      throw new Error(`DataForSEO task ${taskId} was not ready after ${maxPolls} poll attempts.`);
    }

    const keywords = normalizeDataForSeo(taskGetRaw, request);

    return {
      source: 'dataforseo',
      seed: request.seed,
      country: request.country,
      language: request.language,
      limit: request.limit,
      fetchedAt: new Date().toISOString(),
      endpoint: TASK_POST_ENDPOINT,
      queueMode: QUEUE_MODE,
      taskId,
      taskPostEndpoint: TASK_POST_ENDPOINT,
      taskGetEndpoint: `${TASK_GET_ENDPOINT_PREFIX}${taskId}`,
      raw: {
        taskPost: taskPostRaw,
        taskGet: taskGetRaw,
      },
      keywords,
    };
  },
};

module.exports = { dataForSeoAdapter };
