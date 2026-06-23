# Task 02: Build the Editable A4 Portrait Brochure

## Status

complete

## Wave

2

## Description

Build the complete ten-page editable PowerPoint brochure from the approved source dossier and design system. The result must feel like a premium real-estate editorial document rather than a website screenshot or a generic presentation template.

## Dependencies

**Depends on:** task-01-editorial-system.md
**Blocks:** task-03-qa-delivery.md

**Context from dependencies:** Task 01 creates the exact ten-page claim spine, sourced copy, image provenance, portrait design rules, and macro-layout plan under the fixed presentation workspace. Treat those files as binding inputs.

## Files to Create

- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/slides/slide-01.mjs` through `slide-10.mjs` - editable page modules
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/build.mjs` - presentation assembly/export entrypoint
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/output/Brochure-Comercial-La-Palmerina.pptx` - built brochure

## Files to Modify

None outside the specified presentation workspace.

## Technical Details

### Implementation Steps

1. Read the Presentations skill, consumer-retail profile, and all Task 01 planning files.
2. Use `@oai/artifact-tool/presentation-jsx` only. Do not use PptxGenJS, Python PPTX libraries, OOXML manipulation, or LibreOffice.
3. Set portrait A4 dimensions to 210 x 297 mm (approximately 8.2677 x 11.6929 inches).
4. Build exactly ten editable slides, one module per slide, using native text, shapes, lines, and embedded approved project images.
5. Preserve image aspect ratios with deliberate crops. Do not stretch images.
6. Favor large image-led compositions, editorial whitespace, hairline rules, direct labels, and restrained text. Avoid repeated rounded-card grids.
7. Use at least five distinct macro-layout families. The module pages may share a family but must vary image crop, emphasis, or composition enough to avoid template repetition.
8. Include discreet page markers and a consistent `La Palmerina` text wordmark.
9. Use the current WhatsApp URL from `src/lib/constants.ts` on the closing slide. Add it as a clickable hyperlink if the artifact runtime supports it reliably; otherwise display it through a clear consultation CTA without inventing other contact data.
10. Export the deck to the exact final path.

### Required Page Content

- Page 1: `Paseo Comercial La Palmerina`, Canning / Buenos Aires, commercial modules 200 / 400 / 600 m².
- Page 2: development proposition and corridor positioning.
- Page 3: open-air architectural experience with day/night imagery.
- Page 4: six verified project benefits.
- Pages 5-7: one module size per page with its verified uses and description.
- Page 8: construction and installations.
- Page 9: map plus access and influence-area facts.
- Page 10: concise closing proposition, conditions under consultation, WhatsApp CTA.

## Acceptance Criteria

- [ ] A non-empty PPTX exists at the exact output path.
- [ ] The presentation contains exactly ten portrait A4 slides.
- [ ] All text, shapes, and page furniture remain editable.
- [ ] All selected images retain correct proportions and have intentional crops.
- [ ] The brand palette, Inter headings, Roboto body, and text wordmark are consistently applied.
- [ ] The deck includes all required commercial facts and no unsupported claims.
