# Task 01: Redesign Paseo Overview Section

## Status

complete

## Wave

1

## Description

Redesign `Vision general del paseo` on `/alquiler` so the photos are the main focus. Use a large hero-style carousel with clear navigation and move the current highlights into compact chips or a compact info band.

## Dependencies

**Depends on:** None (Wave 1)  
**Blocks:** None

**Context from dependencies:** No dependency context. This task owns the full UI change for the section.

## Files to Create

None.

## Files to Modify

- `src/components/alquiler/ProyectoSection.tsx` - restructure the section layout and convert highlights into compact visual supporting data.
- `src/components/alquiler/EmblaCarousel.tsx` - add or adjust support for a larger featured carousel presentation while preserving current image navigation.

## Technical Details

### Implementation Steps

1. Keep the existing `slides` array and image assets.
2. Keep the current title, badge, and descriptive copy, but make the header more compact so the image can dominate the section.
3. Replace the current two-column layout with a photo-first composition.
4. Render a large carousel, for example with a desktop height around `md:h-[520px]`, using `next/image`.
5. Keep navigation for other photos. Controls can be arrows plus dots or thumbnails, but they must be visible and usable.
6. Convert the existing benefits into compact chips or a compact band near the carousel. Do not invent facts; use only existing highlight content or shortened versions of it.
7. Keep the design consistent with current brand tokens: `brand-dark`, `brand-primary`, `brand-accent`, white/light backgrounds.
8. Ensure mobile layout remains readable: the carousel should still dominate, but controls/text must not overlap incoherently.

### Code Snippets

No required snippets. Follow current component patterns and Tailwind usage.

### Environment Variables

None.

### API Endpoints

None.

## Acceptance Criteria

- [ ] The desktop section has one large dominant photo carousel.
- [ ] Carousel navigation still works for all existing slides.
- [ ] Highlights are compact and secondary to the photos.
- [ ] The implementation uses `next/image` for slide images.
- [ ] No unrelated page sections are modified.
- [ ] `pnpm lint` passes.
- [ ] `pnpm typecheck` passes.

## Notes

The existing source contains mojibake in some Spanish strings. Do not expand scope into a full encoding cleanup unless required by this task.
