#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const repoRoot = path.resolve(__dirname, '..');
const dataDir = path.join(
  repoRoot,
  'static',
  'evolved-cooperation',
  'spatial-prisoners-dilemma',
  'replay',
  'data',
  'spatial-prisoners-dilemma',
);
const outputPath = path.join(
  repoRoot,
  'static',
  'evolved-cooperation',
  'spatial-prisoners-dilemma',
  'spatial-prisoners-dilemma-overview-body.svg',
);

const WIDTH = 1400;
const HEIGHT = 860;
const MARGIN = 36;
const GAP = 28;
const TOP_PANEL_HEIGHT = 352;
const SUMMARY_WIDTH = 382;
const SNAPSHOT_STEPS = [0, 100, 200];

const COLORS = {
  page: '#ffffff',
  panel: '#f7fbff',
  accentPanel: '#eaf2fb',
  border: '#d6e4f5',
  title: '#0f3368',
  text: '#1f2d3d',
  muted: '#4e6279',
  chartGrid: 'rgba(15, 51, 104, 0.12)',
  chartAxis: 'rgba(15, 51, 104, 0.35)',
  empty: '#f4efe5',
  cooperate: '#78aae6',
  defect: '#b55343',
  titForTat: '#0f3368',
  random: '#c89b3c',
  gridMajor: 'rgba(120, 140, 120, 0.55)',
};

