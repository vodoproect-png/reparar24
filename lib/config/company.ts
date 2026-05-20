/**
 * Centralized Company Configuration
 * 
 * Official business, legal, and financial information.
 * Single source of truth for company data across the application.
 */

export interface CompanyInfo {
  legalName: string
  tradeName: string
  cif: string // Tax ID (Spain)
  nie: string // Foreign ID (Spain)
}

export interface BankingInfo {
  iban: string
  swift: string
  bankName: string
  bankAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}

/**
 * Get official company information
 */
export function getCompanyInfo(): CompanyInfo {
  return {
    legalName: 'Reparar24 S.L.',
    tradeName: 'Reparar24',
    cif: 'B72597370',
    nie: 'Y9860156R',
  }
}

/**
 * Get banking information for payments
 */
export function getBankingInfo(): BankingInfo {
  return {
    iban: 'ES77 0182 7710 4302 0252 3065',
    swift: 'BBVAESMM',
    bankName: 'BBVA Bank',
    bankAddress: {
      street: 'Pintor Sorolla, 1',
      city: 'Valencia',
      postalCode: '46002',
      country: 'Spain',
    },
  }
}

/**
 * Format IBAN for display (with spaces every 4 characters)
 */
export function formatIBAN(iban: string): string {
  return iban.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || iban
}

/**
 * Get IBAN without spaces (for copy functionality)
 */
export function getIBANRaw(): string {
  return getBankingInfo().iban.replace(/\s/g, '')
}
