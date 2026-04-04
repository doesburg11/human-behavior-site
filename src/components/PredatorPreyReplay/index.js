import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const CHART_PADDING = { left: 56, right: 18, top: 16, bottom: 34 };

const COLORS = {
  chartBackground: '#ffffff',
  chartGrid: 'rgba(15, 51, 104, 0.12)',
  chartAxis: 'rgba(15, 51, 104, 0.35)',
  chartMarker: '#0f3368',
  chartText: '#4e6279',
  prey: '#2d5fba',
  predatorLow: [182, 70, 40],
  predatorHigh: [121, 30, 36],
  grassLow: [244, 239, 229],
  grassHigh: [79, 138, 87],
  trait: '#1c4b8f',
};

function formatValue(value, digits = 3) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return 'n/a';
  }
  return Number(value).toFixed(digits);
}

function mixColor(start, end, mix) {
  const boundedMix = Math.max(0, Math.min(1, mix));
  const blended = start.map((value, index) => {
    return Math.round(value + (end[index] - value) * boundedMix);
  });
  return `rgb(${blended[0]}, ${blended[1]}, ${blended[2]})`;
}

function predatorColor(trait) {
  return mixColor(COLORS.predatorLow, COLORS.predatorHigh, Number(trait) || 0);
}

function chartRect(canvas) {
  return {
    left: CHART_PADDING.left,
    top: CHART_PADDING.top,
    right: canvas.width - CHART_PADDING.right,
    bottom: canvas.height - CHART_PADDING.bottom,
  };
}

function drawChartScaffold(ctx, canvas, maxValue, stepsDone) {
  const rect = chartRect(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = COLORS.chartBackground;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const plotWidth = rect.right - rect.left;
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
    const value = maxValue * ratio;
    ctx.fillText(value.toFixed(maxValue <= 1 ? 2 : 0), rect.left - 8, y);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('0', rect.left, rect.bottom + 10);
  ctx.fillText(
    Number(stepsDone || 0).toLocaleString(),
    rect.right,
    rect.bottom + 10,
  );

  return rect;
}

function drawSeries(ctx, rect, values, color, maxValue) {
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
    const y = rect.bottom - (Number(value) / Math.max(maxValue, 1e-9)) * plotHeight;
    if (!penDown) {
      ctx.moveTo(x, y);
      penDown = true;
      return;
    }
    ctx.lineTo(x, y);
  });

  ctx.stroke();
}

function drawChartMarker(canvas, summary, step) {
  const ctx = canvas.getContext('2d');
  const rect = drawChartScaffold(ctx, canvas, 1.0, summary.steps_done);
  drawSeries(ctx, rect, summary.mean_trait_hist, COLORS.trait, 1.0);

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

function drawWorld(canvas, manifest, frame) {
  const ctx = canvas.getContext('2d');
  const gridWidth = Number(manifest.grid_width);
  const gridHeight = Number(manifest.grid_height);
  const cellWidth = canvas.width / gridWidth;
  const cellHeight = canvas.height / gridHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < gridHeight; y += 1) {
    for (let x = 0; x < gridWidth; x += 1) {
      const grassValue = frame.grass[y * gridWidth + x] / Number(manifest.grass_quantization_levels);
      ctx.fillStyle = mixColor(COLORS.grassLow, COLORS.grassHigh, grassValue);
      ctx.fillRect(
        x * cellWidth,
        y * cellHeight,
        Math.ceil(cellWidth) + 0.5,
        Math.ceil(cellHeight) + 0.5,
      );
    }
  }

  ctx.fillStyle = COLORS.prey;
  frame.preys.forEach(([x, y]) => {
    ctx.fillRect(
      x * cellWidth + cellWidth * 0.18,
      y * cellHeight + cellHeight * 0.18,
      Math.max(2, cellWidth * 0.64),
      Math.max(2, cellHeight * 0.64),
    );
  });

  frame.predators.forEach(([x, y, trait]) => {
    const centerX = (x + 0.5) * cellWidth;
    const centerY = (y + 0.5) * cellHeight;
    const radius = Math.max(2.5, Math.min(cellWidth, cellHeight) * 0.34);
    ctx.beginPath();
    ctx.fillStyle = predatorColor(trait);
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(18, 18, 18, 0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

export default function PredatorPreyReplay() {
  const replayDataBasePath = useBaseUrl('/evolved-cooperation/predator-prey-public-goods/replay/data/public-goods-demo/');
  const worldCanvasRef = useRef(null);
  const chartCanvasRef = useRef(null);

  const [manifest, setManifest] = useState(null);
  const [summary, setSummary] = useState(null);
  const [frames, setFrames] = useState([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [framesPerSecond, setFramesPerSecond] = useState(8);
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

    drawWorld(worldCanvasRef.current, manifest, currentFrame);
    drawChartMarker(chartCanvasRef.current, summary, currentFrame.step);
  }, [currentFrameIndex, frames, manifest, summary]);

  const currentFrame = frames[currentFrameIndex];
  const frameCount = frames.length;
  const frameIndexLabel = frameCount ? `${currentFrameIndex + 1} / ${frameCount}` : '0 / 0';
  const stepLabel = currentFrame ? `Step ${Number(currentFrame.step).toLocaleString()}` : 'Step 0';
  const viewerCaption = currentFrame
    ? `Predators ${currentFrame.stats.predator_count}, prey ${currentFrame.stats.prey_count}, mean trait ${formatValue(currentFrame.stats.mean_trait, 3)}.`
    : errorText || 'Loading replay bundle.';

  return (
    <div className={styles.pageShell}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Evolved Cooperation</p>
          <h2 className={styles.heroTitle}>Predator-Prey Public Goods Replay</h2>
          <p className={styles.heroText}>
            Sampled browser replay of the Python model. The page now renders the replay directly instead of embedding a separate frame.
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
            <label htmlFor="predator-prey-frame-slider">Frame</label>
            <input
              id="predator-prey-frame-slider"
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
            aria-label="Predator-prey world replay"
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
                <h3 className={styles.cardTitle}>Cooperation Rate</h3>
                <p className={styles.chartSubtitle}>Mean Hunt-Investment Trait</p>
              </div>
            </div>

            <canvas
              ref={chartCanvasRef}
              className={styles.chartCanvas}
              width="420"
              height="320"
              aria-label="Cooperation rate history"
            />
          </section>

          <aside className={`${styles.card} ${styles.legendCard}`}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.sectionEyebrow}>Guide</p>
                <h3 className={styles.cardTitle}>Legend</h3>
              </div>
            </div>

            <div className={styles.legendBlock}>
              <div className={styles.legendRow}>
                <span className={`${styles.swatch} ${styles.swatchGrass}`} />
                <span>Grass</span>
              </div>
              <div className={styles.legendRow}>
                <span className={`${styles.swatch} ${styles.swatchPrey}`} />
                <span>Prey</span>
              </div>
              <div className={styles.legendRow}>
                <span className={`${styles.swatch} ${styles.swatchPredator}`} />
                <span>Predator</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
