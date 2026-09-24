# Blog Text Quality Benchmark

Date: 2026-06-18

Purpose: calibrate Reparar24 blog text rules against Spanish SERP articles using DataForSEO Google Spain results and Text.ru metrics.

## Benchmark Findings

Text.ru is useful for external uniqueness and rough SEO-text signals, but its `spamPercent` metric is strict on Spanish text. Spanish SERP articles commonly score in the 69-78 spam range.

Sample SERP benchmark:

| Topic | Example domain | Words | Uniqueness | Water | Spam |
| --- | --- | ---: | ---: | ---: | ---: |
| fuga de agua | occident.com | 1790 | 62.35-72.72% | 1% | 78% |
| fuga de agua | zurich.es | 1625 | 26.49-26.70% | 0% | 76% |
| diferencial | iberdrola.es | 1521 | 38.36% | 0% | 74% |
| aire acondicionado | coolfy.net | 1797 | 0.11% | 1% | 78% |
| tuberia atascada | serveiestacio.com | 1119 | 43.37% | 0% | 74% |
| tuberia atascada | blancosan.com | 798 | 0% | 0% | 72% |

## Reparar24 Rules

- External uniqueness target: 100%.
- Text.ru spam threshold for Spanish content: max 80%.
- Text.ru water threshold: max 1%. Strong Spanish competitors usually score 0-1%, so Reparar24 should stay in the same range.
- Narrow diagnostic article: 900-1200 useful words when the query has one clear answer.
- Standard informational article length: 1200-1600 useful words for service-supporting guides connected to demand.
- Large guide length: 1600-2000 useful words when the topic is broad, competitive, high-value, or has several practical sub-intents.
- Avoid padding. If a topic cannot justify enough useful coverage from the approved keyword set, merge it into a broader guide instead of publishing a thin article.
- Do not force all articles to the lower bound. Length must vary by topic depth, approved keyword coverage, and reader value.
- Keep Copyscape as a second plagiarism/originality check when publishing important article batches.

## Interpretation

Reparar24 should not copy the market average on uniqueness. Several ranking Spanish articles show low Text.ru uniqueness, probably because common advice is heavily repeated across the web. Our editorial advantage is to keep 100% external uniqueness while staying close to the market's natural length and spam range.

For Spanish articles, a spam score around 70-78 is not automatically bad. Treat scores above 80 as a rewrite trigger, especially when local audit also reports repeated phrase pressure.

Informational content should now be planned by topic depth:

- Narrow diagnostic article: 900-1200 words.
- Standard service-supporting guide: 1200-1600 words.
- Competitive pillar guide: 1600-2000 words.
