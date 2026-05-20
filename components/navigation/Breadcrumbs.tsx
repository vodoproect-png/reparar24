import Link from 'next/link'

export interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb navigation component
 * Displays hierarchical navigation path
 * Mobile-friendly and accessible
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="py-3 bg-gray-50">
      <div className="container-custom">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-gray-400" aria-hidden="true">
                    ›
                  </span>
                )}
                {isLast ? (
                  <span className="text-gray-600 font-medium">{item.name}</span>
                ) : (
                  <Link
                    href={item.url}
                    className="text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string = 'https://reparar24.es') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${baseUrl}${item.url}`
    }))
  }
}
