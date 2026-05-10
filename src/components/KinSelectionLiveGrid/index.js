import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles.module.css';

const W = 24;
const H = 24;
const N = W * H;
const N_LINEAGES = 18;
const CELL = 18;

// Parameters matching kin_selection_config.py and interaction_kernel defaults
const BASE_FITNESS = 1.0;
const B_PLUS = 1.0;
const C_SCALE = 0.2;
const KIN_SAME = 0.8;
const KIN_OTHER = 0.2;
const SELECTION_TEMP = 0.12;
const MUT_RATE = 0.02;
const MUT_STD = 0.04;
const INIT_MEAN = 0.05;
const INIT_STD = 0.02;
const INV_T = 1.0 / SELECTION_TEMP;

// Toroidal von Neumann neighbours INCLUDING SELF (matches include_self_in_neighborhood=True)
const NBRS = Array.from({ length: N }, (_, i) => {
  const x = i % W;
  const y = Math.floor(i / W);
  return [
    i,
    ((y - 1 + H) % H) * W + x,
    ((y + 1) % H) * W + x,
    y * W + (x - 1 + W) % W,
    y * W + (x + 1) % W,
  ];
});

function randNormal(mean, std) {
  const u = Math.max(1e-10, Math.random());
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
  return mean + std * z;
}

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// Blue (35, 88, 196) at trait=0 → Orange (229, 118, 42) at trait=1
function traitToColor(t) {
  const r = Math.round(35 + t * (229 - 35));
  const g = Math.round(88 + t * (118 - 88));
  const b = Math.round(196 + t * (42 - 196));
  return `rgb(${r},${g},${b})`;
}

function makeState() {
  const h = new Float32Array(N);
  const lin = new Int32Array(N);
  for (let i = 0; i < N; i++) {
    h[i] = clamp01(randNormal(INIT_MEAN, INIT_STD));
    lin[i] = Math.floor(Math.random() * N_LINEAGES);
  }
  return { h, lin };
}

// One synchronous step: every agent simultaneously copies a local neighbour
// (or itself) selected by local softmax on fitness — matching selection.py exactly.
function moranStep(h, lin) {
  // 1. Compute fitness: R_plus[i] = sum_{j in nbrs(i)} K_plus[j,i] * h[j]
  //    K_plus[j,i] = kin(j,i) / row_sum_j  (exact K_plus.T @ B_plus from engine.py)
  //    Self IS included: cooperators route ~50% back to themselves, making them viable.
  const fit = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const ns = NBRS[i];
    let r_plus = 0;
    for (let k = 0; k < 5; k++) {
      const j = ns[k];
      // kin from j's perspective toward i (k=0 → j=i, always same lineage)
      const kinJI = (k === 0) ? KIN_SAME : (lin[j] === lin[i] ? KIN_SAME : KIN_OTHER);
      // j's row-normalisation denominator: j→self (always KIN_SAME) + j's 4 spatial nbrs
      const jn = NBRS[j];
      let jRowSum = KIN_SAME;
      for (let m = 1; m < 5; m++) {
        jRowSum += (lin[jn[m]] === lin[j]) ? KIN_SAME : KIN_OTHER;
      }
      r_plus += (kinJI / jRowSum) * h[j];
    }
    fit[i] = Math.max(0.001, BASE_FITNESS + r_plus * B_PLUS - h[i] * C_SCALE);
  }

  // 2. Each agent picks a parent from its local neighbourhood (self + 4 neighbours)
  //    using local softmax with temperature SELECTION_TEMP.
  const newH = new Float32Array(N);
  const newLin = new Int32Array(N);

  for (let i = 0; i < N; i++) {
    const ns = NBRS[i]; // [self, up, down, left, right]

    const f0 = fit[ns[0]];
    const f1 = fit[ns[1]];
    const f2 = fit[ns[2]];
    const f3 = fit[ns[3]];
    const f4 = fit[ns[4]];
    const maxF = Math.max(f0, f1, f2, f3, f4);

    const e0 = Math.exp((f0 - maxF) * INV_T);
    const e1 = Math.exp((f1 - maxF) * INV_T);
    const e2 = Math.exp((f2 - maxF) * INV_T);
    const e3 = Math.exp((f3 - maxF) * INV_T);
    const e4 = Math.exp((f4 - maxF) * INV_T);
    const total = e0 + e1 + e2 + e3 + e4;

    let r = Math.random() * total;
    let parent;
    r -= e0; if (r <= 0) { parent = ns[0]; }
    else { r -= e1; if (r <= 0) { parent = ns[1]; }
    else { r -= e2; if (r <= 0) { parent = ns[2]; }
    else { r -= e3; if (r <= 0) { parent = ns[3]; }
    else { parent = ns[4]; } } } }

    let newTrait = h[parent];
    if (Math.random() < MUT_RATE) {
      newTrait = clamp01(newTrait + randNormal(0, MUT_STD));
    }
    newH[i] = newTrait;
    newLin[i] = lin[parent];
  }

  h.set(newH);
  lin.set(newLin);
}

