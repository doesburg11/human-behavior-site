import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles.module.css';

const W = 24;
const H = 24;
const N = W * H;
const N_LINEAGES = 18;
const CELL = 14;

const BASE_FITNESS = 1.0;
const SELECTION_TEMP = 0.12;
const INV_T = 1.0 / SELECTION_TEMP;
const MUT_RATE = 0.02;
const MUT_STD = 0.04;
const INIT_MEAN = 0.05;
const INIT_STD = 0.02;

// Left: kin selection, Hamilton's rule satisfied (b/c = 5, rb > c)
const KIN_SAME = 0.8;
const KIN_OTHER = 0.2;
const KIN_B_PLUS = 1.0;
const KIN_C_SCALE = 0.2;

// Right: Hamilton's rule violated (b/c = 0.2, rb < c) — same kin bias, cost swamps benefit
const ABL_SAME = 0.8;
const ABL_OTHER = 0.2;
const ABL_B_PLUS = 0.04;
const ABL_C_SCALE = 0.2;

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

// Exact K_plus.T @ B_plus formula from engine.py, parameterised by kin weights and payoffs.
function moranStep(h, lin, kinSame, kinOther, bPlus, cScale) {
  const fit = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const ns = NBRS[i];
    let r_plus = 0;
    for (let k = 0; k < 5; k++) {
      const j = ns[k];
      const kinJI = (k === 0) ? kinSame : (lin[j] === lin[i] ? kinSame : kinOther);
      const jn = NBRS[j];
      let jRowSum = kinSame;
      for (let m = 1; m < 5; m++) {
        jRowSum += (lin[jn[m]] === lin[j]) ? kinSame : kinOther;
      }
      r_plus += (kinJI / jRowSum) * h[j];
    }
    fit[i] = Math.max(0.001, BASE_FITNESS + r_plus * bPlus - h[i] * cScale);
  }

  const newH = new Float32Array(N);
  const newLin = new Int32Array(N);
  for (let i = 0; i < N; i++) {
    const ns = NBRS[i];
    const f0 = fit[ns[0]], f1 = fit[ns[1]], f2 = fit[ns[2]],
          f3 = fit[ns[3]], f4 = fit[ns[4]];
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < N; i++) {
    ctx.fillStyle = traitToColor(h[i]);
    ctx.fillRect((i % W) * CELL, Math.floor(i / W) * CELL, CELL, CELL);
  }
}

const SPEEDS = [
  { label: '1×', n: 1 },
  { label: '5×', n: 5 },
  { label: '20×', n: 20 },
  { label: '50×', n: 50 },
];

export default function KinSelectionComparison() {
  const canvasKinRef = useRef(null);
  const canvasAblRef = useRef(null);
  const simKinRef = useRef(null);
  const simAblRef = useRef(null);
  const rafRef = useRef(null);
  const stepsRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [stepCount, setStepCount] = useState(0);
  const [coopKin, setCoopKin] = useState(INIT_MEAN);
  const [coopAbl, setCoopAbl] = useState(INIT_MEAN);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    // Both conditions start from the identical random initial state.
    const base = makeState();
    simKinRef.current = { h: base.h.slice(), lin: base.lin.slice() };
    simAblRef.current = { h: base.h.slice(), lin: base.lin.slice() };
    stepsRef.current = 0;
    setStepCount(0);
    const meanCoop = base.h.reduce((a, b) => a + b, 0) / N;
    setCoopKin(meanCoop);
    setCoopAbl(meanCoop);
    if (canvasKinRef.current) drawGrid(canvasKinRef.current, base.h);
    if (canvasAblRef.current) drawGrid(canvasAblRef.current, base.h);
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
      const { h: hk, lin: lk } = simKinRef.current;
      const { h: ha, lin: la } = simAblRef.current;
      for (let s = 0; s < speed; s++) {
        moranStep(hk, lk, KIN_SAME, KIN_OTHER, KIN_B_PLUS, KIN_C_SCALE);
        moranStep(ha, la, ABL_SAME, ABL_OTHER, ABL_B_PLUS, ABL_C_SCALE);
      }
      stepsRef.current += speed;
      setStepCount(stepsRef.current);
      setCoopKin(hk.reduce((a, b) => a + b, 0) / N);
      setCoopAbl(ha.reduce((a, b) => a + b, 0) / N);
      if (canvasKinRef.current) drawGrid(canvasKinRef.current, hk);
      if (canvasAblRef.current) drawGrid(canvasAblRef.current, ha);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, speed]);

  return (
    <div className={styles.shell}>
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
        <span className={styles.speedLabel}>Speed</span>
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
        <span className={styles.stepCount}>Step {stepCount.toLocaleString()}</span>
      </div>

      <div className={styles.gridsRow}>
        <div className={styles.gridPanel}>
          <div className={styles.gridLabel}>Hamilton's rule satisfied (b/c = 5)</div>
          <canvas
            ref={canvasKinRef}
            width={W * CELL}
            height={H * CELL}
            className={styles.canvas}
            aria-label="Kin selection live grid — Hamilton's rule satisfied"
          />
          <div className={styles.coopStat}>
            Cooperation: <strong>{(coopKin * 100).toFixed(1)}%</strong>
          </div>
        </div>

        <div className={styles.gridPanel}>
          <div className={styles.gridLabel}>Hamilton's rule violated (b/c = 0.2)</div>
          <canvas
            ref={canvasAblRef}
            width={W * CELL}
            height={H * CELL}
            className={styles.canvas}
            aria-label="Kin selection live grid — Hamilton's rule violated"
          />
          <div className={styles.coopStat}>
            Cooperation: <strong>{(coopAbl * 100).toFixed(1)}%</strong>
          </div>
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
    </div>
  );
}
