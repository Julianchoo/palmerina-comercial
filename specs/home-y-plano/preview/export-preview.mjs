/**
 * Export the real rendered home as one offline HTML, with its CSS, fonts and
 * optimized images embedded. The canonical plan is copied into a preview-only
 * iframe; production source and the generated public plan are never modified.
 *
 * Start Next.js locally, then run:
 * PREVIEW_URL=http://127.0.0.1:3012 PREVIEW_BROWSER=/path/to/chromium node specs/home-y-plano/preview/export-preview.mjs
 * Playwright already exists in plano-comercial/node_modules; no extra dependency.
 */
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const out = path.join(root, "specs/home-y-plano/preview");
const require = createRequire(path.join(root, "plano-comercial/package.json"));
const { chromium } = require("playwright");
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3012";
const browser = await chromium.launch({
  ...(process.env.PREVIEW_BROWSER ? { executablePath: process.env.PREVIEW_BROWSER } : {}),
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
const externalMapWarnings = [];
const isMapResource = (url) =>
  /^https:\/\/([^/]+\.)?(google\.com|googleapis\.com|gstatic\.com)\//.test(url);
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() !== "error") return;
  if (isMapResource(message.location().url)) externalMapWarnings.push(message.text());
  else errors.push(message.text());
});
page.on("requestfailed", (request) => {
  if (isMapResource(request.url()))
    externalMapWarnings.push(`${request.url()}: ${request.failure()?.errorText}`);
});
await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
});
for (const photo of await page.locator(".home img, main img").all())
  await photo.scrollIntoViewIfNeeded();
await page.waitForFunction(() =>
  [...document.images].every((image) => image.complete && image.naturalWidth > 0)
);
await page.locator("iframe[data-geographic-map]").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
const mapEmbedUnavailable = externalMapWarnings.some((warning) =>
  warning.includes("www.google.com/maps?q=")
);
if (mapEmbedUnavailable)
  await page.locator("iframe[data-geographic-map]").evaluate((frame) => frame.remove());
