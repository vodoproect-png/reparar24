/**
 * AI Answer Block Component
 * 
 * Optimized for:
 * - Google AI Overviews
 * - Featured Snippets
 * - Conversational Search
 * - LLM Extraction
 * 
 * Structure follows best practices for AI-friendly content:
 * - Direct answer first
 * - Semantic HTML
 * - Clear hierarchy
 * - Concise, conversational tone
 */

import React from 'react'

interface AIAnswerBlockProps {
  question: string
  answer: string
  detailedAnswer?: string
  className?: string
}

export function AIAnswerBlock({ 
  question, 
  answer, 
  detailedAnswer,
  className = '' 
}: AIAnswerBlockProps) {
  return (
    <div className={`ai-answer-block ${className}`} itemScope itemType="https://schema.org/Question">
      <h3 
        className="text-xl font-semibold text-neutral-900 mb-3"
        itemProp="name"
      >
        {question}
      </h3>
      
      <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
        {/* Direct Answer - Optimized for AI Extraction */}
        <p 
          className="text-lg text-neutral-700 font-medium mb-4"
          itemProp="text"
        >
          {answer}
        </p>
        
        {/* Detailed Answer - Optional Expansion */}
        {detailedAnswer && (
          <div className="text-base text-neutral-600 leading-relaxed">
            {detailedAnswer}
          </div>
        )}
      </div>
    </div>
  )
}

interface AIAnswerListProps {
  questions: Array<{
    question: string
    answer: string
    detailedAnswer?: string
  }>
  className?: string
}

export function AIAnswerList({ questions, className = '' }: AIAnswerListProps) {
  return (
    <section className={`ai-answer-list space-y-8 ${className}`}>
      {questions.map((qa, index) => (
        <AIAnswerBlock
          key={index}
          question={qa.question}
          answer={qa.answer}
          detailedAnswer={qa.detailedAnswer}
        />
      ))}
    </section>
  )
}

/**
 * Common AI-optimized Q&A for Reparar24
 */

/**
 * DEPRECATED: Generic emergency questions removed due to SEO contamination.
 * Issue: Hardcoded city names (Valencia) appearing on pages for other cities (Madrid, Barcelona).
 * Solution: Use context-aware semantic generators instead.
 * 
 * This object is kept empty to prevent build errors from existing imports.
 * DO NOT add content here - use page-specific semantic generators.
 */
export const commonEmergencyQuestions = {
  es: [],
  en: [],
  ru: []
}
