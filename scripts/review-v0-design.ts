#!/usr/bin/env ts-node
/**
 * v0 Design Review Parser
 *
 * PURPOSE:
 * Converts a saved v0 design response into a structured review checklist.
 *
 * SAFETY:
 * - Does NOT call v0 API
 * - Does NOT modify production files
 * - Writes review output only to .tmp/v0-designs/
 */

const fs = require('fs');
const path = require('path');

function showHelp(): void {
  console.log('v0 Design Review Parser - Help');
  console.log('================================\n');
  console.log('USAGE:');
  console.log('  npm run review:v0-design -- --input latest');
  console.log('  npm run review:v0-design -- --input .tmp/v0-designs/file-v0-response.json\n');
  console.log('OPTIONS:');
  console.log('  --input <path|latest>  v0 response JSON, or latest (required)');
  console.log('  --help                 Show this help message\n');
}

function parseArgs(): { input: string } | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const inputIndex = args.indexOf('--input');
  if (inputIndex === -1 || !args[inputIndex + 1]) {
    console.error('Missing required argument: --input\n');
    showHelp();
    process.exit(1);
  }

  return { input: args[inputIndex + 1] };
}

function getLatestResponseFile(): string {
  const dir = path.join(process.cwd(), '.tmp', 'v0-designs');

  if (!fs.existsSync(dir)) {
    throw new Error('No .tmp/v0-designs directory found. Run generate:v0-design first.');
  }

  const files = fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('-v0-response.json'))
    .map((file: string) => ({
      file,
      mtime: fs.statSync(path.join(dir, file)).mtimeMs,
    }))
    .sort((a: any, b: any) => b.mtime - a.mtime);

  if (files.length === 0) {
    throw new Error('No v0 response files found in .tmp/v0-designs.');
  }

  return path.join(dir, files[0].file);
}

function resolveInput(input: string): string {
  if (input === 'latest') return getLatestResponseFile();

  const fullPath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Input file not found: ${input}`);
  }
  return fullPath;
}

function getAssistantText(response: any): string {
  if (typeof response?.chat?.text === 'string' && response.chat.text.trim()) {
    return response.chat.text;
  }

  const assistantMessage = (response?.chat?.messages || [])
    .filter((message: any) => message.role === 'assistant')
    .at(-1);

  if (assistantMessage?.content) return assistantMessage.content;

  throw new Error('Could not find assistant text in v0 response.');
}

function extractSection(text: string, heading: string): string {
  const lines = text.split(/\r?\n/);
  const normalizeHeading = (value: string) => value
    .toLowerCase()
    .replace(/^#+\s*/, '')
    .replace(/^\d+\s*[·.-]\s*/, '')
    .replace(/[^a-z ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const wanted = normalizeHeading(heading);
  const start = lines.findIndex(line =>
    /^##\s+/.test(line.trim()) && normalizeHeading(line).includes(wanted)
  );

  if (start === -1) return '';

  const endOffset = lines
    .slice(start + 1)
    .findIndex(line => /^##\s+/.test(line.trim()));
  const end = endOffset === -1 ? lines.length : start + 1 + endOffset;

  return lines.slice(start + 1, end).join('\n').trim();
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSummaryBullets(text: string): string[] {
  const summary = extractSection(text, 'Summary');
  const numbered = summary
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => /^\d+\.\s+/.test(line))
    .map(line => stripMarkdown(line.replace(/^\d+\.\s+/, '')));

  if (numbered.length > 0) return numbered;

  return summary
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('|') && !line.includes('---') && !line.toLowerCase().includes('gap | impact'))
    .map(line => line.split('|').map(part => stripMarkdown(part)).filter(Boolean))
    .filter(parts => parts.length >= 2)
    .map(parts => `${parts[0]}: ${parts.slice(1).join(' | ')}`);
}

function extractRecommendedChanges(text: string): Array<{
  order: number;
  action: string;
  component: string;
  placement?: string;
  changeType?: string;
  why?: string;
}> {
  const section = extractSection(text, 'Recommended Block Changes');
  const chunks = section
    .split(/(?=^###\s+\d+[a-z]?\b)/m)
    .map(chunk => chunk.trim())
    .filter(Boolean);

  return chunks.map((chunk, index) => {
    const lines = chunk.split(/\r?\n/);
    const title = (lines[0] || '').replace(/^###\s+/, '');
    const titleMatch = title.match(/^\d+[a-z]?\b\s*.*?\b(KEEP|REORDER|EXTEND|ADD|REFACTOR|Keep|Reorder|Extend|Add|Refactor)\b[^`]*`([^`]+)`/i) ||
      title.match(/^\d+\.\s+([A-Z]+)\s+.+?`([^`]+)`/i);
    const whyMatch = chunk.match(/\*\*Why:\*\*\s*([\s\S]*?)(?=\n\n\*\*|$)/);
    const positionMatch = chunk.match(/\*\*Position:\*\*\s*([^\n]+)/);
    const changeTypeMatch = chunk.match(/\*\*Change type:\*\*\s*([^\n]+)/);

    return {
      order: index + 1,
      action: (titleMatch?.[1] || 'REVIEW').toUpperCase(),
      component: titleMatch?.[2] || stripMarkdown(title),
      placement: positionMatch ? stripMarkdown(positionMatch[1]) : undefined,
      changeType: changeTypeMatch ? stripMarkdown(changeTypeMatch[1]) : undefined,
      why: whyMatch ? stripMarkdown(whyMatch[1]) : undefined,
    };
  });
}