await page.evaluate(() => {
  document.activeElement?.blur();
  window.scrollTo(0, 0);
});
await page.waitForTimeout(250);
const styleSources = await page.evaluate(() =>
  [...document.querySelectorAll('link[rel="stylesheet"],style')].map((element) =>
    element.tagName === "LINK" ? { url: element.href } : { css: element.textContent }
  )
);
const assetCache = new Map();
async function dataUri(url) {
  const absolute = new URL(url, base).href;
  if (assetCache.has(absolute)) return assetCache.get(absolute);
  const response = await fetch(absolute, {
    headers: { Accept: "image/webp,image/*;q=0.8,*/*;q=0.5" },
  });
  if (!response.ok) throw new Error(`Asset ${response.status}: ${absolute}`);
  const data = `data:${response.headers.get("content-type")?.split(";")[0] || "application/octet-stream"};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
  assetCache.set(absolute, data);
  return data;
}
let css = "";
for (const source of styleSources) {
  let sheet = source.css ?? (await (await fetch(source.url)).text());
  const urls = [...sheet.matchAll(/url\(["']?([^"')]+)["']?\)/g)]
    .map((match) => match[1])
    .filter((url) => !url.startsWith("data:") && !url.startsWith("#"));
  for (const url of new Set(urls))
    sheet = sheet.replaceAll(url, await dataUri(new URL(url, source.url || base).href));
  css += sheet + "\n";
}
const pictures = await page
  .locator("img")
  .evaluateAll((images) => images.map((image) => image.currentSrc));
const embeddedPictures = await Promise.all(pictures.map(dataUri));
await page.evaluate(
  ({ embeddedPictures, css }) => {
    document
      .querySelectorAll("script,link,style,nextjs-portal")
      .forEach((element) => element.remove());
    [...document.images].forEach((image, index) => {
      image.src = embeddedPictures[index];
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
    });
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    document.querySelectorAll('a[href="/"]').forEach((link) => link.setAttribute("href", "#"));
    document.querySelectorAll('a[href="/plano"]').forEach((link) => {
      link.setAttribute("href", "#vista-plano");
      link.setAttribute("data-preview-plan", "");
    });
    document.querySelectorAll('a[href="/alquiler"]').forEach((link) => {
      link.setAttribute("href", "#alquileres");
      link.setAttribute("data-preview-rental", "");
    });
  },
  { embeddedPictures, css }
);
let plan = await readFile(path.join(root, "plano-comercial/plano.html"), "utf8");
plan = plan.replace(
  '<a class="back" href="/" target="_top">',
  '<a class="back" href="#" onclick="parent.closePlanPreview();return false">'
);
plan = plan.replace(
  '<a href="maqueta.html">Ver maqueta 3D →</a>',
  "<span>La maqueta 3D no está incluida en esta vista autónoma.</span>"
);
const runtime = `
const toggle=document.querySelector('[data-menu-toggle]'),nav=document.getElementById('home-navigation');
function setMenu(open){nav.dataset.open=String(open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');toggle.children[0].textContent=open?'Cerrar':'Menú';toggle.children[1].textContent=open?'×':'☰';}
toggle.addEventListener('click',()=>setMenu(nav.dataset.open!=='true'));
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.dataset.open==='true'){setMenu(false);toggle.focus();}});
const panel=document.getElementById('plan-preview'),frame=document.getElementById('plan-preview-frame');let returnFocus;
window.closePlanPreview=()=>{panel.hidden=true;document.querySelector('[data-home-header]').closest('div').inert=false;returnFocus?.focus();};
document.querySelectorAll('[data-preview-plan]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();returnFocus=link;document.querySelector('[data-home-header]').closest('div').inert=true;if(!frame.srcdoc)frame.srcdoc=JSON.parse(document.getElementById('preview-plan-data').textContent);panel.hidden=false;document.getElementById('close-plan-preview').focus();}));
document.getElementById('close-plan-preview').addEventListener('click',closePlanPreview);
document.querySelectorAll('[data-preview-rental]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();alert('La página de alquileres se conserva en el sitio Next.js. Esta vista autónoma incluye la home y el plano interactivo.');}));
`;
const extension = `<style>#plan-preview{position:fixed;inset:0;z-index:200;background:#f4f0e8}#plan-preview[hidden]{display:none}#preview-bar{height:48px;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:0 16px;background:#181a17;color:#f3efe5;font:12px sans-serif}#close-plan-preview{min-height:40px;border:1px solid #b58c63;background:transparent;color:#f3efe5;padding:6px 12px;cursor:pointer}#plan-preview-frame{width:100%;height:calc(100dvh - 48px);border:0;display:block}</style><section id="plan-preview" aria-label="Plano interactivo, vista autónoma" hidden><div id="preview-bar"><span>Plano · Vista de revisión</span><button id="close-plan-preview" type="button">Volver a la home</button></div><iframe id="plan-preview-frame" title="Plano interactivo del proyecto"></iframe></section><script type="application/json" id="preview-plan-data">${JSON.stringify(plan).replaceAll("<", "\\u003c")}</script><script>${runtime}</script>`;
const html = (await page.content()).replace("</body>", extension + "</body>");
await writeFile(path.join(out, "index.html"), html);
await page.goto(`file://${path.join(out, "index.html")}`, { waitUntil: "domcontentloaded" });
for (const photo of await page.locator("img").all()) await photo.scrollIntoViewIfNeeded();
await page.waitForFunction(() =>
  [...document.images].every((image) => image.complete && image.naturalWidth > 0)
);
await page.evaluate(() => {
  document.activeElement?.blur();
  window.scrollTo({ top: 0, behavior: "instant" });
});
await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
await page.screenshot({ path: path.join(out, "home-desktop.png"), fullPage: true });
await page.screenshot({ path: path.join(out, "home-hero-desktop.png") });
await page.locator("#ubicacion").screenshot({ path: path.join(out, "home-entorno-desktop.png") });
await page.setViewportSize({ width: 390, height: 844 });
for (const photo of await page.locator("img").all()) await photo.scrollIntoViewIfNeeded();
await page.evaluate(() => {
  document.activeElement?.blur();
  window.scrollTo(0, 0);
});
await page.waitForFunction(() =>
  [...document.images].every((image) => image.complete && image.naturalWidth > 0)
);
await page.screenshot({ path: path.join(out, "home-mobile.png"), fullPage: true });
await page.screenshot({ path: path.join(out, "home-hero-mobile.png") });
await page.locator("#ubicacion").screenshot({ path: path.join(out, "home-entorno-mobile.png") });
const environmentLinks = await page
  .locator("#ubicacion a")
  .evaluateAll((links) =>
    links.map((link) => ({ name: link.textContent.trim(), href: link.href }))
  );
if (
  environmentLinks.length !== 19 ||
  environmentLinks.some((link) => !link.href.startsWith("https://"))
)
  throw new Error("Environment links failed");
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.getByRole("button", { name: "Abrir menú" }).click();
await page.waitForFunction(
  () => document.getElementById("home-navigation").dataset.open === "true"
);
await page.locator('#home-navigation a[href="#ubicacion"]').click();
if (!page.url().endsWith("#ubicacion")) throw new Error("Environment navigation failed");
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.getByRole("button", { name: "Abrir menú" }).click();
await page.keyboard.press("Escape");
if (
  (await page.getByRole("button", { name: "Abrir menú" }).getAttribute("aria-expanded")) !== "false"
)
  throw new Error("Preview menu Escape failed");
await page.getByRole("link", { name: "Explorar el plano", exact: true }).click();
await page.frameLocator("#plan-preview-frame").locator("h1").waitFor();
await page.frameLocator("#plan-preview-frame").getByRole("searchbox").fill("O-01");
await page.frameLocator("#plan-preview-frame").getByRole("button", { name: /O-01/ }).click();
await page.screenshot({ path: path.join(out, "plano-mobile.png"), fullPage: true });
await page
  .frameLocator("#plan-preview-frame")
  .getByRole("link", { name: "Volver a La Palmerina" })
  .click();
if (await page.locator("#plan-preview").isVisible()) throw new Error("Preview plan return failed");
const facts = await page.evaluate(() => ({
  imageCount: document.images.length,
  loaded: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
  overflow: document.documentElement.scrollWidth > innerWidth,
}));
if (facts.overflow || !facts.loaded || errors.length)
  throw new Error(JSON.stringify({ facts, errors }));
console.log(
  JSON.stringify(
    {
      output: path.join(out, "index.html"),
      bytes: Buffer.byteLength(html),
      facts,
      errors,
      externalMapWarnings,
      mapEmbedUnavailable,
      environmentLinks,
    },
    null,
    2
  )
);
await browser.close();
