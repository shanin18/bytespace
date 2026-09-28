# ByteSpace

A responsive learning-platform implementation of the supplied ByteSpace reference, using Next.js App Router, TypeScript, Tailwind CSS 4, shadcn/ui (Radix primitives), and Lucide React. No general-purpose JavaScript animation library is required.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` followed by `npm start`.

## Included

- Home page with blue grid, lime accents, animated floating artwork, viewport-triggered reveals, and counting statistics.
- Continuous, duplicated-track partner marquee; autoplay testimonial carousel with invisible clone-boundary reset, previous/next controls, hover/focus pause, and reduced-motion support. No play/pause buttons.
- Official shadcn/ui buttons, selects, inputs, textarea, checkbox, and label components in `src/components/ui/`. Brand tokens and control styling preserve the blue/lime palette. Add further components with `npx shadcn@latest add <component>`.
- Component layout, responsive behavior, hover/focus states, and shadcn overrides use Tailwind utilities in TSX. `globals.css` contains only Tailwind imports, theme tokens, and animation keyframes. Shared CTA styling lives in the shadcn Button variants (`lime`, `pill`, `pill-sm`).
- Search, category and experience filters, price/rating sorting, pagination, and empty states.
- Course overview, curriculum, reviews, preview dialog, creator profile, register/login, learning dashboard, lesson player, and custom 404.
- Server-side account registration/login, salted scrypt password hashing, HTTP-only session cookies, enrollment, saved lesson progress, reviews, newsletter signup storage, and downloadable worksheets.
- Responsive layouts, keyboard-accessible controls, native dialog focus behavior, lazy optimized images, locally served media, and self-hosted build-time Google font files.

## Design fidelity

Reference: https://www.figma.com/design/3RLNLQDsiZsHbv8NSCaqpb/ByteSpace-New-Check-website--Copy-?node-id=0-1

The Figma file could not be inspected directly with the available connection. Layout and visual styling were reconstructed from the supplied screenshot. Typography follows the specified font families: Clash Display for the logo, Satoshi for body text/navigation/form controls, and Poppins for headings and course titles. Main colors are exactly `#003BE2` and `#D4FB20`.

Original photographs, logos, copy, and exact measurements are still needed for a pixel-level match. Photos and initial course/community records are illustrative. The hero cutout was generated to approximate the composition in the reference.

## Data and production integration

Demo records persist in `.data/store.json` on the local Node.js server. Keep this directory private. This serialized file store is designed for a single application process on persistent local storage; use a proper transactional database before deploying to multiple processes, containers, or serverless infrastructure. Tests create uniquely named example accounts in this local store.

Enrollment intentionally grants free demo access. Displayed prices do not trigger a payment. The sample lesson video is not the final teaching material. Initial ratings and community stories are samples; submitted reviews are persisted separately.

Before public launch, connect:

1. The original Figma assets and real course/instructor content.
2. A production database and production-ready session/rate-limit storage.
3. Payment checkout, verified webhooks, entitlement checks, and refund handling.
4. Transactional email, email verification, password recovery, newsletter delivery, and account deletion.
5. Course video hosting, creator publishing/moderation, and payouts if required.
6. A real support address and reviewed business terms/privacy policy.

## Validation

```sh
npm run typecheck
npm run build
npx playwright install chromium
npm test
npm run format:check
```

Tests cover search/filters, mobile navigation, registration and login, enrollment, progress persistence, reviews, downloads, newsletter signup, preview dialog, carousel wrap, 404 recovery, and viewport overflow. You can set `CHROME_PATH` to an existing Chromium executable instead of downloading a browser.

`scripts/inspect.mjs` captures desktop/mobile screenshots to `artifacts/` while a server runs at localhost:3000. It also checks image loading. Screenshots are development artifacts.

## Assets

Demo photos: Unsplash photo IDs are retained in `public/images/`. `scripts/download-assets.mjs` documents their source URLs and can refresh those assets. Sample video: MDN’s CC0 flower video, stored at `public/video/course-preview.mp4`.

Generated image: `public/images/learner-cutout.png`, produced with the built-in image generation tool. Prompt: “Photorealistic transparent-background cutout of a cheerful young adult female student with long wavy dark brown hair, a light blue denim shirt over a white t-shirt, headphones around her neck, holding an open graphite laptop, right hand thoughtfully touching chin, smiling at camera, framed from head to hips, natural studio lighting, no text, logos, or background.”

Poppins is loaded through `next/font/google` and self-hosted by the production build. The first build requires access to Google Fonts; subsequent runtime page views do not request Google Fonts.

Clash Display and Satoshi variable WOFF2 files are sourced from Fontshare and bundled in `src/app/fonts/` via `next/font/local` with `display: swap`. Original source references are retained as `.txt` files alongside them, not imported stylesheets. `scripts/download-fonts.mjs` refreshes these assets. No runtime Fontshare requests are needed.
