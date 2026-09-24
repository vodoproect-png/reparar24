# Reparar24 Offpage Conveyor

## Цель

Построить управляемый конвейер внешней оптимизации для Reparar24: ссылки,
локальные упоминания, citations, партнерские размещения, PR и блоговые материалы.
Режим работы: агрессивный на 50-60%, но без явных схем, которые могут поставить
домен под фильтр.

## Главный принцип

Мы не имитируем ссылочный профиль мусорными сетками. Мы ускоряем появление
реальных упоминаний и ссылок там, где Reparar24 выглядит естественно:

- локальные каталоги и карты;
- площадки по ремонту, дому, ЖКХ, недвижимости;
- городские медиа и локальные блоги;
- партнеры, поставщики, агрегаторы услуг;
- экспертные статьи, чек-листы и исследования цен;
- безопасные paid placements с `rel="sponsored"` или `nofollow`, если площадка
  требует оплату за публикацию.

## Уровни Серости

| Level | Подход | Использование |
| --- | --- | --- |
| White | GBP, citations, партнеры, полезные материалы, PR | Всегда разрешено |
| Light Grey | платные локальные публикации, niche edits на живых сайтах, гостевые статьи | Разрешено после скоринга |
| Controlled Grey | небольшая доля paid dofollow на живых тематических сайтах без явного footprint | Только вручную, лимитировано |
| Black | PBN-сетки, массовые exact-match анкоры, автоматические каталоги, взломанные ссылки, doorway-сети | Запрещено |

Текущий режим: `aggressiveManaged`.

## Быстрый Буст

Приоритеты для роста коммерции:

1. Google Business Profile, отзывы и NAP-consistency.
2. Локальные citations по Испании и Валенсии.
3. Конкурентные доноры через DataForSEO Backlinks.
4. Локальные СМИ и тематические блоги под страницы категорий.
5. Партнерские страницы: поставщики, управляющие компании, ремонтные команды,
   магазины материалов, ассоциации.
6. Linkable assets для будущего блога: цены, чек-листы, аварийные инструкции.

## Конвейер

```text
competitors -> backlinks collection -> prospect normalization -> scoring
-> outreach brief -> placement registry -> anchor/risk audit -> monitoring
```

## Структура

```text
data/offpage/
  anchor-policy.ts
  competitors.ts
  citations.ts
  placements.ts
  prospects.ts

scripts/offpage/
  audit-anchor-risk.ts
  score-prospects.ts
  collect-competitor-backlinks.ts
```

## Политика Анкоров

Базовое распределение:

- 50-70% brand/naked: `Reparar24`, `reparar24.es`, URL.
- 15-25% generic: `ver servicio`, `más información`, `contactar`.
- 10-20% partial: `fontaneros en Valencia`, `servicio de desatascos`.
- 0-5% exact commercial: `fontanero urgente Valencia`, `electricista 24 horas`.

Exact match не ставим пачками и не используем на слабых доменах.

## Risk Score

`riskScore` от 0 до 100:

- 0-25: безопасно;
- 26-45: рабочая серая зона;
- 46-65: только вручную;
- 66+: отклонить или пометить как toxic.

Факторы риска:

- нерелевантная тематика;
- страна/язык не совпадают с Испанией/испанским;
- много outbound links;
- подозрительные анкоры;
- sitewide/footer/sidebar размещение;
- PBN footprint;
- отсутствие индексации;
- одинаковые шаблоны статей;
- платный dofollow без редакционного контекста.

## Целевые Страницы

Приоритет коммерции:

1. `/`
2. `/fontanero`
3. `/electricista`
4. `/desatascos`
5. `/aire-acondicionado`
6. `/calefaccion`
7. `/limpieza-tuberias`

Дочерние и geo-страницы продвигаем точечно, только когда есть релевантный донор
или локальный контекст.

## Правила Размещений

- Один донор не должен давать пачку ссылок на все категории сразу.
- На одну категорию не ставим одинаковые анкоры с разных доноров.
- Коммерческие exact-match анкоры допускаются только на сильных и релевантных
  страницах.
- Платные публикации без редакционной ценности идут в `sponsored`/`nofollow`.
- Каждое размещение фиксируется в `data/offpage/placements.ts`.
- Каждый prospect проходит `npm run offpage:score`.
- Перед новой волной запускается `npm run offpage:audit-anchor`.

## Первая Волна

Цель: 60-80 безопасных и управляемо-серых упоминаний.

- 25-35 citations/NAP;
- 10-15 локальных каталогов Валенсии;
- 10 партнерских/поставщицких упоминаний;
- 10 тематических статей;
- 5 PR/локальных новостных публикаций;
- 3-5 ссылок на linkable assets после запуска блога.

## BuzzStream

BuzzStream используется как outreach-движок, а Reparar24 repo остается источником
решений: донор, риск, target URL, анкор, rel policy, оффер и сообщение.

Официальная интеграция BuzzStream API v1.0 использует OAuth 1.0a. Для своего
аккаунта нужен two-legged flow: `BUZZSTREAM_CONSUMER_KEY` и
`BUZZSTREAM_CONSUMER_SECRET` в `.env.local`.

Команды:

```text
npm run offpage:outreach
npm run offpage:buzzstream:export
npm run offpage:buzzstream:check
```

Экспорт для импорта в BuzzStream:

```text
.tmp/offpage/buzzstream/buzzstream-import-wave-1.csv
```

До подключения API-ключей CSV-экспорт является основным безопасным способом
загрузить первую волну в BuzzStream. После добавления OAuth-ключей проверяем
доступ:

```text
npm run offpage:buzzstream:check -- --execute
```

## Что Собирать В DataForSEO

- backlinks конкурентов;
- referring domains;
- anchors;
- new/lost links;
- domain/page intersection;
- страницы, куда конкуренты получают ссылки.

Команда коллектора по умолчанию не делает API-вызов. Реальный сбор:

```text
npm run offpage:collect-backlinks -- --execute
```

Секреты берутся из env и не выводятся в консоль.

Если DataForSEO возвращает `Access denied` для Backlinks API, значит активен
обычный API-баланс, но не подключена Backlinks subscription. В этом случае
конвейер продолжает первую волну через citations, партнеров и ручной outreach,
а конкурентный backlink gap запускается после подключения подписки.
