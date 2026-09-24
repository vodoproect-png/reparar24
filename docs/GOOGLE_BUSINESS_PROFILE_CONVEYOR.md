# Google Business Profile Conveyor

## Purpose

Build a local SEO conveyor for Reparar24 around Google Business Profile (GBP).
The system should work without daily owner involvement:

1. keep NAP and service data consistent;
2. prepare services, posts, photos and review replies;
3. audit profile readiness;
4. export manual-ready CSV/JSON tasks now;
5. switch to API sync when Google approves GBP API access.

## Current Mode

`manual-ready / api-ready`

Google Business Profile APIs require access approval. Until API access is
approved, the repo generates all data needed for manual updates. Once approved,
the same data can be sent through API adapters.

## Why GBP Matters

For Reparar24, GBP is one of the fastest clean external SEO levers:

- local pack visibility in Valencia;
- trust signals: reviews, photos, service areas, opening hours;
- direct calls and website clicks;
- entity consistency between website, citations and Google;
- proof that Reparar24 operates locally, not only as a generated SEO site.

## Conveyor

```text
business profile data
-> service catalog
-> post calendar
-> photo plan
-> review reply queue
-> readiness audit
-> manual CSV/JSON export
-> API sync when approved
```

## Files

```text
data/gbp/
  profile.ts
  services.ts
  posts.ts
  photos.ts
  reviews.ts

scripts/gbp/
  audit-gbp-readiness.ts
  export-gbp-manual-tasks.ts
```

## Required Profile Data

- business name: ATG S.L. (trade name: Reparar24)
- website: https://reparar24.es
- phone: +34 642 310 813
- address: Calle Navas de Tolosa, 9, 46901 Torrent, Valencia, Espana
- service area: Valencia and nearby districts/cities
- primary category: home repair / plumber category depending on GBP availability
- secondary categories: electrician, air conditioning, heating, drain cleaning
- opening hours: 24/7 for emergency categories

## Content Rules

- No keyword stuffing in business name.
- Use real NAP only.
- Posts must be local, practical and service-specific.
- Photos must represent branded technician/vehicle/service context.
- Review replies must be natural, short and never reveal private customer data.

## API Access

When Google approves GBP API access, add credentials to `.env.local`:

```text
GBP_ACCOUNT_ID=
GBP_LOCATION_ID=
GBP_CLIENT_ID=
GBP_CLIENT_SECRET=
GBP_REFRESH_TOKEN=
GBP_API_VERSION=v1
```

Until then, use exports:

```text
npm run gbp:audit
npm run gbp:export
```

Outputs:

```text
.tmp/gbp/gbp-manual-tasks.json
.tmp/gbp/gbp-services.csv
.tmp/gbp/gbp-post-calendar.csv
.tmp/gbp/gbp-photo-plan.csv
```

## Weekly Operating Rhythm

Every week:

1. publish 2 GBP posts;
2. upload 3-5 relevant photos;
3. reply to all new reviews;
4. check NAP consistency;
5. compare calls/clicks/direction requests;
6. update service list only when website/service pages change.

## First 30 Days

- Complete/verify GBP profile.
- Add all core services.
- Add branded photos for homepage and service categories.
- Publish 8 posts:
  - emergency plumbing;
  - urgent electrician;
  - drain cleaning;
  - air conditioning;
  - heating;
  - pipe cleaning;
  - service areas in Valencia;
  - warranty/response time.
- Build review request process after each completed job.
