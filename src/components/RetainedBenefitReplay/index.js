import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const CHART_PADDING = { left: 56, right: 18, top: 16, bottom: 34 };

const SERIES = [
  { key: 'mean_cooperation_hist', statKey: 'mean_cooperation', label: 'Mean h', color: '#a1344e' },
  { key: 'local_assortment_hist', statKey: 'local_assortment', label: 'Assortment', color: '#1c4b8f' },
  { key: 'dominant_lineage_share_hist', statKey: 'dominant_lineage_share', label: 'Dominant lineage', color: '#63803d' },
];

const COLORS = {
  chartBackground: '#ffffff',
  chartGrid: 'rgba(15, 51, 104, 0.12)',
  chartAxis: 'rgba(15, 51, 104, 0.35)',
  chartMarker: '#0f3368',
  chartText: '#4e6279',
  low: [244, 239, 229],
  mid: [120, 170, 230],
  high: [161, 52, 78],
  gridMinor: 'rgba(176, 192, 176, 0.45)',
  gridMajor: 'rgba(120, 140, 120, 0.7)',
};

function formatInteger(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return 'n/a';
  }
  return Number(value).toLocaleString();
}

function formatValue(value, digits = 3) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return 'n/a';
  }
  return Number(value).toFixed(digits);
}

function mixColor(start, end, mix) {
  const boundedMix = Math.max(0, Math.min(1, mix));
  const blended = start.map((value, index) => (
    Math.round(value + (end[index] - value) * boundedMix)
  ));
  return `rgb(${blended[0]}, ${blended[1]}, ${blended[2]})`;
}

function cooperationColor(value) {
  const v = Number(value) || 0;
  if (v <= 0.5) {
    return mixColor(COLORS.low, COLORS.mid, v / 0.5);
  }
  return mixColor(COLORS.mid, COLORS.high, (v - 0.5) / 0.5);
}

function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const lookup = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q],
  ][mod];
  return lookup.map((component) => Math.round(component * 255));
}

function lineageColor(lineageId) {
  const numeric = Number(lineageId) || 0;
  const hue = (numeric * 0.6180339887498949) % 1;
  const saturation = 0.55 + 0.18 * (((numeric * 37) % 7) / 6);
  const value = 0.8 + 0.08 * (((numeric * 19) % 5) / 4);
  const rgb = hsvToRgb(hue, saturation, value);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function chartRect(canvas) {
  return {
    left: CHART_PADDING.left,
    top: CHART_PADDING.top,
    right: canvas.width - CHART_PADDING.right,
    bottom: canvas.height - CHART_PADDING.bottom,
  };
}

function drawChartScaffold(ctx, canvas, stepsDone) {
  const rect = chartRect(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = COLORS.chartBackground;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const plotHeight = rect.bottom - rect.top;
  const yTicks = 4;

  ctx.strokeStyle = COLORS.chartGrid;
  ctx.lineWidth = 1;
  for (let tick = 0; tick <= yTicks; tick += 1) {
    const ratio = tick / yTicks;
    const y = rect.bottom - ratio * plotHeight;
    ctx.beginPath();
    ctx.moveTo(rect.left, y);
    ctx.lineTo(rect.right, y);
    ctx.stroke();
  }

  ctx.strokeStyle = COLORS.chartAxis;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(rect.left, rect.top);
  ctx.lineTo(rect.left, rect.bottom);
  ctx.lineTo(rect.right, rect.bottom);
  ctx.stroke();

  ctx.fillStyle = COLORS.chartText;
  ctx.font = '12px IBM Plex Mono, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let tick = 0; tick <= yTicks; tick += 1) {
    const ratio = tick / yTicks;
    const y = rect.bottom - ratio * plotHeight;
    ctx.fillText(ratio.toFixed(2), rect.left - 8, y);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('0', rect.left, rect.bottom + 10);
  ctx.fillText(Number(stepsDone || 0).toLocaleString(), rect.right, rect.bottom + 10);

  return rect;
}

function drawSeries(ctx, rect, values, color) {
  if (!values || !values.length) {
    return;
  }

  const plotWidth = rect.right - rect.left;
  const plotHeight = rect.bottom - rect.top;
  const denominator = Math.max(1, values.length - 1);

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  let penDown = false;
  values.forEach((value, index) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      penDown = false;
      return;
    }
    const x = rect.left + (index / denominator) * plotWidth;
    const y = rect.bottom - Number(value) * plotHeight;
    if (!penDown) {
      ctx.moveTo(x, y);
      penDown = true;
      return;
    }
    ctx.lineTo(x, y);
  });

  ctx.stroke();
}

