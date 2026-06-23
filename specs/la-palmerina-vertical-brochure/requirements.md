# Requirements: La Palmerina Vertical Commercial Brochure

## Summary

Create an executive commercial brochure for Paseo Comercial La Palmerina aimed at expansion decision-makers from retail, gastronomy, service, health, fitness, and entertainment brands. The brochure must preserve the product offered by the existing `/alquiler` page while improving the information hierarchy and editorial presentation.

The final artifact is an editable PowerPoint presentation whose slides behave as portrait A4 brochure pages. It must be suitable for autonomous reading and sharing by email or WhatsApp, with large architectural renders, concise commercial copy, and no unsupported claims.

## Goals

- Present La Palmerina as a premium open-air commercial destination in Canning.
- Explain the 200 m2, 400 m2, and 600 m2 module offer clearly.
- Communicate architecture, construction quality, visibility, parking, access, and location.
- Produce a visually coherent, editable PowerPoint file in A4 portrait format.

## Non-Goals

- Do not modify the website or its source content.
- Do not publish prices, availability, lease terms, delivery dates, or unverified market metrics.
- Do not invent or approximate a logo, icon, customer identity, or architectural fact.
- Do not create a PDF; the requested final deliverable is the editable PPTX.

## Acceptance Criteria

- [ ] The final presentation has exactly 11 portrait A4 pages at 210 x 297 mm.
- [ ] The deck includes cover, project proposition, open-air experience, benefits, one page for each module size, construction, location, a custom anchor-operator proposal, and contact close.
- [ ] All commercial claims can be traced to the existing rental page source files.
- [ ] The visual system uses the existing brand palette and Inter/Roboto typography.
- [ ] The 200 m2, 400 m2, and 600 m2 modules are all clearly represented.
- [ ] The configured WhatsApp contact is present on the closing page.
- [ ] Every page renders without text overflow, distorted imagery, clipping, or elements outside the page.
- [ ] The final PPTX is editable, non-empty, and opens as a ten-slide presentation.

## Assumptions

- The renders under `public/images/` are approved project assets and may be reused.
- The text wordmark `La Palmerina` is the only verified brand mark available.
- Commercial conditions remain under consultation.
- Spanish is the document language.

## Technical Constraints

- Use `@oai/artifact-tool/presentation-jsx` and the Presentations skill workflow.
- Use task mode `create` and primary profile `consumer-retail`.
- Use a thread-scoped workspace at `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/`.
- Final file path: `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/output/Brochure-Comercial-La-Palmerina.pptx`.
- Source facts come from `src/app/alquiler/page.tsx`, the rental components, shared location/contact components, `src/app/globals.css`, and `src/lib/constants.ts`.
- Source imagery comes only from `public/images/`.
- Use the existing palette: `#1A5F7A`, `#2D8CAA`, `#0F3D4F`, `#D4A574`, `#B8915F`, `#1A1A2E`, `#16213E`, white, and restrained warm neutrals.
