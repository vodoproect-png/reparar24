/**
 * VERCEL PREVIEW PLACEHOLDER PAGE
 * 
 * Minimal non-indexable placeholder for *.vercel.app domains.
 * Prevents duplicate content issues by NOT serving production content on preview URLs.
 * 
 * This page contains:
 * - NO SEO content
 * - NO service information
 * - NO internal links
 * - NO city/district data
 * - NO sitemap references
 * 
 * Only used on non-production domains (*.vercel.app)
 * Production (reparar24.es) serves the full application normally.
 */

export function VercelPreviewPlaceholder() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <title>Reparar24 - Preview Environment</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 16px;
            padding: 48px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }
          h1 {
            font-size: 28px;
            color: #1a202c;
            margin-bottom: 16px;
            font-weight: 600;
          }
          p {
            font-size: 16px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 12px;
          }
          .badge {
            display: inline-block;
            background: #f7fafc;
            border: 2px solid #e2e8f0;
            padding: 8px 16px;
            border-radius: 24px;
            font-size: 14px;
            color: #718096;
            margin-top: 24px;
            font-weight: 500;
          }
          .production-link {
            margin-top: 32px;
            padding-top: 32px;
            border-top: 1px solid #e2e8f0;
          }
          .production-link a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
          }
          .production-link a:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1>🔧 Reparar24</h1>
          <p style={{ fontSize: '18px', fontWeight: 500, color: '#2d3748', marginBottom: '24px' }}>
            Preview Environment
          </p>
          <p>
            This is a non-indexed preview environment.
          </p>
          <p>
            The production website is available at the link below.
          </p>
          <div className="badge">
            Not Indexed
          </div>
          <div className="production-link">
            <a href="https://reparar24.es" rel="noopener noreferrer">
              Visit reparar24.es →
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

/**
 * Generates the placeholder HTML as a string for middleware response
 */
export function getVercelPreviewPlaceholderHTML(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
  <title>Reparar24 - Preview Environment</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 48px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-size: 28px;
      color: #1a202c;
      margin-bottom: 16px;
      font-weight: 600;
    }
    p {
      font-size: 16px;
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .badge {
      display: inline-block;
      background: #f7fafc;
      border: 2px solid #e2e8f0;
      padding: 8px 16px;
      border-radius: 24px;
      font-size: 14px;
      color: #718096;
      margin-top: 24px;
      font-weight: 500;
    }
    .production-link {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid #e2e8f0;
    }
    .production-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
    }
    .production-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔧 Reparar24</h1>
    <p style="font-size: 18px; font-weight: 500; color: #2d3748; margin-bottom: 24px;">
      Preview Environment
    </p>
    <p>
      This is a non-indexed preview environment.
    </p>
    <p>
      The production website is available at the link below.
    </p>
    <div class="badge">
      Not Indexed
    </div>
    <div class="production-link">
      <a href="https://reparar24.es" rel="noopener noreferrer">
        Visit reparar24.es →
      </a>
    </div>
  </div>
</body>
</html>`;
}
