#!/usr/bin/env ts-node

const fs = require('fs')

const { gbpProfile } = require('../../data/gbp/profile')
const { gbpServices } = require('../../data/gbp/services')
const { gbpPostCalendar } = require('../../data/gbp/posts')
const { gbpPhotoPlan } = require('../../data/gbp/photos')
const { gbpReviewReplyTemplates } = require('../../data/gbp/reviews')

type Finding = {
  severity: 'info' | 'warn' | 'error'
  area: string
  message: string
}

const findings: Finding[] = []

function addFinding(severity: Finding['severity'], area: string, message: string) {
  findings.push({ severity, area, message })
}

function auditProfile() {
  if (!gbpProfile.businessName || /fontanero|electricista|desatascos/i.test(gbpProfile.businessName)) {
    addFinding('error', 'profile', 'business name must be real brand/legal name without keyword stuffing')
  }

  if (!gbpProfile.website?.startsWith('https://reparar24.es')) {
    addFinding('error', 'profile', 'website must point to reparar24.es')
  }

  if (!gbpProfile.phone?.includes('642 310 813')) {
    addFinding('error', 'profile', 'phone must match Reparar24 public phone')
  }

  if (!gbpProfile.address?.city || !gbpProfile.address?.region) {
    addFinding('error', 'profile', 'address city/region is required')
  }

  if (!gbpProfile.serviceAreas?.includes('Valencia')) {
    addFinding('error', 'profile', 'Valencia must be included in service areas')
  }

  if (gbpProfile.secondaryCategoryHints.length < 4) {
    addFinding('warn', 'profile', 'secondary category hints should cover all main services')
  }

  addFinding('info', 'profile', `${gbpProfile.serviceAreas.length} service areas configured`)
}

function auditServices() {
  const urls = new Set<string>()
  const duplicateUrls = new Set<string>()

  for (const service of gbpServices) {
    if (urls.has(service.url)) duplicateUrls.add(service.url)
    urls.add(service.url)

    if (!service.name || service.name.length > 80) {
      addFinding('warn', 'services', `${service.id} service name is missing or long`)
    }

    if (!service.description || service.description.length < 80) {
      addFinding('warn', 'services', `${service.id} description is too short`)
    }

    if (!service.url.startsWith('https://reparar24.es')) {
      addFinding('error', 'services', `${service.id} URL must stay on reparar24.es`)
    }
  }

  if (duplicateUrls.size) {
    addFinding('warn', 'services', `duplicate service URLs: ${Array.from(duplicateUrls).join(', ')}`)
  }

  addFinding('info', 'services', `${gbpServices.length} GBP services configured`)
}

function auditPosts() {
  const ids = new Set<string>()
  const duplicateIds = new Set<string>()

  for (const post of gbpPostCalendar) {
    if (ids.has(post.id)) duplicateIds.add(post.id)
    ids.add(post.id)

    if (post.body.length < 120) {
      addFinding('warn', 'posts', `${post.id} body is short`)
    }

    if (!post.url.startsWith('https://reparar24.es')) {
      addFinding('error', 'posts', `${post.id} URL must stay on reparar24.es`)
    }
  }

  if (duplicateIds.size) {
    addFinding('error', 'posts', `duplicate post IDs: ${Array.from(duplicateIds).join(', ')}`)
  }

  addFinding('info', 'posts', `${gbpPostCalendar.length} posts configured`)
}

function auditPhotos() {
  for (const photo of gbpPhotoPlan) {
    if (photo.suggestedFile && !fs.existsSync(photo.suggestedFile)) {
      addFinding('warn', 'photos', `${photo.id} suggested file not found: ${photo.suggestedFile}`)
    }
  }

  const highPriority = gbpPhotoPlan.filter((photo: any) => photo.priority === 'high').length
  if (highPriority < 3) {
    addFinding('warn', 'photos', 'at least 3 high-priority GBP photos are recommended')
  }

  addFinding('info', 'photos', `${gbpPhotoPlan.length} photo tasks configured`)
}

function auditReviews() {
  const ratings = new Set(gbpReviewReplyTemplates.map((template: any) => template.rating))
  for (const rating of [1, 3, 4, 5]) {
    if (!ratings.has(rating)) {
      addFinding('warn', 'reviews', `missing reply template for rating ${rating}`)
    }
  }

  addFinding('info', 'reviews', `${gbpReviewReplyTemplates.length} review reply templates configured`)
}

function printFindings() {
  const bySeverity = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Google Business Profile readiness audit')
  console.log('=======================================')

  for (const severity of ['error', 'warn', 'info'] as const) {
    if (!bySeverity[severity].length) continue

    console.log(`\n${severity.toUpperCase()}`)
    for (const finding of bySeverity[severity]) {
      console.log(`- [${finding.area}] ${finding.message}`)
    }
  }

  console.log(
    `\nSummary: ${bySeverity.error.length} errors, ${bySeverity.warn.length} warnings, ${bySeverity.info.length} info`
  )

  if (bySeverity.error.length > 0) {
    process.exitCode = 1
  }
}

auditProfile()
auditServices()
auditPosts()
auditPhotos()
auditReviews()
printFindings()
