/**
 * Responsive Unsplash helpers.
 * ---------------------------------------------------------------------------
 * Placeholder art direction shared by the hero and the portfolio. Swap these
 * for the licensed brand library before launch; the call sites only need a
 * `src` and a `srcSet`, so a different CDN slots in here without touching any
 * component.
 */
/* Full-bleed defaults. Narrower art (a portrait column, a card) should pass
   its own widths rather than make the browser choose between 1280 and 2560
   for a box that never exceeds ~700px. */
const WIDTHS = [1280, 1920, 2560];
const QUALITY = 70;

export const unsplash = (photoId, width, quality = QUALITY) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=${quality}&w=${width}`;

export const buildSrcSet = (photoId, { widths = WIDTHS, quality = QUALITY } = {}) =>
  widths
    .map((width) => `${unsplash(photoId, width, quality)} ${width}w`)
    .join(", ");