function drawGrid(canvas, h) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < N; i++) {
    ctx.fillStyle = traitToColor(h[i]);
    ctx.fillRect((i % W) * CELL + 1, Math.floor(i / W) * CELL + 1, CELL - 1, CELL - 1);
  }
}

const SPEEDS = [
  { label: '1×', n: 1 },
  { label: '5×', n: 5 },
  { label: '20×', n: 20 },
  { label: '50×', n: 50 },
];

export default function KinSelectionLiveGrid() {
  const canvasRef = useRef(null);
  const simRef = useRef(null);
  const rafRef = useRef(null);
  const stepsRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [stepCount, setStepCount] = useState(0);
  const [coop, setCoop] = useState(INIT_MEAN);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    const state = makeState();
    simRef.current = state;
    stepsRef.current = 0;
    setStepCount(0);
    setCoop(state.h.reduce((a, b) => a + b, 0) / N);
    if (canvasRef.current) drawGrid(canvasRef.current, state.h);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return undefined;
    }

    function tick() {
      const { h, lin } = simRef.current;
      for (let s = 0; s < speed; s++) moranStep(h, lin);
      stepsRef.current += speed;
      setStepCount(stepsRef.current);
      setCoop(h.reduce((a, b) => a + b, 0) / N);
      if (canvasRef.current) drawGrid(canvasRef.current, h);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, speed]);

  return (
    <div className={styles.shell}>
      <div className={styles.layout}>
        <canvas
          ref={canvasRef}
          width={W * CELL}
          height={H * CELL}
          className={styles.canvas}
          aria-label="Kin selection live grid"
        />
        <div className={styles.sidebar}>
          <div className={styles.controls}>
            <button
              className={styles.btnPrimary}
              onClick={() => setPlaying((p) => !p)}
              type="button"
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button className={styles.btnSecondary} onClick={reset} type="button">
              Reset
            </button>
          </div>

          <div className={styles.speedRow}>
            <span className={styles.label}>Speed</span>
            {SPEEDS.map(({ label, n }) => (
              <button
                key={n}
                className={speed === n ? styles.btnSpeedActive : styles.btnSpeed}
                onClick={() => setSpeed(n)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          <div className={styles.stats}>
            <div className={styles.statRow}>
              <span>Step</span>
              <span>{stepCount.toLocaleString()}</span>
            </div>
            <div className={styles.statRow}>
              <span>Cooperation</span>
              <span>{(coop * 100).toFixed(1)}%</span>
            </div>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendRow}>
              <span className={styles.swatchBlue} />
              <span>Defector (trait 0)</span>
            </div>
            <div className={styles.legendRow}>
              <span className={styles.swatchOrange} />
              <span>Cooperator (trait 1)</span>
            </div>
          </div>

          <p className={styles.desc}>
            24×24 toroidal grid, 18 lineages. Rare cooperators (~5%) in a
            defector-dominated population. Kin-biased routing directs benefit
            preferentially to same-lineage neighbours (weight 0.8 vs 0.2).
            Hamilton's rule: <em>rb &gt; c</em> with b/c&nbsp;=&nbsp;5.
            Each reset produces a new random invasion.
          </p>
        </div>
      </div>
    </div>
  );
}
