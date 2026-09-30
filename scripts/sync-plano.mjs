import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// plano-comercial is the canonical source; public/plano is generated for Next.js.
const destination = new URL("../public/plano/", import.meta.url);
await mkdir(destination, { recursive: true });
for (const [source, output] of [
  ["plano.html", "index.html"],
  // Preserve maqueta.html's relative return link to the interactive plan.
  ["plano.html", "plano.html"],
  ["maqueta.html", "maqueta.html"],
]) {
  await copyFile(
    fileURLToPath(new URL(`../plano-comercial/${source}`, import.meta.url)),
    fileURLToPath(new URL(output, destination))
  );
}
console.log("Plano and maqueta synced to public/plano.");
