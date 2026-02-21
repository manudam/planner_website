# Planner Pig Website (Coming Soon Launch)

This folder contains a static, deployment-ready coming-soon site for `www.plannerpig.com`.

## Files
- `index.html`: Primary public coming-soon page
- `coming-soon.html`: Alias page with the same content
- `styles.css`: Shared styling and animations
- `main.js`: Store link status logic and footer year
- `assets/images/*`: Brand icon/logo and social image assets
- `favicon.png`: Site favicon

## Publish store links when app is live
Update `main.js` with the official URLs:

```js
const STORE_LINKS = {
  appStore: "https://apps.apple.com/...",
  googlePlay: "https://play.google.com/store/apps/details?id=...",
  microsoftStore: "https://apps.microsoft.com/detail/...",
};
```

Any empty URL stays in `Coming soon` mode.

## Local preview
From this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
