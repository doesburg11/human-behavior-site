# Repository Instructions

## House Style

Follow `HOUSE_STYLE.md` for docs presentation conventions, including display formatting, captions, spacing, and references.

## Documentation Reference Style

Follow the `## References` rules in `HOUSE_STYLE.md` for docs pages.

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
