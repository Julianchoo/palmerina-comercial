// Renderiza vistas de maqueta.html a JPG con Chromium headless.
// Uso: npm run render [-- vista-modo,vista-modo]
// Variables: CHROMIUM_PATH, RENDER_OUT (relativo a plano-comercial o absoluto), RENDER_W, RENDER_H, RENDER_SS.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const THREE_DIR = path.join(ROOT, "node_modules", "three");
const OUT = path.resolve(ROOT, process.env.RENDER_OUT || "renders");
const W = +(process.env.RENDER_W || 1920), H = +(process.env.RENDER_H || 1080), SS = +(process.env.RENDER_SS || 2);
if (![W, H, SS].every(Number.isFinite) || !Number.isInteger(W) || !Number.isInteger(H) || W < 1 || H < 1 || SS < 1) {
  throw new Error("RENDER_W y RENDER_H deben ser enteros positivos; RENDER_SS debe ser un número finito >= 1.");
}
const VIEWS = ["aerea", "tresc", "galeria", "pasarela", "paseo", "acceso"];
const MODES = ["dia", "tarde", "noche"];
const SHOTS = [
  ["aerea", "tarde"], ["tresc", "dia"], ["galeria", "dia"], ["pasarela", "tarde"],
  ["paseo", "tarde"], ["acceso", "dia"], ["tresc", "noche"],
];
if (process.argv.length > 3) throw new Error("Usá una sola lista de vistas separadas por comas: aerea-tarde,galeria-dia,paseo-noche.");
const shots = process.argv[2] === undefined ? SHOTS : [...new Set(process.argv[2].split(","))].map((shot) => {
  const [view, mode, extra] = shot.split("-");
  if (extra !== undefined || !VIEWS.includes(view) || !MODES.includes(mode)) {
    throw new Error(`Vista inválida: ${JSON.stringify(shot)}. Vistas: ${VIEWS.join(", ")}. Modos: ${MODES.join(", ")}. Usá vista-modo.`);
  }
  return [view, mode];
});
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
try {
  for (const [view, mode] of shots) {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    try {
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      await page.route("https://cdn.jsdelivr.net/npm/three@0.169.0/**", (route) => {
        const rel = new URL(route.request().url()).pathname.replace("/npm/three@0.169.0/", "");
        return route.fulfill({ status: 200,
          headers: { "content-type": "application/javascript", "access-control-allow-origin": "*" },
          body: fs.readFileSync(path.join(THREE_DIR, rel)),
        });
      });
      const t0 = Date.now();
      const url = pathToFileURL(path.join(ROOT, "maqueta.html"));
      url.search = new URLSearchParams({ view, mode, w: W, h: H, ss: SS, ui: 0 }).toString();
      await page.goto(url.href);
      await page.waitForFunction(() => window.__ready === true, null, { timeout: 300_000 });
      if (errors.length) throw new Error(`${view}-${mode}: ${errors.join(" | ")}`);
      const file = path.join(OUT, `${view}-${mode}.jpg`);
      await page.screenshot({ path: file, type: "jpeg", quality: 88 });
      console.log(`${path.relative(ROOT, file)}  ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    } finally { await page.close(); }
  }
} finally { await browser.close(); }
