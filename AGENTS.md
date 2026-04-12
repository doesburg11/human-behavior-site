# Repository Instructions

## House Style

Follow `HOUSE_STYLE.md` for docs presentation conventions, including display formatting, captions, and spacing.

## Documentation Reference Style

When a docs page makes a source-specific empirical, historical, or textual claim, use a `## References` section at the end of the page rather than inline bibliographic links inside the body text.

Style rules:

- keep the prose readable and uncluttered; do not insert inline citation links like `[Author 2020](...)` into normal explanatory sentences unless explicitly requested
- add full references in an end-of-page `## References` section
- match the reference style already used on docs pages in this repo: author, year, title, venue or publisher, and direct link or DOI where available
- if only one or two claims on a page need sourcing, still prefer the end-of-page `## References` section over inline bibliography-style links

## Archive Move Rule

When moving a docs section into `docs/archive/...`, always move its related static assets into the matching archive image path as well.

Pattern:

- docs path: `docs/<section>/...` -> `docs/archive/<section>/...`
- image path: `static/img/<section>/...` -> `static/img/archive/<section>/...`

After moving, update all image references in moved docs to the new `/img/archive/...` paths.

Also preserve old URLs:

- keep or generate redirects from `/<section>/...` to `/archive/<section>/...`
- update any legacy static redirect pages (for example `static/cooperation/...`) to point directly to the new archive route instead of the old route
- update internal doc links to use the new canonical `/archive/...` path where appropriate
