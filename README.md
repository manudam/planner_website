# Planner Pig Website

This folder contains the static marketing website for `www.plannerpig.com`.

## Files
- `index.html`: Main launch and Planner Pig showcase page
- `coming-soon.html`: Redirect alias to the main page
- `robots.txt` / `sitemap.xml`: Crawl and discovery files for search engines
- `styles.css`: Layout, components, motion, and responsive styles
- `main.js`: Platform link states, mobile navigation, reveal animations, and footer year
- `assets/images/*`: Brand assets and Planner Pig screenshots

## SEO assets
- `assets/images/plannerpig-social-card.png`: Default social sharing image used by Open Graph and Twitter cards
- `assets/images/screen-*-720.webp` / `assets/images/screen-*-960.webp`: Optimized website screenshot variants used in the landing page

## Publish platform links when live
Update `main.js` with the official URLs inside `STORE_CONFIG`:

```js
const STORE_CONFIG = {
  iphone: { url: "https://apps.apple.com/..." },
  android: { url: "https://play.google.com/store/apps/details?id=..." },
  windows: { url: "https://apps.microsoft.com/detail/..." },
  mac: { url: "https://..." },
  web: { url: "https://app.plannerpig.com/" },
};
```

Any empty URL stays in pending mode and links back to the platform section.

## Local preview
From this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Refresh website screenshots from the current Flutter app
Fresh marketing screenshots should be captured from the simulator using the
seeded marketing entrypoint:

```bash
cd ../planner_app
flutter run -d "iPhone 17" -t lib/marketing_capture.dart --dart-define=MARKETING_SCREEN=planner
```

Then save the current simulator screen into the website assets with:

```bash
xcrun simctl io booted screenshot ../planner_website/assets/images/screen-planner.png
```

Supported `MARKETING_SCREEN` values are `auth`, `dashboard`, `planner`,
`setup`, `progress`, and `social`.
