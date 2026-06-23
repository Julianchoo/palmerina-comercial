# Task 03: Render, Review, and Deliver

## Status

complete

## Wave

3

## Description

Perform full visual and mechanical QA on the built brochure, correct any issues, and leave only the verified final PPTX as the user-facing deliverable. This task owns final quality, including contact-sheet rhythm, full-size page inspection, package checks, and compliance with sourced content.

## Dependencies

**Depends on:** task-02-build-brochure.md
**Blocks:** None

**Context from dependencies:** Task 02 creates ten slide modules, the build entrypoint, and an initial PPTX in the fixed workspace. Task 01 provides the source and design rules used to judge factual and visual correctness.

## Files to Create

- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/qa/comeback-scorecard.txt` - final QA ledger

## Files to Modify

- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/slides/slide-01.mjs` through `slide-10.mjs` - only where visual corrections are required
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/build.mjs` - only if export or assembly corrections are required
- `outputs/manual-20260612-palmerina-brochure/presentations/la-palmerina-vertical-brochure/output/Brochure-Comercial-La-Palmerina.pptx` - regenerated final deliverable

## Technical Details

### Implementation Steps

1. Render every page with the artifact-tool helpers and generate a contact sheet plus layout JSON.
2. Inspect the contact sheet for rhythm, hierarchy, image quality, and repeated composition.
3. Inspect all ten full-size page renders for:
   - text clipping or overflow
   - distorted or low-quality imagery
   - accidental overlaps
   - insufficient contrast
   - weak box padding
   - inconsistent page markers, wordmark, or typography
   - objects outside the A4 canvas
4. Verify every fact against Task 01 source notes and the website source.
5. Correct all blocking defects in the slide modules, rebuild, and rerender.
6. Score the final deck using the Presentations comeback rubric. Because no external reference deck exists, require at least 40/45 with no dimension below 4 and pass the consumer-retail profile gate.
7. Mechanically verify that the PPTX is non-empty, contains exactly ten slides, and contains no empty media parts.
8. Run `pnpm lint` and `pnpm typecheck` to confirm the repository remains valid.
9. Run the Presentations cleanup helper only after QA passes, preserving the final PPTX in the output directory.

## Acceptance Criteria

- [ ] All ten pages have been rendered and inspected at full size.
- [ ] No clipping, overflow, image distortion, collision, or off-canvas object remains.
- [ ] The contact sheet has at least five macro-layout families and no three consecutive identical compositions.
- [ ] All facts match the source notes and website source.
- [ ] The final rubric score is at least 40/45 with no dimension below 4.
- [ ] The consumer-retail profile and brand-authenticity gates pass.
- [ ] `pnpm lint` and `pnpm typecheck` pass.
- [ ] The final PPTX remains at the exact requested output path after cleanup.
