# Google Ads Pilot: Fontanero Valencia

## Goal

Test paid search only for the Fontanero service cluster in Valencia, using existing commercial pages as landing pages. The pilot is designed to collect demand and conversion signals without broad-match budget leakage.

## Safety Rules

- The script creates resources in `PAUSED` status only.
- The script does not support campaign activation.
- Use Google Search only.
- Disable Search Partners and Display Network.
- Use only `EXACT` and `PHRASE` keyword match types.
- Keep the location target to Valencia, Spain.
- Use Spanish language targeting.
- Use conservative manual CPC and daily budget.

## Command

Dry run:

```bash
npm run ads:fontanero:plan
```

Create paused resources:

```bash
npm run ads:fontanero:plan -- --execute
```

Optional budget and CPC:

```bash
npm run ads:fontanero:plan -- --budget-eur 10 --max-cpc-eur 0.80
```

Outputs:

- `.tmp/google-ads/fontanero-valencia-search-pilot-plan.json`
- `.tmp/google-ads/fontanero-valencia-search-pilot-keywords.csv`
- `.tmp/google-ads/fontanero-valencia-search-pilot-execution.json` after `--execute`

## Required Account Context

`GOOGLE_ADS_CUSTOMER_ID` can point to the manager account for keyword research, but campaign creation needs a non-manager client account.

When using a manager account:

```bash
GOOGLE_ADS_CUSTOMER_ID=manager-account-id
GOOGLE_ADS_LOGIN_CUSTOMER_ID=manager-account-id
GOOGLE_ADS_ADVERTISING_CUSTOMER_ID=client-account-id
```

The script checks this before creating a campaign to avoid creating campaign resources in the wrong context.

## Campaign Setup

- Campaign: `R24 | Fontanero | Valencia | Search Test`
- Status: `PAUSED`
- Budget: default `10 EUR/day`
- Max CPC: default `0.80 EUR`
- Network: Google Search only
- Location: Valencia, Spain
- Language: Spanish
- EU political advertising: does not contain political advertising
- Ad groups: one per approved Fontanero child service page

## Position Rule

Google Ads API cannot guarantee exact fourth ad position. The practical equivalent is controlled bidding:

- keep max CPC conservative;
- monitor absolute top impression share;
- avoid bid strategies that chase top position;
- raise or lower CPC only after real impression/click data.

## Negative Keywords

Campaign negatives block non-commercial intent such as jobs, courses, tutorials, PDFs, marketplace product searches and DIY research.

## Launch Checklist

Before enabling anything manually in Google Ads:

- review all final URLs;
- confirm phone/WhatsApp conversion tracking;
- check all ad groups are paused;
- check the daily budget;
- check location is Valencia;
- check location options manually before enabling: prefer presence-based targeting and avoid interest-only reach;
- start with a short observation window and do not enable broad match.
