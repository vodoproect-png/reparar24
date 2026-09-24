// @ts-nocheck
const { dedupeKeywords, postJson, requireEnv } = require('./common');

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25';
const GOOGLE_ADS_HOST = 'googleads.googleapis.com';
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com';

const GEO_TARGETS: Record<string, string> = {
  es: 'geoTargetConstants/2724',
};

const LANGUAGE_TARGETS: Record<string, string> = {
  es: 'languageConstants/1003',
};

function microsToCurrency(value: number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return parsed / 1000000;
}

async function refreshAccessToken(): Promise<string> {
  const raw = await postJson(
    GOOGLE_OAUTH_HOST,
    '/token',
    { 'Content-Type': 'application/x-www-form-urlencoded' },
    new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
      grant_type: 'refresh_token',
    }).toString(),
    30000,
  );

  const accessToken = (raw as any)?.access_token;
  if (!accessToken) {
    throw new Error('Google OAuth response did not include access_token.');
  }
  return accessToken;
}

function normalizeGoogleAds(raw: any, request: any): any[] {
  const results = Array.isArray(raw?.results) ? raw.results : [];
  return dedupeKeywords(results
    .map((item: any) => {
      const metrics = item.keywordIdeaMetrics || {};
      return {
        keyword: String(item.text || '').trim(),
        source: 'google-ads',
        seed: request.seed,
        country: request.country,
        language: request.language,
        volume: metrics.avgMonthlySearches ?? null,
        difficulty: null,
        cpc: microsToCurrency(metrics.highTopOfPageBidMicros ?? metrics.lowTopOfPageBidMicros),
        competition: metrics.competitionIndex ?? null,
        trafficPotential: null,
        raw: item,
      };
    })
    .filter((item: any) => item.keyword));
}

const googleAdsAdapter = {
  id: 'google-ads',
  label: 'Google Ads API KeywordPlanIdeaService',
  requiredEnv: [
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
  ],
  async collect(request: any): Promise<any> {
    if (!request.execute) {
      return {
        source: 'google-ads',
        seed: request.seed,
        country: request.country,
        language: request.language,
        limit: request.limit,
        fetchedAt: new Date().toISOString(),
        endpoint: 'KeywordPlanIdeaService.GenerateKeywordIdeas',
        raw: {
          dryRun: true,
          message: 'Pass --execute to call Google Ads API. Requires developer token, OAuth refresh token and customer ID.',
          requiredEnv: this.requiredEnv,
          request: {
            customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || 'missing',
            geoTargetConstants: [GEO_TARGETS[request.country] || request.country],
            language: LANGUAGE_TARGETS[request.language || 'es'] || request.language,
            keywordSeed: { keywords: [request.seed] },
            pageSize: request.limit,
          },
        },
        keywords: [],
      };
    }

    requireEnv(this.requiredEnv);

    const accessToken = await refreshAccessToken();
    const customerId = String(process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '');
    const endpoint = `/${GOOGLE_ADS_API_VERSION}/customers/${customerId}:generateKeywordIdeas`;
    const loginCustomerId = String(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || '').replace(/-/g, '');

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
      'Content-Type': 'application/json',
    };

    if (loginCustomerId) {
      headers['login-customer-id'] = loginCustomerId;
    }

    const body = {
      language: LANGUAGE_TARGETS[request.language || 'es'] || request.language,
      geoTargetConstants: [GEO_TARGETS[request.country] || request.country],
      includeAdultKeywords: false,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: {
        keywords: [request.seed],
      },
      pageSize: request.limit,
    };

    const raw = await postJson(GOOGLE_ADS_HOST, endpoint, headers, body, 60000);
    const keywords = normalizeGoogleAds(raw, request);

    return {
      source: 'google-ads',
      seed: request.seed,
      country: request.country,
      language: request.language,
      limit: request.limit,
      fetchedAt: new Date().toISOString(),
      endpoint: `https://${GOOGLE_ADS_HOST}${endpoint}`,
      raw,
      keywords,
    };
  },
};

module.exports = { googleAdsAdapter };
