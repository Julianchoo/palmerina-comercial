# Task 01: Editorial System and Source Dossier

## Status

complete

## Wave

1

## Description

Establish the sourced narrative, page claims, image usage, and design system for the brochure before slide construction begins. This task prevents unsupported copy and gives the build task a decision-complete editorial and visual specification.

## Dependencies

**Depends on:** None (Wave 1)
**Blocks:** task-02-build-brochure.md

**Context from dependencies:** No prior task output exists. Inspect the named website source files and approved images directly.

## Files to Create

- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/profile-plan.txt` - presentation mode and profile requirements
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/source-notes.txt` - fact and asset provenance
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/reference-audit.txt` - source strengths and anti-patterns
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/claim-spine.txt` - exact ten-page narrative
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/design-system.txt` - portrait design system
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/contact-sheet-plan.txt` - macro-layout plan

## Files to Modify

None.

## Technical Details

### Implementation Steps

1. Read the Presentations skill and `profiles/consumer-retail.md`.
2. Extract facts from:
   - `src/app/alquiler/page.tsx`
   - `src/components/alquiler/ProyectoSection.tsx`
   - `src/components/alquiler/ModulosGrid.tsx`
   - `src/components/alquiler/ConstructivoSection.tsx`
   - `src/components/alquiler/VentajasSection.tsx`
   - `src/components/shared/LocationSection.tsx`
   - `src/components/shared/CtaSection.tsx`
   - `src/app/globals.css`
   - `src/lib/constants.ts`
3. Inspect the available renders under `public/images/` and record provenance, role, crop direction, and text-safe area for every selected image.
4. Use task mode `create`, profile `consumer-retail`, A4 portrait dimensions of 210 x 297 mm, and exactly ten pages.
5. Define this page sequence:
   1. Cover: aerial night hero.
   2. Proposition: next-generation open-air commercial development in the southern corridor.
   3. Experience: architecture, circulation, uses, and day/night atmosphere.
   4. Benefits: open-air design, 6-8 m clear heights, Ruta 58 visibility, 200+ parking spaces, broad circulation, CCTV security.
   5. 200 m2 module: retail, gastronomy, services, health.
   6. 400 m2 module: chains, supermarket, anchor, gym; describe it as the most versatile format.
   7. 600 m2 module: logistics, large retail, education, entertainment.
   8. Construction: metal structure, lightweight roof, glass enclosures, three-phase electricity, natural gas, potable water, drainage, fiber, vehicular access.
   9. Location: Ruta 58, Presidente Peron motorway, 35 minutes from CABA, 15 minutes from Ezeiza Airport, and nearby influence areas.
   10. Close: consultation and current WhatsApp contact.
6. Write concise Spanish client-facing copy. Do not preserve the mojibake visible in terminal output; use correct Spanish accents and `m²`.
7. Define at least five macro-layout families across ten pages, with no three consecutive pages sharing the same composition.
8. Use Inter for headings and Roboto for body copy. Use the verified text wordmark only; do not invent an isotipo.

## Acceptance Criteria

- [ ] All six planning files exist and are internally consistent.
- [ ] Every claim and image has recorded source provenance.
- [ ] The claim spine specifies exactly ten pages with a kicker, claim title, proof object, and support note.
- [ ] The design system specifies A4 portrait size, palette, typography, spacing, image rules, and page-number/footer grammar.
- [ ] No unsupported prices, availability, lease conditions, dates, or market statistics appear.