const STRATEGY_SERIES = [
  { key: 'same_trait_cooperate_hist', label: 'Co-op', color: COLORS.cooperate },
  { key: 'same_trait_defect_hist', label: 'Defect', color: COLORS.defect },
  { key: 'same_trait_tit_for_tat_hist', label: 'Tit-for-tat', color: COLORS.titForTat },
  { key: 'same_trait_random_hist', label: 'Random', color: COLORS.random },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function loadReplayBundle() {
  const manifest = readJson(path.join(dataDir, 'manifest.json'));
  const summary = readJson(path.join(dataDir, manifest.summary_path));
  const frames = new Array(Number(manifest.sampled_frame_count));

  manifest.frame_paths.forEach((relativePath) => {
    const chunk = readJson(path.join(dataDir, relativePath));
    chunk.frames.forEach((frame, index) => {
      frames[chunk.start_frame_index + index] = frame;
    });
  });

  return { manifest, summary, frames };
}

function panelRect(index) {
  const panelWidth = (WIDTH - (2 * MARGIN) - (2 * GAP)) / 3;
  return {
    x: MARGIN + (index * (panelWidth + GAP)),
    y: MARGIN,
    width: panelWidth,
    height: TOP_PANEL_HEIGHT,
  };
}

function chartRect() {
  const bottomY = MARGIN + TOP_PANEL_HEIGHT + GAP;
  const height = HEIGHT - bottomY - MARGIN;
  const width = WIDTH - (2 * MARGIN) - GAP - SUMMARY_WIDTH;
  return { x: MARGIN, y: bottomY, width, height };
}

function summaryRect() {
  const chart = chartRect();
  return {
    x: chart.x + chart.width + GAP,
    y: chart.y,
    width: SUMMARY_WIDTH,
    height: chart.height,
  };
}

function strategyColor(strategyId) {
  if (strategyId === 0) {
    return COLORS.cooperate;
  }
  if (strategyId === 1) {
    return COLORS.defect;
  }
  if (strategyId === 2) {
    return COLORS.titForTat;
  }
  return COLORS.random;
}

function majorGridLines(groupX, groupY, size, gridWidth, gridHeight, majorStep) {
  const lines = [];
  const cellWidth = size / gridWidth;
  const cellHeight = size / gridHeight;

  for (let x = 0; x <= gridWidth; x += majorStep) {
    const xPos = groupX + (x * cellWidth);
    lines.push(
      `<line x1="${xPos.toFixed(2)}" y1="${groupY.toFixed(2)}" x2="${xPos.toFixed(2)}" y2="${(groupY + size).toFixed(2)}" stroke="${COLORS.gridMajor}" stroke-width="1" />`,
    );
  }
  for (let y = 0; y <= gridHeight; y += majorStep) {
    const yPos = groupY + (y * cellHeight);
    lines.push(
      `<line x1="${groupX.toFixed(2)}" y1="${yPos.toFixed(2)}" x2="${(groupX + size).toFixed(2)}" y2="${yPos.toFixed(2)}" stroke="${COLORS.gridMajor}" stroke-width="1" />`,
    );
  }
  return lines.join('');
}

function renderSnapshotPanel(frame, rect, manifest) {
  const snapshotSize = 292;
  const snapshotX = rect.x + ((rect.width - snapshotSize) / 2);
  const snapshotY = rect.y + 86;
  const cellWidth = snapshotSize / Number(manifest.grid_width);
  const cellHeight = snapshotSize / Number(manifest.grid_height);
  const agents = frame.agents.map(([x, y, trait, sameTraitStrategy]) => {
    void trait;
    return `<rect x="${(snapshotX + (x * cellWidth)).toFixed(2)}" y="${(snapshotY + (y * cellHeight)).toFixed(2)}" width="${(cellWidth + 0.25).toFixed(2)}" height="${(cellHeight + 0.25).toFixed(2)}" fill="${strategyColor(Number(sameTraitStrategy))}" />`;
  }).join('');

  const step = Number(frame.step);
  const subtitle = `Population ${frame.stats.population}, mean energy ${Number(frame.stats.mean_energy).toFixed(1)}`;

  return `
    <g>
      <rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${COLORS.panel}" stroke="${COLORS.border}" stroke-width="1" />
      <text x="${(rect.x + 22).toFixed(2)}" y="${(rect.y + 30).toFixed(2)}" fill="${COLORS.title}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="20" font-weight="700">Step ${step}</text>
      <text x="${(rect.x + 22).toFixed(2)}" y="${(rect.y + 58).toFixed(2)}" fill="${COLORS.muted}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="14">${escapeXml(subtitle)}</text>
      <rect x="${snapshotX.toFixed(2)}" y="${snapshotY.toFixed(2)}" width="${snapshotSize}" height="${snapshotSize}" fill="${COLORS.empty}" stroke="${COLORS.border}" stroke-width="1" />
      ${agents}
      ${majorGridLines(snapshotX, snapshotY, snapshotSize, Number(manifest.grid_width), Number(manifest.grid_height), Number(manifest.grid_major_step || 5))}
      <text x="${(rect.x + 22).toFixed(2)}" y="${(rect.y + rect.height - 26).toFixed(2)}" fill="${COLORS.muted}" font-family="IBM Plex Mono, SFMono-Regular, Menlo, monospace" font-size="12">Same-trait strategy coloring</text>
    </g>
  `;
}

function lineChart(summary, rect) {
  const chartPadding = { left: 62, right: 22, top: 54, bottom: 48 };
  const plot = {
    left: rect.x + chartPadding.left,
    top: rect.y + chartPadding.top,
    right: rect.x + rect.width - chartPadding.right,
    bottom: rect.y + rect.height - chartPadding.bottom,
  };
  const plotWidth = plot.right - plot.left;
  const plotHeight = plot.bottom - plot.top;
  const maxSeriesValue = Math.max(...STRATEGY_SERIES.flatMap((series) => summary[series.key]));
  const maxValue = Math.ceil(maxSeriesValue / 100) * 100;
  const yTicks = 4;
  const xTicks = [0, 50, 100, 150, 200];

  const gridLines = [];
  const yLabels = [];
  for (let tick = 0; tick <= yTicks; tick += 1) {
    const ratio = tick / yTicks;
    const y = plot.bottom - (ratio * plotHeight);
    const value = Math.round(maxValue * ratio);
    gridLines.push(`<line x1="${plot.left.toFixed(2)}" y1="${y.toFixed(2)}" x2="${plot.right.toFixed(2)}" y2="${y.toFixed(2)}" stroke="${COLORS.chartGrid}" stroke-width="1" />`);
    yLabels.push(`<text x="${(plot.left - 10).toFixed(2)}" y="${(y + 4).toFixed(2)}" text-anchor="end" fill="${COLORS.muted}" font-family="IBM Plex Mono, SFMono-Regular, Menlo, monospace" font-size="12">${value}</text>`);
  }

  const xLabels = xTicks.map((tick) => {
    const x = plot.left + ((tick / 200) * plotWidth);
    return [
      `<line x1="${x.toFixed(2)}" y1="${plot.top.toFixed(2)}" x2="${x.toFixed(2)}" y2="${plot.bottom.toFixed(2)}" stroke="${COLORS.chartGrid}" stroke-width="1" />`,
      `<text x="${x.toFixed(2)}" y="${(plot.bottom + 28).toFixed(2)}" text-anchor="middle" fill="${COLORS.muted}" font-family="IBM Plex Mono, SFMono-Regular, Menlo, monospace" font-size="12">${tick}</text>`,
    ].join('');
  }).join('');

  const markers = SNAPSHOT_STEPS.map((tick) => {
    const x = plot.left + ((tick / 200) * plotWidth);
    return `<line x1="${x.toFixed(2)}" y1="${plot.top.toFixed(2)}" x2="${x.toFixed(2)}" y2="${plot.bottom.toFixed(2)}" stroke="${COLORS.title}" stroke-width="1.5" stroke-dasharray="5 4" />`;
  }).join('');

  const seriesLines = STRATEGY_SERIES.map((series) => {
    const points = summary[series.key].map((value, index) => {
      const step = summary.step_hist[index];
      const x = plot.left + ((step / 200) * plotWidth);
      const y = plot.bottom - ((Number(value) / maxValue) * plotHeight);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
    return `<polyline points="${points}" fill="none" stroke="${series.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />`;
  }).join('');

  return `
    <g>
      <rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${COLORS.panel}" stroke="${COLORS.border}" stroke-width="1" />
      <text x="${(rect.x + 24).toFixed(2)}" y="${(rect.y + 32).toFixed(2)}" fill="${COLORS.title}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="22" font-weight="700">Same-trait strategy counts</text>
      <text x="${(rect.x + 24).toFixed(2)}" y="${(rect.y + 58).toFixed(2)}" fill="${COLORS.muted}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="14">Tit-for-tat becomes the largest same-trait family while a mixed contingent regime persists.</text>
      <rect x="${plot.left.toFixed(2)}" y="${plot.top.toFixed(2)}" width="${plotWidth.toFixed(2)}" height="${plotHeight.toFixed(2)}" fill="#ffffff" stroke="${COLORS.border}" stroke-width="1" />
      ${gridLines.join('')}
      <line x1="${plot.left.toFixed(2)}" y1="${plot.top.toFixed(2)}" x2="${plot.left.toFixed(2)}" y2="${plot.bottom.toFixed(2)}" stroke="${COLORS.chartAxis}" stroke-width="1.5" />
      <line x1="${plot.left.toFixed(2)}" y1="${plot.bottom.toFixed(2)}" x2="${plot.right.toFixed(2)}" y2="${plot.bottom.toFixed(2)}" stroke="${COLORS.chartAxis}" stroke-width="1.5" />
      ${xLabels}
      ${yLabels.join('')}
      ${markers}
      ${seriesLines}
      <text x="${(plot.left - 44).toFixed(2)}" y="${(plot.top - 8).toFixed(2)}" fill="${COLORS.muted}" font-family="IBM Plex Mono, SFMono-Regular, Menlo, monospace" font-size="12">agents</text>
      <text x="${plot.right.toFixed(2)}" y="${(plot.bottom + 28).toFixed(2)}" text-anchor="end" fill="${COLORS.muted}" font-family="IBM Plex Mono, SFMono-Regular, Menlo, monospace" font-size="12">steps</text>
    </g>
  `;
}

function summaryCard(summary, rect) {
  const metricData = [
    { label: 'Population', value: `${summary.population_hist[0]} -> ${summary.final_population}` },
    { label: 'Mean energy', value: `${Number(summary.mean_energy_hist[0]).toFixed(1)} -> ${Number(summary.final_mean_energy).toFixed(1)}` },
    { label: 'Same-trait Tit-for-tat', value: `${summary.same_trait_tit_for_tat_hist[0]} -> ${summary.same_trait_tit_for_tat_hist.at(-1)}` },
    { label: 'Contingent encodings', value: `${summary.contingent_count_hist[0]} -> ${summary.final_contingent_count}` },
  ];

  const metricCards = metricData.map((metric, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const cardWidth = (rect.width - 70) / 2;
    const x = rect.x + 24 + (column * (cardWidth + 18));
    const y = rect.y + 74 + (row * 84);
    return `
      <g>
        <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cardWidth.toFixed(2)}" height="68" fill="${COLORS.accentPanel}" stroke="${COLORS.border}" stroke-width="1" />
        <text x="${(x + 14).toFixed(2)}" y="${(y + 20).toFixed(2)}" fill="${COLORS.muted}" font-family="IBM Plex Mono, SFMono-Regular, Menlo, monospace" font-size="11">${escapeXml(metric.label)}</text>
        <text x="${(x + 14).toFixed(2)}" y="${(y + 47).toFixed(2)}" fill="${COLORS.title}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="20" font-weight="700">${escapeXml(metric.value)}</text>
      </g>
    `;
  }).join('');

  const legendRows = STRATEGY_SERIES.map((series, index) => {
    const y = rect.y + 266 + (index * 28);
    return `
      <g>
        <rect x="${(rect.x + 28).toFixed(2)}" y="${y.toFixed(2)}" width="16" height="16" fill="${series.color}" stroke="${COLORS.border}" stroke-width="1" />
        <text x="${(rect.x + 56).toFixed(2)}" y="${(y + 13).toFixed(2)}" fill="${COLORS.text}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="15">${escapeXml(series.label)} against same-trait neighbors</text>
      </g>
    `;
  }).join('');

  const noteLines = [
    'World fills rapidly from a sparse start to the 1800-agent cap.',
    'Same-trait tit-for-tat becomes the largest family by step 100.',
    'The end state stays mixed rather than collapsing to one pure rule.',
  ];

  const noteText = noteLines.map((line, index) => {
    const y = rect.y + 400 + (index * 20);
    return `<text x="${(rect.x + 28).toFixed(2)}" y="${y.toFixed(2)}" fill="${COLORS.muted}" font-family="IBM Plex Mono, SFMono-Regular, Menlo, monospace" font-size="12">- ${escapeXml(line)}</text>`;
  }).join('');

  return `
    <g>
      <rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${COLORS.panel}" stroke="${COLORS.border}" stroke-width="1" />
      <text x="${(rect.x + 24).toFixed(2)}" y="${(rect.y + 32).toFixed(2)}" fill="${COLORS.title}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="22" font-weight="700">Run summary</text>
      <text x="${(rect.x + 24).toFixed(2)}" y="${(rect.y + 58).toFixed(2)}" fill="${COLORS.muted}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="14">Frozen website-demo run, seed 0, sample every 4 steps.</text>
      ${metricCards}
      <text x="${(rect.x + 24).toFixed(2)}" y="${(rect.y + 246).toFixed(2)}" fill="${COLORS.title}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="18" font-weight="700">Legend</text>
      ${legendRows}
      <text x="${(rect.x + 24).toFixed(2)}" y="${(rect.y + 380).toFixed(2)}" fill="${COLORS.title}" font-family="IBM Plex Sans, Avenir Next, Segoe UI, sans-serif" font-size="18" font-weight="700">Interpretation</text>
      ${noteText}
    </g>
  `;
}

function main() {
  const { manifest, summary, frames } = loadReplayBundle();
  const selectedFrames = SNAPSHOT_STEPS.map((step) => {
    const frame = frames.find((candidate) => Number(candidate.step) === step);
    if (!frame) {
      throw new Error(`Missing sampled frame for step ${step}.`);
    }
    return frame;
  });

  const topPanels = selectedFrames
    .map((frame, index) => renderSnapshotPanel(frame, panelRect(index), manifest))
    .join('');
  const chart = lineChart(summary, chartRect());
  const summaryPanel = summaryCard(summary, summaryRect());

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">Spatial Prisoner's Dilemma frozen overview</title>
  <desc id="desc">Static overview with step 0, step 100, and step 200 world snapshots, same-trait strategy counts over time, and a run summary card.</desc>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.page}" />
  ${topPanels}
  ${chart}
  ${summaryPanel}
</svg>
`;

  fs.writeFileSync(outputPath, svg, 'utf8');
  console.log(`Wrote ${outputPath}`);
}

main();