// @ts-nocheck
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, quiet: true });
}

function requireEnv(names: string[]): void {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 70);
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function outputDirFor(provider: string): string {
  const dir = path.join(process.cwd(), '.tmp', 'keyword-providers', provider);
  ensureDir(dir);
  return dir;
}

function readJsonIfPossible(filePath: string): any | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
  } catch {
    return null;
  }
}

function findExistingProviderResult(provider: string, request: any): string | null {
  const dir = path.join(process.cwd(), '.tmp', 'keyword-providers', provider);
  if (!fs.existsSync(dir)) return null;

  const matches = fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('.json'))
    .map((file: string) => {
      const fullPath = path.join(dir, file);
      const data = readJsonIfPossible(fullPath);
      return {
        fullPath,
        mtime: fs.statSync(fullPath).mtimeMs,
        data,
      };
    })
    .filter((entry: any) => {
      const data = entry.data;
      if (!data || data.raw?.dryRun) return false;
      return data.source === provider
        && String(data.seed || '').toLowerCase().trim() === String(request.seed || '').toLowerCase().trim()
        && String(data.country || 'es').toLowerCase() === String(request.country || 'es').toLowerCase()
        && String(data.language || 'es').toLowerCase() === String(request.language || 'es').toLowerCase()
        && Array.isArray(data.keywords);
    })
    .sort((a: any, b: any) => b.mtime - a.mtime);

  return matches[0] ? path.relative(process.cwd(), matches[0].fullPath) : null;
}

function timestampForFile(date = new Date()): string {
  return date.toISOString().replace(/[:.]/g, '-').replace('T', '-').slice(0, 19);
}

function saveProviderResult(result: any): string {
  const dir = outputDirFor(result.source);
  const filename = `${timestampForFile()}-${slugify(result.seed)}.json`;
  const fullPath = path.join(dir, filename);
  fs.writeFileSync(fullPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  return path.relative(process.cwd(), fullPath);
}

function dedupeKeywords(keywords: any[]): any[] {
  const byKeyword = new Map<string, any>();

  for (const item of keywords) {
    const key = String(item.keyword || '').toLowerCase().trim();
    if (!key) continue;

    const current = byKeyword.get(key);
    if (!current) {
      byKeyword.set(key, item);
      continue;
    }

    const currentVolume = Number(current.volume || 0);
    const nextVolume = Number(item.volume || 0);
    if (nextVolume > currentVolume) byKeyword.set(key, item);
  }

  return Array.from(byKeyword.values());
}

function postJson(hostname: string, pathName: string, headers: Record<string, string>, body: unknown, timeoutMs = 60000): Promise<unknown> {
  const https = require('https');
  const payload = typeof body === 'string' ? body : JSON.stringify(body);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      path: pathName,
      method: 'POST',
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: timeoutMs,
    }, (res: any) => {
      let data = '';
      res.on('data', (chunk: any) => { data += chunk; });
      res.on('end', () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 2000)}`));
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error(`Invalid JSON response: ${data.slice(0, 500)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

module.exports = {
  dedupeKeywords,
  findExistingProviderResult,
  postJson,
  requireEnv,
  saveProviderResult,
  slugify,
};