function drawMetricsChart(canvas, summary, step) {
  const ctx = canvas.getContext('2d');
  const rect = drawChartScaffold(ctx, canvas, summary.steps_done);

  SERIES.forEach((series) => {
    drawSeries(ctx, rect, summary[series.key], series.color);
  });

  const plotWidth = rect.right - rect.left;
  const markerX = rect.left + (Number(step) / Math.max(1, summary.steps_done)) * plotWidth;

  ctx.strokeStyle = COLORS.chartMarker;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(markerX, rect.top);
  ctx.lineTo(markerX, rect.bottom);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawWorld(canvas, manifest, frame, viewMode) {
  const ctx = canvas.getContext('2d');
  const gridWidth = Number(manifest.grid_width);
  const gridHeight = Number(manifest.grid_height);
  const majorStep = Number(manifest.grid_major_step || 6);
  const cellWidth = canvas.width / gridWidth;
  const cellHeight = canvas.height / gridHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = cooperationColor(0.0);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < gridHeight; y += 1) {
    for (let x = 0; x < gridWidth; x += 1) {
      ctx.fillStyle = viewMode === 'cooperation'
        ? cooperationColor(frame.cooperation_grid[y][x])
        : lineageColor(frame.lineage_grid[y][x]);
      ctx.fillRect(
        x * cellWidth,
        y * cellHeight,
        Math.ceil(cellWidth) + 0.5,
        Math.ceil(cellHeight) + 0.5,
      );
    }
  }

  for (let x = 0; x <= gridWidth; x += 1) {
    ctx.beginPath();
    ctx.strokeStyle = x % majorStep === 0 ? COLORS.gridMajor : COLORS.gridMinor;
    ctx.lineWidth = x % majorStep === 0 ? 2 : 1;
    ctx.moveTo(x * cellWidth, 0);
    ctx.lineTo(x * cellWidth, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= gridHeight; y += 1) {
    ctx.beginPath();
    ctx.strokeStyle = y % majorStep === 0 ? COLORS.gridMajor : COLORS.gridMinor;
    ctx.lineWidth = y % majorStep === 0 ? 2 : 1;
    ctx.moveTo(0, y * cellHeight);
    ctx.lineTo(canvas.width, y * cellHeight);
    ctx.stroke();
  }
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

export default function RetainedBenefitReplay() {
  const replayDataBasePath = useBaseUrl('/evolved-cooperation/retained-benefit/replay/data/retained-benefit/');
  const worldCanvasRef = useRef(null);
  const chartCanvasRef = useRef(null);

  const [manifest, setManifest] = useState(null);
  const [summary, setSummary] = useState(null);
  const [frames, setFrames] = useState([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [framesPerSecond, setFramesPerSecond] = useState(8);
  const [viewMode, setViewMode] = useState('cooperation');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const manifestData = await loadJson(`${replayDataBasePath}manifest.json`);
        const summaryData = await loadJson(`${replayDataBasePath}${manifestData.summary_path}`);
        const chunkPayloads = await Promise.all(
          manifestData.frame_paths.map((path) => loadJson(`${replayDataBasePath}${path}`)),
        );

        const orderedFrames = new Array(Number(manifestData.sampled_frame_count));
        chunkPayloads.forEach((chunk) => {
          chunk.frames.forEach((frame, index) => {
            orderedFrames[chunk.start_frame_index + index] = frame;
          });
        });

        if (cancelled) {
          return;
        }

        setManifest(manifestData);
        setSummary(summaryData);
        setFrames(orderedFrames);
        setCurrentFrameIndex(0);
      } catch (error) {
        if (cancelled) {
          return;
        }
        setErrorText(String(error));
      }
    }

    void boot();

    return () => {
      cancelled = true;
    };
  }, [replayDataBasePath]);

  useEffect(() => {
    if (!playing || frames.length === 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setCurrentFrameIndex((previous) => Math.min(previous + 1, frames.length - 1));
    }, 1000 / framesPerSecond);

    return () => {
      window.clearInterval(timerId);
    };
  }, [playing, frames.length, framesPerSecond]);

  useEffect(() => {
    if (!playing || frames.length === 0) {
      return;
    }
    if (currentFrameIndex >= frames.length - 1) {
      setPlaying(false);
    }
  }, [currentFrameIndex, frames.length, playing]);

  useEffect(() => {
    if (!manifest || !summary || frames.length === 0) {
      return;
    }

    const currentFrame = frames[currentFrameIndex];
    if (!currentFrame || !worldCanvasRef.current || !chartCanvasRef.current) {
      return;
    }

    drawWorld(worldCanvasRef.current, manifest, currentFrame, viewMode);
    drawMetricsChart(chartCanvasRef.current, summary, currentFrame.step);
  }, [currentFrameIndex, frames, manifest, summary, viewMode]);

  const currentFrame = frames[currentFrameIndex];
  const frameCount = frames.length;
  const frameIndexLabel = frameCount ? `${currentFrameIndex + 1} / ${frameCount}` : '0 / 0';
  const stepLabel = currentFrame ? `Step ${Number(currentFrame.step).toLocaleString()}` : 'Step 0';
  const viewerCaption = currentFrame
    ? (viewMode === 'cooperation'
      ? `Mean h ${formatValue(currentFrame.stats.mean_cooperation)}, assortment ${formatValue(currentFrame.stats.local_assortment)}, dominant lineage ${formatValue(currentFrame.stats.dominant_lineage_share)}.`
      : `Lineages ${formatInteger(currentFrame.stats.lineage_count)}, mean h ${formatValue(currentFrame.stats.mean_cooperation)}, mean fitness ${formatValue(currentFrame.stats.mean_fitness)}.`)
    : errorText || 'Loading replay bundle.';

  return (
    <div className={styles.pageShell}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Evolved Cooperation</p>
          <h2 className={styles.heroTitle}>Retained Benefit</h2>
          <p className={styles.heroText}>
            Sampled browser replay of the abstract Retained Benefit model. Toggle between the continuous cooperation field and the inherited lineage structure that channels retained benefit.
          </p>
        </div>
      </header>

      {errorText ? <p className={styles.errorText}>{errorText}</p> : null}

      <div className={styles.layout}>
        <section className={`${styles.card} ${styles.viewerCard}`}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Replay</p>
              <h3 className={styles.cardTitle}>World State</h3>
            </div>
          </div>

          <div className={styles.controlRow}>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              type="button"
              onClick={() => {
                setPlaying((previous) => !previous);
              }}
              disabled={frameCount === 0}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              type="button"
              onClick={() => {
                setPlaying(false);
                setCurrentFrameIndex(0);
              }}
              disabled={frameCount === 0}
            >
              Restart
            </button>
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              type="button"
              onClick={() => {
                setViewMode((previous) => (
                  previous === 'cooperation' ? 'lineage' : 'cooperation'
                ));
              }}
              disabled={frameCount === 0}
            >
              {viewMode === 'cooperation' ? 'View: Cooperation' : 'View: Lineage'}
            </button>
            <label className={styles.field}>
              <span>Playback</span>
              <select
                className={styles.select}
                value={String(framesPerSecond)}
                onChange={(event) => {
                  setFramesPerSecond(Number(event.target.value));
                }}
                disabled={frameCount === 0}
              >
                <option value="2">2 fps</option>
                <option value="4">4 fps</option>
                <option value="8">8 fps</option>
                <option value="12">12 fps</option>
                <option value="16">16 fps</option>
              </select>
            </label>
          </div>

          <div className={styles.sliderRow}>
            <label htmlFor="retained-benefit-frame-slider">Frame</label>
            <input
              id="retained-benefit-frame-slider"
              className={styles.rangeInput}
              type="range"
              min="0"
              max={String(Math.max(0, frameCount - 1))}
              value={String(Math.min(currentFrameIndex, Math.max(0, frameCount - 1)))}
              step="1"
              onChange={(event) => {
                setPlaying(false);
                setCurrentFrameIndex(Number(event.target.value));
              }}
              disabled={frameCount === 0}
            />
            <span className={styles.frameIndexLabel}>{frameIndexLabel}</span>
          </div>

          <canvas
            ref={worldCanvasRef}
            className={styles.worldCanvas}
            width="900"
            height="900"
            aria-label="Retained Benefit world replay"
          />

          <div className={styles.viewerFooter}>
            <p className={styles.monoText}>{stepLabel}</p>
            <p className={styles.viewerCaption}>{viewerCaption}</p>
          </div>
        </section>

        <div className={styles.sidebarColumn}>
          <section className={`${styles.card} ${styles.chartCard}`}>
            <div className={`${styles.cardHeader} ${styles.cardHeaderCompact}`}>
              <div>
                <h3 className={styles.cardTitle}>Selection Metrics</h3>
                <p className={styles.chartSubtitle}>Mean cooperation, assortment, and dominant-lineage share</p>
              </div>
            </div>

            <canvas
              ref={chartCanvasRef}
              className={styles.chartCanvas}
              width="420"
              height="320"
              aria-label="Retained Benefit history"
            />
          </section>

          <aside className={`${styles.card} ${styles.legendCard}`}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.sectionEyebrow}>Guide</p>
                <h3 className={styles.cardTitle}>Current State And Legend</h3>
              </div>
            </div>

            <div className={styles.metricGrid}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Mean h</span>
                <span className={styles.metricValue}>{formatValue(currentFrame?.stats.mean_cooperation)}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Assortment</span>
                <span className={styles.metricValue}>{formatValue(currentFrame?.stats.local_assortment)}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Dominant lineage</span>
                <span className={styles.metricValue}>{formatValue(currentFrame?.stats.dominant_lineage_share)}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Lineages</span>
                <span className={styles.metricValue}>{formatInteger(currentFrame?.stats.lineage_count)}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Mean fitness</span>
                <span className={styles.metricValue}>{formatValue(currentFrame?.stats.mean_fitness)}</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Trait variance</span>
                <span className={styles.metricValue}>{formatValue(currentFrame?.stats.var_cooperation)}</span>
              </div>
            </div>

            <div className={styles.legendBlock}>
              <div className={styles.legendRow}>
                <span className={styles.swatch} style={{ background: cooperationColor(0.0) }} />
                <span>Low cooperation</span>
              </div>
              <div className={styles.legendRow}>
                <span className={styles.swatch} style={{ background: cooperationColor(0.5) }} />
                <span>Mid cooperation</span>
              </div>
              <div className={styles.legendRow}>
                <span className={styles.swatch} style={{ background: cooperationColor(1.0) }} />
                <span>High cooperation</span>
              </div>
            </div>

            <p className={styles.noteText}>
              In cooperation view, each cell is colored by the inherited trait value <code>h</code>. In lineage view, colors switch to inherited lineage labels so local clustering becomes visible.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
