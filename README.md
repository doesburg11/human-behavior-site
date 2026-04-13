# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Cross-Repo Mapping

This repo builds `https://humanbehaviorpatterns.org/` and serves as the
documentation/presentation layer for canonical Python models implemented in the
sibling `EvolvedCooperation` repo.

Current required 1-to-1 mapping:

- `spatial_altruism` page/section here <-> `spatial_altruism/` in
  `EvolvedCooperation`
- `cooperative_hunting` page/section here <-> `cooperative_hunting/` in
  `EvolvedCooperation`

When the implementation changes in `EvolvedCooperation`, review and update the
matching page here. When the website explanation changes here, keep it faithful
to the Python implementation there.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
