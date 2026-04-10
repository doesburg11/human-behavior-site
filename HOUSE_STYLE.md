# House Style Guide

This document defines a portable house style for research-oriented websites, documentation, and GitHub README pages.

It is based on the current front page of this repository, especially:

- the deep blue top banner
- the comparison table with a dark blue header
- the alternating blue-tinted table rows

## Style Direction

The site should feel:

- academic
- calm
- structured
- trustworthy
- visually led by shades of blue

The visual language should stay content-first. Blue is used to organize attention, not to overwhelm the page.

The style should remain usable in:

- Docusaurus pages
- plain Markdown documents
- GitHub README files
- other repositories with no dependency on this repo's file structure

## Core Palette

The main brand color should be the deep blue already used in the homepage top banner and table header.

<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '22%' }} />
      <col style={{ width: '18%' }} />
      <col style={{ width: '60%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Token</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Value</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Primary blue</td>
        <td><code>#0F3368</code></td>
        <td>top bar, table headers, major section accents</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Secondary blue</td>
        <td><code>#1C4B8F</code></td>
        <td>links, buttons, secondary accents</td>
      </tr>
      <tr>
        <td>Soft blue</td>
        <td><code>#78AAE6</code></td>
        <td>highlights, diagrams, subtle accents</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Pale blue surface</td>
        <td><code>#EAF2FB</code></td>
        <td>callouts, panels, gentle backgrounds</td>
      </tr>
      <tr>
        <td>Blue border</td>
        <td><code>#D6E4F5</code></td>
        <td>table borders, panel outlines</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Table stripe</td>
        <td><code>rgba(120, 170, 230, 0.16)</code></td>
        <td>alternating table rows</td>
      </tr>
      <tr>
        <td>White</td>
        <td><code>#FFFFFF</code></td>
        <td>text on dark blue surfaces</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Body text</td>
        <td><code>#1F2D3D</code></td>
        <td>main reading text</td>
      </tr>
    </tbody>
  </table>
</div>

## Top Bar And Hero Style

- The top navigation bar should use `#0F3368` as the primary background.
- Logo and title text on dark blue should be white.
- The bar should stay simple and solid rather than decorative.
- Avoid introducing unrelated accent colors into the header.
- Hero and section banners should follow the same pattern: strong blue field, white text, clean composition.

For GitHub README usage, where an actual top bar usually does not exist:

- use a banner image, table header, or opening callout to carry the same blue identity
- keep the first visible visual element anchored in the primary blue
- use white text on dark blue only when rendered inside an image, badge, or HTML block that GitHub supports

## Table Style

Tables are part of the site's identity and should follow the front-page comparison table.

- Header row background: `#0F3368`
- Header text: white
- Header text alignment: left
- Body rows: alternate between white and `rgba(120, 170, 230, 0.16)`
- Borders: subtle and cool, using `#D6E4F5`
- Keep tables readable and editorial, not spreadsheet-heavy
- Prefer concise row labels and consistent padding

Recommended table behavior:

- full width when comparing concepts
- fixed layout when columns should align predictably
- modest padding such as `0.75rem 1rem`

For GitHub README pages:

- standard Markdown tables are preferred for compatibility
- if alternating row backgrounds are not supported, preserve the style through a strong blue header row and concise column structure
- do not rely on custom CSS being available

## Display Captions

- Use `Display N:` for all visual elements, including images, diagrams, charts, and tables.
- Keep captions short, sentence-style, and descriptive.
- Use the same `figcaption` formatting for all displays on a page.
- Default caption format: `<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display N:</strong> Caption text.</figcaption>`
- Center captions by default, keep `Display N:` in bold, and end caption text with a period.

## Typography

- Use a clean sans-serif stack consistent with the current site and Docusaurus defaults.
- Keep typography plain, readable, and professional rather than expressive.
- Headings should use the blue palette, preferably the primary blue for major headings.
- Body text should remain dark and neutral for long-form reading.
- Use bold for emphasis sparingly and structurally.

## Page Layout

- Default page background should stay white or near-white.
- Blue should provide hierarchy through headers, tables, links, and callouts.
- Leave enough whitespace around figures and sections.
- Figures should remain centered and clearly captioned.
- Cards and callouts should use pale blue backgrounds instead of saturated fills.
- Cards, panels, callouts, and other display surfaces should use sharp corners.
- Avoid rounded containers for data displays, figure frames, dashboards, and callout backgrounds.

## Links, Buttons, And UI Accents

- Links should use the secondary blue and darken on hover.
- Buttons should use the primary blue with white text.
- Hover and focus states should stay within the same blue family.
- Avoid green, purple, or bright multi-color accents unless the content itself requires them.
- Buttons, pills, inputs, and control surfaces should use sharp corners rather than rounded shapes.
- When CSS is available, prefer `border-radius: 0` for buttons, panels, inputs, and display containers.

For GitHub README pages:

- use blue shields, badges, or linked images instead of CSS-styled buttons
- prefer simple Markdown links over custom HTML unless HTML is clearly needed

## Content Tone In Design

The site is closer to a research publication than a marketing page.

- prefer clarity over decoration
- prefer diagrams, figures, and tables over ornamental UI
- prefer restrained blue emphasis over many competing colors
- prefer consistency across docs pages

The same tone should hold across repositories:

- serious rather than promotional
- structured rather than decorative
- transferable rather than tied to one implementation stack

## Portability Rules

This house style must be usable outside this repository.

- Do not depend on repo-specific relative paths inside the guide.
- Do not require Docusaurus-only components for the style to make sense.
- When examples are given, prefer plain Markdown or generic CSS.
- If a design element only works in one platform, provide a portable fallback.
- Prefer reusable color tokens and layout rules over references to specific files.

## GitHub README Compatibility

When this style is applied in a GitHub README:

- use plain Markdown first
- use tables as the main structured visual device
- use banner images when a strong header treatment is needed
- assume custom CSS is unavailable
- assume layout control is limited

This means the core identity should survive even in a minimal environment:

- deep blue primary color
- white or near-white background
- structured tables
- restrained, publication-like presentation

## Implementation Starter For CSS-Based Sites

When the style is applied in CSS, use blue theme tokens instead of the current default green Docusaurus tokens.

```css
:root {
  --ifm-color-primary: #0f3368;
  --ifm-color-primary-dark: #0c2c5a;
  --ifm-color-primary-darker: #0b2953;
  --ifm-color-primary-darkest: #092145;
  --ifm-color-primary-light: #16407d;
  --ifm-color-primary-lighter: #1c4b8f;
  --ifm-color-primary-lightest: #2a60ad;

  --site-blue-strong: #0f3368;
  --site-blue-mid: #1c4b8f;
  --site-blue-soft: #78aae6;
  --site-blue-surface: #eaf2fb;
  --site-blue-row: rgba(120, 170, 230, 0.16);
  --site-blue-border: #d6e4f5;
  --site-body-text: #1f2d3d;
}

.navbar {
  background: var(--site-blue-strong);
}

table thead th {
  background: var(--site-blue-strong);
  color: #fff;
  text-align: left;
}

table tbody tr:nth-child(even) {
  background: var(--site-blue-row);
}

.button,
.card,
.panel,
input,
select,
textarea {
  border-radius: 0;
}
```

## Practical Rule

If a new page, component, or table does not look like it belongs next to the current front page, it should be revised until it matches this blue, structured, publication-style visual language.
