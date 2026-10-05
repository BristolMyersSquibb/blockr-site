# blockr-site

VitePress documentation site for [blockr](https://github.com/BristolMyersSquibb/blockr).

Live site: https://blockr.site

## Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the VitePress site and publishes it with GitHub Pages (custom domain blockr.site).
