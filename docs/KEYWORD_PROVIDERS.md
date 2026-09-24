# Keyword Providers

This project should not depend on Ahrefs as the only semantic source.

Target flow:

```text
seed-list
  -> provider adapters
  -> normalized keyword schema
  -> dedupe
  -> classifier
  -> semantic-review
  -> page-registry conveyor
```

Implemented provider layer:

- `dataforseo`: Google Ads-backed keyword suggestions through DataForSEO.
- `google-ads`: official Google Ads API `KeywordPlanIdeaService.GenerateKeywordIdeas` through REST + OAuth refresh token.

Safety rules:

- Provider collectors write only to `.tmp/keyword-providers`.
- They do not modify `data/seo`, routes, sitemap, or production content.
- Real external calls require `--execute`.
- Dry-run is the default.
- DataForSEO uses Standard Queue (`task_post` + `task_get`), not Live Mode.
- Execute mode skips already collected provider/seed/country/language results unless `--force` is passed.

Useful commands:

```bash
npm run collect:keywords -- --providers
npm run collect:keywords -- --provider dataforseo --seed "videoportero valencia" --limit 100
npm run collect:keywords -- --provider dataforseo --seed "videoportero valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "fontanero valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "fontanero valencia" --limit 100 --execute --force
npm run collect:keywords -- --provider google-ads --seed "videoportero valencia" --limit 100
npm run collect:keywords -- --provider google-ads --seed "videoportero valencia" --limit 100 --execute
npm run collect:keywords:hybrid -- --seed "fontanero valencia" --limit 100 --execute
npm run normalize:keywords -- --input .tmp/keyword-providers/dataforseo/<file>.json
```

DataForSEO queue defaults:

- `--poll-ms 10000`
- `--max-polls 18`
- `--force` is required to intentionally recollect an already saved real result.

Fontanero starter seeds:

```bash
npm run collect:keywords -- --provider dataforseo --seed "fontanero valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "reparacion fugas agua valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "desatascos valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "instalacion fontaneria valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "sustitucion tuberias valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "termo electrico valencia" --limit 100 --execute
npm run collect:keywords -- --provider dataforseo --seed "mantenimiento fontaneria valencia" --limit 100 --execute
```

Google Ads setup:

```env
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
GOOGLE_ADS_REFRESH_TOKEN=
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=
```

Defaults:

- country `es` maps to `geoTargetConstants/2724` (Spain).
- language `es` maps to `languageConstants/1003` (Spanish).
- live calls require `--execute`.

How to get Google Ads credentials:

1. Create or use a Google Ads account.
2. Request a Google Ads API developer token in Google Ads API Center.
3. Create an OAuth client in Google Cloud Console.
4. Generate a refresh token with the `https://www.googleapis.com/auth/adwords` scope.
5. Put the values in `.env.local`.

Notes:

- `GOOGLE_ADS_CUSTOMER_ID` is the account used for keyword ideas.
- `GOOGLE_ADS_LOGIN_CUSTOMER_ID` is only needed when authenticating through a manager account.

## Hybrid workflow

Use `collect:keywords:hybrid` when a seed needs both broad expansion and
Google validation:

- DataForSEO runs through the Standard Queue and expands the seed cheaply.
- Google Ads validates the same seed with Keyword Planner metrics.
- The merged output is saved to `.tmp/keyword-providers/hybrid/`.
- Each keyword includes `googleValidated`, provider-specific volume/CPC/competition
  fields and `priorityScore`.

This keeps the production semantic map untouched until the merged keyword set is
reviewed, clustered and promoted through the normal semantic pipeline.
- Remove dashes from customer IDs or leave them with dashes; the script normalizes both.

Next integration step:

After normalization, classify the output with the existing classifier:

```bash
npm run classify:ahrefs -- --input .tmp/ahrefs/<normalized-file>.json --service electricista
```
