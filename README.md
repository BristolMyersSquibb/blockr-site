# blockr-site

VitePress documentation site for [blockr](https://github.com/BristolMyersSquibb/blockr).

Live site: https://bristolmyerssquibb.github.io/blockr/

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

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the VitePress site and deploys to the `gh-pages` branch of `BristolMyersSquibb/blockr` via a GitHub App token.
