# ByteSpace

A responsive learning-platform implementation of the supplied ByteSpace reference, using Next.js App Router, TypeScript, Tailwind CSS 4, and Lucide React. No general-purpose animation library is required.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` followed by `npm start`.

## Included

- Home page with blue grid, lime accents, animated floating artwork, viewport-triggered reveals, and counting statistics.
- Continuous, duplicated-track partner marquee; autoplay testimonial carousel with invisible clone-boundary reset, manual controls, pause, hover/focus pause, and reduced-motion support.
- Search, category and experience filters, price/rating sorting, pagination, and empty states.
- Course overview, curriculum, reviews, preview dialog, creator profile, register/login, learning dashboard, lesson player, and custom 404.
- Server-side account registration/login, salted scrypt password hashing, HTTP-only session cookies, enrollment, saved lesson progress, reviews, newsletter signup storage, and downloadable worksheets.
- Responsive layouts, keyboard-accessible controls, native dialog focus behavior, lazy optimized images, locally served media, and self-hosted build-time Google font files.

## Design fidelity

Reference: https://www.figma.com/design/3RLNLQDsiZsHbv8NSCaqpb/ByteSpace-New-Check-website--Copy-?node-id=0-1

The Figma file could not be inspected directly with the available connection. Layout and visual styling were reconstructed from the supplied screenshot. Poppins is a visual estimate, not a verified Figma font. Main colors are exactly `#003BE2` and `#D4FB20`.

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
