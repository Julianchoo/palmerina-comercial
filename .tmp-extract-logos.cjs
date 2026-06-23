const sharp = require("./node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const source = "C:/Users/julia/Downloads/Logos.png";

function alphaFromNeutralComposite(r, g, b, foreground) {
  const foregroundMean = (foreground[0] + foreground[1] + foreground[2]) / 3;
  const foregroundChroma = foreground.map((channel) => channel - foregroundMean);
  const pixelMean = (r + g + b) / 3;
  const pixelChroma = [r - pixelMean, g - pixelMean, b - pixelMean];
  const denominator = foregroundChroma.reduce((sum, value) => sum + value * value, 0);
  const projection = pixelChroma.reduce(
    (sum, value, index) => sum + value * foregroundChroma[index],
    0,
  );

  const rawAlpha = Math.max(0, Math.min(1, projection / denominator));
  if (rawAlpha < 0.025) return 0;
  return Math.round(255 * Math.min(1, (rawAlpha - 0.025) / 0.975));
}

async function extractVariant({ top, height, foreground, output }) {
  const { data, info } = await sharp(source)
    .extract({ left: 0, top, width: 1536, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = Buffer.alloc(info.width * info.height * 4);

  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    const sourceOffset = pixel * 3;
    const targetOffset = pixel * 4;
    const alpha = alphaFromNeutralComposite(
      data[sourceOffset],
      data[sourceOffset + 1],
      data[sourceOffset + 2],
      foreground,
    );

    rgba[targetOffset] = foreground[0];
    rgba[targetOffset + 1] = foreground[1];
    rgba[targetOffset + 2] = foreground[2];
    rgba[targetOffset + 3] = alpha;
  }

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 24,
      bottom: 24,
      left: 24,
      right: 24,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

async function main() {
  await extractVariant({
    top: 0,
    height: 508,
    foreground: [48, 58, 23],
    output: "public/images/logo-dark.png",
  });

  await extractVariant({
    top: 508,
    height: 516,
    foreground: [237, 210, 166],
    output: "public/images/logo-light.png",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
