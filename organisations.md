---
title: blockr for organisations
description: Who builds blockr, what organisations use it for, how to run it on your own server, and how to get in touch.
---

<!--
  Use cases link to categories on the examples page by anchor. If a category
  on /examples/ is renamed, update the links in the "Use cases" section.
-->

# blockr for organisations

blockr turns R analyses into apps that colleagues who do not code can use. A
builder assembles the app from blocks in the browser, and every app exports to
plain R code that can be reviewed and rerun.

## Who is behind blockr

blockr is sponsored by [Bristol Myers Squibb](https://www.bms.com) and built
and maintained by [cynkra](https://cynkra.com/blockr/), an R consultancy in
Zurich. All packages are free and open source under
[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html), with the source on
[GitHub](https://github.com/BristolMyersSquibb/blockr).

## Use cases

### Pharma

Explore an ADaM trial (demographics, adverse events, labs, vitals, patient
profiles), with an AI assistant on the board, and derive ADSL from SDTM with
admiral, one derivation step per block. See the [pharma examples](/examples/#pharma) and the
blockr.pharma and blockr.admiral packages.

### Insurance

Underwriting, pricing and reinsurance workbenches that actuaries set up once
and underwriters use day to day. See the
[insurance examples](/examples/#insurance) and the blockr.insurance package.

### Public sector and statistics

Official statistics and public health: seasonal adjustment of GDP with
X-13ARIMA-SEATS, and a refit of a published study on mosquito control, with
the Quarto report coming out of the same board. See the [statistics examples](/examples/#statistics) and
the blockr.ts and blockr.seasonal packages.

All examples run on [blockr.cloud](https://blockr.cloud) and can be opened
without an account. The [packages page](/packages/) lists every package.

## Run it on your own server

blockr is an R package and runs as a Shiny app, so it goes wherever your
Shiny apps already go. Data stays inside your organisation.

- **Posit Connect.** Boards are stored per user, and users can share boards
  with colleagues from inside the app. See
  [Saving and sharing](/docs/concepts/04-saving-sharing).
- **ShinyProxy.** Each app runs in its own container. blockr.cloud runs this
  way.
- **Any Shiny server**, or locally from R with `blockr::run_app()`.

An app can be deployed locked, so users work with it without changing the
workflow. See [User, Builder, Developer](/docs/concepts/02-roles).

## Free intro sessions

Bring a real problem and we work through it with you in blockr, in two free
30-minute sessions. [Book an intro session](/intro).

## Contact

For deployment, training, custom blocks or support, contact cynkra:

- [cynkra.com/blockr](https://cynkra.com/blockr/)
- [cynkra.com/contact](https://cynkra.com/contact/)
