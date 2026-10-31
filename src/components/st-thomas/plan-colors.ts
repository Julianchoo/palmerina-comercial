/**
 * Recolor only the source CAD's cyan water and lime annotations. Colors are
 * measured from the supplied plan, not inferred from parcel positions. Channel
 * differences also identify antialiased pixels blended with white or black.
 * Dark green trees have a different channel ratio and remain unchanged.
 */
export function recolorPlanPixels(pixels: Uint8ClampedArray): void {
  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i]!;
    const green = pixels[i + 1]!;
    const blue = pixels[i + 2]!;
    const cyan = Math.min(green, blue) - red;

    if (cyan > 8 && Math.abs(green - blue) <= 2) {
      // Original water #00ffff → #519ec4; retain neutral ink at the edges.
      pixels[i] = red + cyan * 81 / 255;
      pixels[i + 1] = green - cyan * 97 / 255;
      pixels[i + 2] = blue - cyan * 59 / 255;
      continue;
    }

    const lime = green - blue;
    const ratio = lime > 0 ? (red - blue) / lime : 0;
    if (lime > 8 && ratio >= .32 && ratio <= .43) {
      // Source marks #6ad928 (minor CAD variants included) → paper white.
      // Add only their color contribution, preserving overlapping black ink.
      const coverage = lime / 177;
      pixels[i] = red + coverage * 149;
      pixels[i + 1] = green + coverage * 38;
      pixels[i + 2] = blue + coverage * 215;
    }
  }
}

/** Process the authorized image in the browser only; nothing is uploaded. */
export function preparePlanImage(image: HTMLImageElement): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return Promise.reject(new Error("Canvas is unavailable"));
  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  recolorPlanPixels(pixels.data);
  context.putImageData(pixels, 0, 0);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      canvas.width = 0;
      canvas.height = 0;
      if (blob) resolve(blob);
      else reject(new Error("Plan image could not be prepared"));
    }, "image/png");
  });
}
