import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { resumeData } from '../src/data/resumeData.js';
import { renderResume } from './resume-template.mjs';

const candidates = [
  process.env.RESUME_CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  process.env.PROGRAMFILES && `${process.env.PROGRAMFILES}/Google/Chrome/Application/chrome.exe`,
  process.env.LOCALAPPDATA && `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
];
const executablePath = candidates.find(candidate => candidate && existsSync(candidate));
if (!executablePath) throw new Error('Install Chrome or set RESUME_CHROME_PATH to your Chrome executable.');

const css = await readFile(new URL('./resume.css', import.meta.url), 'utf8');
const output = fileURLToPath(new URL(`../public/${resumeData.personal.resumeFile}`, import.meta.url));
await mkdir(new URL('../public/', import.meta.url), { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true, args: ['--disable-gpu'] });
try {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.emulateMedia({ media: 'print' });
  await page.setContent(renderResume(resumeData, css));
  await page.evaluate(() => document.fonts.ready);
  const height = await page.locator('main').evaluate(element => element.getBoundingClientRect().height);
  const usableHeight = (297 - 26) * 96 / 25.4;
  if (height > usableHeight) throw new Error(`Resume exceeds one A4 page (${Math.ceil(height)}px / ${Math.floor(usableHeight)}px). Edit the content or layout before exporting.`);
  await page.pdf({ path: output, format: 'A4', preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, tagged: true, outline: true });
  console.log(`Created ${output} (${Math.ceil(height)}px of ${Math.floor(usableHeight)}px available).`);
} finally {
  await browser.close();
}
