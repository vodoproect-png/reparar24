/**
 * Robots directives utilities
 */

export interface RobotsConfig {
  index?: boolean
  follow?: boolean
  noarchive?: boolean
  nosnippet?: boolean
  noimageindex?: boolean
  maxSnippet?: number
  maxImagePreview?: 'none' | 'standard' | 'large'
  maxVideoPreview?: number
}

/**
 * Generate robots meta tag content
 */
export function generateRobotsDirective(config: RobotsConfig): string {
  const directives: string[] = []

  if (config.index === false) directives.push('noindex')
  if (config.follow === false) directives.push('nofollow')
  if (config.noarchive) directives.push('noarchive')
  if (config.nosnippet) directives.push('nosnippet')
  if (config.noimageindex) directives.push('noimageindex')
  
  if (config.maxSnippet !== undefined) {
    directives.push(`max-snippet:${config.maxSnippet}`)
  }
  
  if (config.maxImagePreview) {
    directives.push(`max-image-preview:${config.maxImagePreview}`)
  }
  
  if (config.maxVideoPreview !== undefined) {
    directives.push(`max-video-preview:${config.maxVideoPreview}`)
  }

  return directives.join(', ')
}

/**
 * Default SEO-friendly robots config
 */
export const defaultRobotsConfig: RobotsConfig = {
  index: true,
  follow: true,
  maxImagePreview: 'large',
  maxSnippet: -1,
  maxVideoPreview: -1,
}

/**
 * Noindex config (for duplicate content, thin pages)
 */
export const noindexRobotsConfig: RobotsConfig = {
  index: false,
  follow: true,
}
