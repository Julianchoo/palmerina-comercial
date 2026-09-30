// Renderiza las vistas de maqueta.html a JPG en renders/ usando Chromium headless.
// Uso: npm run render [-- vista-modo,vista-modo]   p. ej. npm run render -- galeria-dia,aerea-tarde
// Variables: CHROMIUM_PATH (binario de Chromium a usar), RENDER_W / RENDER_H / RENDER_SS (tamaño y supersampling).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const THREE_DIR = path.join(ROOT, "node_modules", "three");
const OUT = path.join(ROOT, "renders");
const W = +(process.env.RENDER_W || 1920), H = +(process.env.RENDER_H || 1080), SS = +(process.env.RENDER_SS || 2);

const SHOTS = [
  ["aerea", "tarde"], ["tresc", "dia"], ["galeria", "dia"], ["pasarela", "tarde"],
  ["paseo", "tarde"], ["acceso", "dia"], ["tresc", "noche"],
];
const only = process.argv[2]?.split(",");
const shots = SHOTS.filter(([v, m]) => !only || only.includes(`${v}-${m}`));

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
for (const [view, mode] of shots) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // three.js se sirve desde node_modules en lugar del CDN del importmap
  await page.route("https://cdn.jsdelivr.net/npm/three@0.169.0/**", (route) => {
    const rel = new URL(route.request().url()).pathname.replace("/npm/three@0.169.0/", "");
    route.fulfill({
      status: 200,
      headers: { "content-type": "application/javascript", "access-control-allow-origin": "*" },
      body: fs.readFileSync(path.join(THREE_DIR, rel)),
    });
  });
  const t0 = Date.now();
  const url = `file://${path.join(ROOT, "maqueta.html")}?view=${view}&mode=${mode}&w=${W}&h=${H}&ss=${SS}&ui=0`;
  await page.goto(url);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 300_000 });
  const file = path.join(OUT, `${view}-${mode}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 88 });
  console.log(`${path.relative(ROOT, file)}  ${((Date.now() - t0) / 1000).toFixed(1)}s${errors.length ? "  ERRORES: " + errors.join(" | ") : ""}`);
  await page.close();
}
await browser.close();
