#!/usr/bin/env ts-node
/**
 * v0 Prompt Sender (SAFE MODE)
 *
 * Sends an existing prompt file to v0 or saves a dry-run artifact.
 *
 * SAFETY:
 * - Requires --dry-run or --api
 * - API mode writes response only to .tmp/v0-designs/
 * - Does NOT modify production files
 * - Does NOT print V0_API_KEY
 */

const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(process.cwd(), '.env.local'), quiet: true });

type Options = {
  promptFile: string;
  mode: 'dry-run' | 'api';
  name: string;
  responseMode: 'sync' | 'async';
};

function showHelp(): void {
  console.log('v0 Prompt Sender');
  console.log('================\n');
  console.log('USAGE:');
  console.log('  npm run send:v0-prompt -- --prompt-file .tmp/v0-designs/file.md --dry-run');
  console.log('  npm run send:v0-prompt -- --prompt-file .tmp/v0-designs/file.md --api\n');
  console.log('OPTIONS:');
  console.log('  --prompt-file <path>  Prompt markdown/text file');
  console.log('  --name <name>         Output base name, optional');
  console.log('  --dry-run             Save prompt copy only, no API call');
  console.log('  --api                 Send prompt to v0 and save response to .tmp');
  console.log('  --async               Return v0 chat immediately instead of waiting for full generation');
  console.log('  --help                Show help');
}

function parseArgs(): Options | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const promptIndex = args.indexOf('--prompt-file');
  const nameIndex = args.indexOf('--name');
  const dryRun = args.includes('--dry-run');
  const api = args.includes('--api');
  const asyncResponse = args.includes('--async');

  if (promptIndex === -1 || !args[promptIndex + 1]) {
    throw new Error('Missing required --prompt-file argument.');
  }

  if (!dryRun && !api) {
    throw new Error('Choose --dry-run or --api.');
  }

  if (dryRun && api) {
    throw new Error('Choose only one mode: --dry-run or --api.');
  }

  const promptFile = args[promptIndex + 1];
  const defaultName = path.basename(promptFile, path.extname(promptFile));

  return {
    promptFile,
    mode: api ? 'api' : 'dry-run',
    name: nameIndex !== -1 && args[nameIndex + 1] ? args[nameIndex + 1] : defaultName,
    responseMode: asyncResponse ? 'async' : 'sync',
  };
}

function ensureOutputDirectory(): string {
  const outputDir = path.join(process.cwd(), '.tmp', 'v0-designs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return outputDir;
}

function resolvePromptPath(promptFile: string): string {
  const fullPath = path.isAbsolute(promptFile) ? promptFile : path.join(process.cwd(), promptFile);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Prompt file not found: ${promptFile}`);
  }
  return fullPath;
}

function safeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'v0-prompt';
}

async function callV0Api(prompt: string, responseMode: 'sync' | 'async'): Promise<any> {
  if (!process.env.V0_API_KEY || !process.env.V0_API_KEY.trim()) {
    throw new Error('V0_API_KEY is missing in .env.local');
  }

  const { v0 } = require('v0-sdk');

  return v0.chats.create({
    message: prompt,
    system: [
      'You are a senior product designer and frontend architect.',
      'Return production-ready React/Tailwind recommendations and code.',
      'Do not claim that repository files were changed.',
      'Do not include secrets or environment variables.',
    ].join(' '),
    chatPrivacy: 'private',
    responseMode,
    modelConfiguration: {
      imageGenerations: false,
      thinking: false,
    },
    metadata: {
      source: 'reparar24-v0-prompt-sender',
    },
  });
}

function sanitizeChatForJson(chat: any): any {
  return {
    id: chat?.id,
    object: chat?.object,
    name: chat?.name,
    title: chat?.title,
    createdAt: chat?.createdAt,
    updatedAt: chat?.updatedAt,
    webUrl: chat?.webUrl,
    latestVersion: {
      id: chat?.latestVersion?.id,
      status: chat?.latestVersion?.status,
      text: chat?.latestVersion?.text,
      files: Array.isArray(chat?.latestVersion?.files)
        ? chat.latestVersion.files.map((file: any) => ({
            name: file.name,
            content: file.content,
          }))
        : [],
    },
  };
}

async function main(): Promise<void> {
  const options = parseArgs();
  if (!options) return;

  const promptPath = resolvePromptPath(options.promptFile);
  const prompt = fs.readFileSync(promptPath, 'utf-8');
  const outputDir = ensureOutputDirectory();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = `${timestamp}-${safeName(options.name)}`;

  const promptOutputPath = path.join(outputDir, `${baseName}-prompt.md`);
  fs.writeFileSync(promptOutputPath, prompt, 'utf-8');

  if (options.mode === 'dry-run') {
    console.log('v0 prompt dry-run saved.');
    console.log(`Prompt: ${path.relative(process.cwd(), promptOutputPath)}`);
    console.log('No API call was made.');
    return;
  }

  const chat = await callV0Api(prompt, options.responseMode);
  const responsePath = path.join(outputDir, `${baseName}-response.json`);
  fs.writeFileSync(responsePath, JSON.stringify(sanitizeChatForJson(chat), null, 2), 'utf-8');

  console.log('v0 API response saved.');
  console.log(`Prompt: ${path.relative(process.cwd(), promptOutputPath)}`);
  console.log(`Response: ${path.relative(process.cwd(), responsePath)}`);
}

main().catch((error: any) => {
  console.error(`\nv0 prompt failed: ${error.message}\n`);
  process.exit(1);
});
