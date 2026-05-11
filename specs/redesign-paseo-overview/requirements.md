# Requirements: Redesign Paseo Overview

## Summary

The current "Vision general del paseo" section on `/alquiler` gives too much visual weight to whitespace and the benefits list, while the project photos appear small. The redesign should make one large project image the main focus and keep navigation available for the rest of the photos.

The section should keep the existing copy, images, and Next.js image handling. Benefits should become compact supporting data, not a competing column.

## Goals

- Make the project photography the dominant element in the section.
- Keep a way to navigate through the existing photo set.
- Reformat the existing benefits into compact chips or an equivalent compact band.
- Preserve the current content and image assets.

## Non-Goals

- Do not add new photos or invent new project data.
- Do not redesign the full `/alquiler` page.
- Do not change navigation, CTAs, metadata, or unrelated sections.

## Acceptance Criteria

- [ ] The main photo is significantly larger than the current carousel on desktop.
- [ ] Users can navigate to the other existing photos.
- [ ] The benefits are visible but compact and secondary to the photography.
- [ ] The section remains responsive on mobile and desktop.
- [ ] `next/image` is still used for photos.

## Assumptions

- The desired direction is a large hero-style photo with navigation for other photos.
- Existing image paths and captions remain valid.
- Existing brand colors and typography remain the baseline.

## Technical Constraints

- Use the existing Next.js App Router project structure.
- Modify only the local section/carousel files needed for this redesign.
- Verify with `pnpm lint` and `pnpm typecheck`.
