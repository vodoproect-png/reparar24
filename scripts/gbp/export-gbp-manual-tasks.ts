#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

const { gbpProfile } = require('../../data/gbp/profile')
const { gbpServices } = require('../../data/gbp/services')
const { gbpPostCalendar } = require('../../data/gbp/posts')
const { gbpPhotoPlan } = require('../../data/gbp/photos')
const { gbpReviewReplyTemplates } = require('../../data/gbp/reviews')

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, '.tmp', 'gbp')

function csvEscape(value: unknown): string {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

function writeCsv(fileName: string, headers: string[], rows: any[]) {
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n')

  fs.writeFileSync(path.join(OUT_DIR, fileName), `${csv}\n`, 'utf8')
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const serviceRows = gbpServices.map((service: any) => ({
    Priority: service.priority,
    Category: service.category,
    Name: service.name,
    URL: service.url,
    Price: service.priceHint,
    Description: service.description,
  }))

  const postRows = gbpPostCalendar.map((post: any) => ({
    Week: post.week,
    Type: post.type,
    Title: post.title,
    Body: post.body,
    CTA: post.cta,
    URL: post.url,
    Service: post.serviceId,
  }))

  const photoRows = gbpPhotoPlan.map((photo: any) => ({
    Priority: photo.priority,
    Category: photo.category,
    Title: photo.title,
    SuggestedFile: photo.suggestedFile || '',
    Description: photo.description,
  }))

  const reviewRows = gbpReviewReplyTemplates.map((template: any) => ({
    Rating: template.rating,
    Intent: template.intent,
    Reply: template.reply,
  }))

  const taskRows = [
    {
      Area: 'profile',
      Priority: 'high',
      Task: 'Verify GBP business name, website, phone, address, service areas and categories',
      Payload: JSON.stringify(gbpProfile),
    },
    ...serviceRows.map((row: any) => ({
      Area: 'services',
      Priority: row.Priority,
      Task: `Add or update service: ${row.Name}`,
      Payload: JSON.stringify(row),
    })),
    ...postRows.map((row: any) => ({
      Area: 'posts',
      Priority: 'medium',
      Task: `Publish GBP post week ${row.Week}: ${row.Title}`,
      Payload: JSON.stringify(row),
    })),
    ...photoRows.map((row: any) => ({
      Area: 'photos',
      Priority: row.Priority,
      Task: `Upload photo: ${row.Title}`,
      Payload: JSON.stringify(row),
    })),
  ]

  const jsonPath = path.join(OUT_DIR, 'gbp-manual-tasks.json')
  fs.writeFileSync(
    jsonPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        accessMode: gbpProfile.accessMode,
        profile: gbpProfile,
        counts: {
          services: serviceRows.length,
          posts: postRows.length,
          photos: photoRows.length,
          reviewTemplates: reviewRows.length,
          tasks: taskRows.length,
        },
        services: serviceRows,
        posts: postRows,
        photos: photoRows,
        reviewTemplates: reviewRows,
        tasks: taskRows,
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  writeCsv('gbp-services.csv', ['Priority', 'Category', 'Name', 'URL', 'Price', 'Description'], serviceRows)
  writeCsv('gbp-post-calendar.csv', ['Week', 'Type', 'Title', 'Body', 'CTA', 'URL', 'Service'], postRows)
  writeCsv('gbp-photo-plan.csv', ['Priority', 'Category', 'Title', 'SuggestedFile', 'Description'], photoRows)
  writeCsv('gbp-review-replies.csv', ['Rating', 'Intent', 'Reply'], reviewRows)
  writeCsv('gbp-manual-tasks.csv', ['Area', 'Priority', 'Task', 'Payload'], taskRows)

  console.log('Google Business Profile manual export')
  console.log('=====================================')
  console.log(`Services: ${serviceRows.length}`)
  console.log(`Posts: ${postRows.length}`)
  console.log(`Photos: ${photoRows.length}`)
  console.log(`Review templates: ${reviewRows.length}`)
  console.log(`Tasks: ${taskRows.length}`)
  console.log(`Saved: ${path.relative(ROOT, OUT_DIR)}`)
}

main()
