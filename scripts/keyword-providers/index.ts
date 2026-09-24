// @ts-nocheck
const { dataForSeoAdapter } = require('./dataforseo-adapter');
const { googleAdsAdapter } = require('./google-ads-adapter');

const adapters: Record<string, any> = {
  dataforseo: dataForSeoAdapter,
  'google-ads': googleAdsAdapter,
};

function getKeywordProvider(provider: string): any {
  const adapter = adapters[provider];
  if (!adapter) {
    throw new Error(`Provider "${provider}" is not implemented in the unified collector yet.`);
  }
  return adapter;
}

function listKeywordProviders(): any[] {
  return Object.values(adapters);
}

module.exports = {
  getKeywordProvider,
  listKeywordProviders,
};