function extractWhatNotToChange(text: string): Array<{ block: string; reason: string }> {
  const section = extractSection(text, 'What NOT to Change');
  return section
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('|') && !line.includes('---') && !line.includes('Block | Reason'))
    .map(line => line.split('|').map(part => part.trim()).filter(Boolean))
    .filter(parts => parts.length >= 2)
    .map(parts => ({
      block: stripMarkdown(parts[0]),
      reason: stripMarkdown(parts.slice(1).join(' | ')),
    }));
}

function extractChecklist(text: string): Array<{ phase: string; items: string[] }> {
  const section = extractSection(text, 'Implementation Checklist');
  const codeBlockMatch = section.match(/```[\s\S]*?\n([\s\S]*?)```/);
  const checklistText = codeBlockMatch ? codeBlockMatch[1] : section;
  const lines = checklistText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const phases: Array<{ phase: string; items: string[] }> = [];

  for (const line of lines) {
    if (/^Phase\s+\d+/i.test(line)) {
      phases.push({ phase: stripMarkdown(line), items: [] });
      continue;
    }

    const checkboxMatch = line.match(/^(?:☐|вђ|\[ \]|- \[ \])\s*(.+)$/i);
    if (checkboxMatch && phases.length > 0) {
      phases[phases.length - 1].items.push(stripMarkdown(checkboxMatch[1]));
    }
  }

  return phases;
}

function extractRiskFlags(text: string): string[] {
  const section = extractSection(text, 'Implementation Checklist');
  let riskIndex = section.toLowerCase().indexOf('risk flags:');
  if (riskIndex === -1) {
    riskIndex = section.toLowerCase().indexOf('risks to watch');
  }
  if (riskIndex === -1) return [];

  return section
    .slice(riskIndex)
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('⚠') || line.startsWith('вљ'))
    .map(line => stripMarkdown(line.replace(/^(⚠|вљ |вљ)\s*/, '')));
}

function extractHighestRoi(text: string): string | null {
  const lastParagraph = text
    .split(/\n---\n/)
    .at(-1)
    ?.trim();

  if (lastParagraph && /highest-ROI/i.test(lastParagraph)) {
    return stripMarkdown(lastParagraph);
  }

  const match = text.match(/The highest-ROI[\s\S]*$/i);
  return match ? stripMarkdown(match[0]) : null;
}

function inferServiceAndSlug(response: any): { service?: string; slug?: string } {
  const promptPath = response?.promptPath || '';
  const match = String(promptPath).match(/-(electricista|fontanero)-(.+?)-prompt\.md$/);
  if (!match) return {};

  return {
    service: match[1],
    slug: match[2],
  };
}

function writeReview(inputPath: string, response: any, text: string): string {
  const outputDir = path.dirname(inputPath);
  const baseName = path.basename(inputPath).replace(/-v0-response\.json$/, '-v0-review.json');
  const outputPath = path.join(outputDir, baseName);
  const inferred = inferServiceAndSlug(response);
  const checklist = extractChecklist(text);
  const recommendedChanges = extractRecommendedChanges(text);

  const review = {
    source: 'v0-design-review-parser',
    inputFile: path.relative(process.cwd(), inputPath),
    generatedAt: new Date().toISOString(),
    chat: {
      id: response?.chat?.id,
      webUrl: response?.chat?.webUrl,
      title: response?.chat?.title || response?.chat?.name,
    },
    service: inferred.service,
    slug: inferred.slug,
    summary: extractSummaryBullets(text),
    recommendedChanges,
    whatNotToChange: extractWhatNotToChange(text),
    checklist,
    riskFlags: extractRiskFlags(text),
    highestRoi: extractHighestRoi(text),
    counts: {
      summaryItems: extractSummaryBullets(text).length,
      recommendedChanges: recommendedChanges.length,
      checklistPhases: checklist.length,
      checklistItems: checklist.reduce((sum, phase) => sum + phase.items.length, 0),
      riskFlags: extractRiskFlags(text).length,
    },
  };

  fs.writeFileSync(outputPath, JSON.stringify(review, null, 2), 'utf-8');
  return outputPath;
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const inputPath = resolveInput(options.input);
  const response = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const text = getAssistantText(response);
  const outputPath = writeReview(inputPath, response, text);
  const review = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));

  console.log('v0 Design Review Parser');
  console.log('=======================');
  console.log(`Input: ${path.relative(process.cwd(), inputPath)}`);
  console.log(`Chat: ${review.chat.webUrl || review.chat.id || 'unknown'}`);
  console.log(`Service: ${review.service || 'unknown'}`);
  console.log(`Slug: ${review.slug || 'unknown'}`);
  console.log(`Recommended changes: ${review.counts.recommendedChanges}`);
  console.log(`Checklist phases: ${review.counts.checklistPhases}`);
  console.log(`Checklist items: ${review.counts.checklistItems}`);
  console.log(`Risk flags: ${review.counts.riskFlags}`);
  console.log(`\nSaved review to: ${path.relative(process.cwd(), outputPath)}`);
  console.log('\nNo production files were modified.');
}

try {
  main();
} catch (error: any) {
  console.error(`\nv0 design review failed: ${error.message}\n`);
  process.exit(1);
}
