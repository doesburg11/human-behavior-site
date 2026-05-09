---
id: kin-selection
title: Kin Selection
sidebar_position: 1
slug: /evolved-cooperation/kin-selection
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes the <code>moran_models/nowak_mechanisms/kin_selection/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

Kin selection is the first of Nowak's five mechanisms for the evolution of cooperation. Cooperation spreads when the benefit delivered to a recipient, weighted by genetic relatedness, exceeds the private cost paid by the actor — Hamilton's rule: $rB > C$.

## How It Is Implemented Here

Relatedness is operationalised through **lineage labels**. Every site carries an inherited lineage identifier. The positive routing kernel assigns higher weight to same-lineage neighbors than to other-lineage neighbors:

$$
K^+_{j \to i} \propto
\begin{cases}
w_{\text{same}} & \text{if lineage}_j = \text{lineage}_i \\
w_{\text{other}} & \text{otherwise}
\end{cases}
$$

with row normalization applied afterward. Because offspring inherit the parent's lineage label, cooperator clusters accumulate same-lineage neighbors over time, which progressively recirculates more of the cooperative benefit back toward cooperators — the positive feedback that makes cooperation viable.

## One Step

One full synchronous kin-selection update runs as follows. All sites update simultaneously.

<figure style={{ margin: '0 0 1.25rem 0' }}>
<div style={{ border: '1px solid #d6e4f5', overflow: 'hidden' }}>

<div style={{ background: '#0f3368', padding: '1rem 1.5rem' }}>
<div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem' }}>Kin Selection Simulation Step</div>
<div style={{ color: '#ccdcef', fontSize: '0.9rem' }}>One synchronous grid update from step t to step t + 1 under kin-selection routing.</div>
</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>1</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Start from the current grid state</p>

Each site stores one cooperation trait $h$ and one inherited lineage label.

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>2</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Compute cooperative output and private cost</p>

$$B_i^+ = B_{\text{plus}} \cdot h_i, \qquad C_i = C_{\text{scale}} \cdot h_i$$

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>3</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Build the kin-weighted routing kernel</p>

Assign raw weight $w_{\text{same}}$ to same-lineage neighbors and $w_{\text{other}}$ to other-lineage neighbors, then row-normalize:

$$w_{ij} = \begin{cases} w_{\text{same}} & \text{if } \text{lineage}_i = \text{lineage}_j \\ w_{\text{other}} & \text{otherwise} \end{cases} \qquad K_{ij}^+ = \frac{w_{ij}}{\sum_k w_{ik}}$$

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>4</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Accumulate lineage-weighted receipts</p>

Each site sums the kin-weighted share of cooperative benefit received from its neighbors:

$$R_i^+ = \sum_j K_{ji}^+ \cdot B_j^+$$

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>5</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Compute site fitness</p>

$$W_i = w_0 + R_i^+ - C_i$$

Baseline fitness $w_0$ dampens selection intensity.

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>6</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Sample a local parent by softmax over fitness, copy trait and lineage</p>

Parent selection is restricted to the site's local neighborhood. The offspring inherits trait $h$ (with small Gaussian mutation) and lineage label — same-lineage clusters grow when cooperators reproduce locally.

</div>
</div>
</div>

</div>
<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> One synchronous kin-selection update from step <code>t</code> to step <code>t + 1</code>.</figcaption>
</figure>

**Production**

Each site produces cooperative output and pays a private cost proportional to its trait:

$$B_i^+ = B_{\text{plus}} \cdot h_i$$

$$C_i = C_{\text{scale}} \cdot h_i$$

**Kernel construction**

For each producer $i$, a raw routing weight $w_{ij}$ is assigned to each neighbor $j$ based on lineage match, then row-normalized so weights sum to 1:

$$w_{ij} = \begin{cases} w_{\text{same}} & \text{if } \text{lineage}_i = \text{lineage}_j \\ w_{\text{other}} & \text{otherwise} \end{cases}$$

$$K_{ij}^+ = \frac{w_{ij}}{\sum_k w_{ik}}$$

**Routing**

Each site receives the lineage-weighted share of every neighbor's production:

$$R_i^+ = \sum_j K_{ji}^+ \cdot B_j^+$$

**Fitness score**

$$W_i = w_0 + R_i^+ - C_i$$

**Local replacement**

Each site samples a parent from its local neighborhood via softmax over $W$. The offspring inherits the parent's trait $h$ (with small Gaussian mutation) and lineage label. Because the lineage label is inherited, same-lineage clusters grow when local cooperators outcompete their neighbors — the feedback that sustains cooperation.

Variable definitions:

- $h_i$ is site $i$'s cooperation trait in [0, 1]
- $B_i^+$ is the cooperative benefit produced by site $i$
- $C_i$ is the private cost paid by site $i$
- $K_{ij}^+$ is the normalized routing weight from producer $i$ to recipient $j$
- $R_i^+$ is the total routed benefit received by site $i$
- $W_i$ is the fitness score used for local replacement
- $w_0$ is the fixed baseline fitness shared by all sites, which dampens selection intensity

## Worked Example

Consider a focal site $i$ with four von Neumann neighbors, two same-lineage (A) and two other-lineage (B):

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Site</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Lineage</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Trait $h$</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$i$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>A</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.8</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$j_1$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>A</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.7</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$j_2$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>A</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.6</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$j_3$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>B</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.9</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$j_4$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>B</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.5</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Worked example: trait values and lineage assignments for focal site i and its four von Neumann neighbors.</figcaption>
</figure>

**Production**

$$B_i^+ = 1.0 \times 0.8 = 0.80, \qquad C_i = 0.2 \times 0.8 = 0.16$$

**Outgoing kernel row for site $i$**

Raw weights: $w_{\text{same}} = 0.8$ for $j_1, j_2$; $w_{\text{other}} = 0.2$ for $j_3, j_4$. Row sum = 2.00, so normalized weights are 0.40 for same-lineage and 0.10 for other-lineage.

**What $i$ sends**

$$i \to j_1: \ 0.80 \times 0.40 = 0.32 \qquad i \to j_3: \ 0.80 \times 0.10 = 0.08$$

Same-lineage neighbors receive 4× more benefit than other-lineage neighbors.

**What $i$ receives** (assuming symmetric neighborhood structure)

$$R_i^+ = \underbrace{0.7 \times 0.40}_{j_1} + \underbrace{0.6 \times 0.40}_{j_2} + \underbrace{0.9 \times 0.10}_{j_3} + \underbrace{0.5 \times 0.10}_{j_4} = 0.66$$

**Fitness**

$$W_i = 1.0 + 0.66 - 0.16 = 1.50$$

**Why kinship helps**

If $i$ were surrounded by four other-lineage neighbors with the same traits, all incoming weights would be 0.10:

$$R_i^+ = (0.7 + 0.6 + 0.9 + 0.5) \times 0.10 = 0.27, \qquad W_i = 1.0 + 0.27 - 0.16 = 1.11$$

The lineage cluster raises fitness from 1.11 to 1.50 — a difference that compounds over many steps as same-lineage cooperators expand together.

## Key Parameters

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Parameter</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Default</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>kin_weight_same_lineage</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>0.8</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Routing weight toward same-lineage neighbors</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>kin_weight_other_lineage</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>0.2</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Routing weight toward other-lineage neighbors</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>B_plus_scale</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>1.0</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Scales cooperative benefit produced per unit trait</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>C_scale</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>0.2</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Private cost per unit trait</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Key parameters controlling kin-selection routing weights and payoff scaling.</figcaption>
</figure>

Hamilton's rule maps onto these parameters as $r \approx w_{\text{same}} / (w_{\text{same}} + w_{\text{other}})$, $B = $ `B_plus_scale`, $C = $ `C_scale`.

## Simulation Results

Two claims are made for kin selection in the [Nowak Mechanisms overview](/evolved-cooperation/nowak-mechanisms#spread-vs-maintenance): **maintenance = Yes** and **spread from rare = Yes**. The four scenarios below test both directly, with ablations that isolate which features are load-bearing.

Script: [`utils/proof_of_mechanism.py`](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/utils/proof_of_mechanism.py) — 5 seeds × 4 scenarios, 1000 steps each. Success threshold: mean final cooperation trait ≥ 0.60.

### Step 1 — Maintenance: cooperation holds when common

Starting cooperation trait ≈ 0.90 (high), default kin bias (same-lineage weight 0.8, other-lineage weight 0.2), B/C = 5.

**Result: 5/5 seeds successful. Mean final trait = 0.984.**

Cooperation not only persists but rises slightly as the Moran process filters out low-trait agents. The kin-weighted routing recirculates benefit preferentially back toward same-lineage cooperators, creating a fitness premium that fully offsets the private cost. Hamilton's rule ($rB > C$) is met and the population locks into near-maximum cooperation.

### Step 2 — Spread from rare: kin bias enables invasion

Starting cooperation trait ≈ 0.05 (rare), same kin bias and B/C as above.

**Result: 5/5 seeds successful. Mean final trait = 0.872.**

From a starting frequency of 5%, cooperation spreads to 87% on average across seeds. The mechanism is the same positive feedback: cooperating agents produce benefit that flows preferentially to same-lineage neighbors, who also tend to cooperate. Cooperator clusters grow faster than they lose members, and cooperation fixes.

### Step 3 — Ablations: what breaks the mechanism

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '18%' }} />
        <col style={{ width: '16%' }} />
        <col style={{ width: '36%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Scenario</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Success rate</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Mean trait</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Interpretation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>maintenance_common_start</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}>5 / 5</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}>0.984</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Maintenance confirmed. Kin-biased routing locks cooperation near maximum.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>spread_from_rare_kin_bias</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}>5 / 5</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}>0.872</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Spread from rare confirmed. Cooperation invades reliably from 5% with kin bias.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>no_kin_bias_ablation</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#FFF3CD' }}>1 / 5</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#FFF3CD' }}>0.488</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Equal kin weights (well-mixed routing). Spread is unreliable — the grid's spatial structure gives weak partial assortment, but kin bias is the decisive mechanism.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>below_hamiltons_rule</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#F8D7DA' }}>0 / 5</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#F8D7DA' }}>0.008</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>B/C = 0.25 (rb &lt; c). Cooperation collapses from 90% to near zero — Hamilton's rule boundary confirmed.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Proof-of-mechanism results. 5 seeds per scenario, 1000 steps. Success = mean final trait ≥ 0.60.</figcaption>
</figure>

The no-kin-bias ablation shows partial, unreliable spread (mean 0.49, 1/5 seeds crossing threshold). This is the grid's spatial structure acting as a weak substitute — the same mechanism that drives network reciprocity. Kin-biased routing amplifies this assortment to reliably carry cooperation from rare.

## Phase diagram

The proof-of-mechanism scenarios test specific parameter points. The phase diagram sweeps the full parameter space: kin bias ratio (same-lineage weight / other-lineage weight, 8–16) × benefit/cost ratio (3.5–4.75), 10 replicates per cell, 1000 steps.

<figure style={{ margin: '0 0 1.5rem 0', textAlign: 'center' }}>
  <img
    src="/img/evolved-cooperation/kin-selection/kin_selection_phase_map.png"
    alt="Kin selection phase diagram: mean cooperation after 1000 steps across kin bias ratio (8–16) and benefit/cost ratio (3.5–4.75)"
    style={{ maxWidth: '600px', width: '100%', border: '1px solid #D6E4F5' }}
  />
  <figcaption style={{ marginTop: '0.6rem' }}><strong>Display 4:</strong> Mean cooperation after 1000 steps across a 5×6 grid of kin bias ratio and benefit/cost ratio. White contour lines at 0.25, 0.50, and 0.75. High cooperation (yellow) requires both sufficient kin bias and sufficient benefit/cost ratio — consistent with Hamilton's rule <em>rb &gt; c</em>. The 0.50 contour marks the transition boundary. Generated by <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/utils/sweep_kin_selection_phase.py">utils/sweep_kin_selection_phase.py</a>.</figcaption>
</figure>

The diagram confirms Hamilton's rule geometrically: cooperation is reliable (mean > 0.75) only in the upper-right corner where both kin bias and b/c are high. Increasing either parameter moves toward cooperation; neither alone is sufficient at the lower end of the grid. The 0.50 transition boundary runs diagonally, consistent with the rule that higher kin bias can compensate for lower b/c and vice versa.

## Python Module Layout

```text
moran_models/nowak_mechanisms/kin_selection/
  __init__.py
  kin_selection_model.py
  kin_selection_pygame_ui.py
  config/
    kin_selection_config.py
  utils/
    proof_of_mechanism.py
    sweep_kin_selection_phase.py
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.kin_selection.kin_selection_model
```

Proof of mechanism:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.kin_selection.utils.proof_of_mechanism
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.kin_selection.kin_selection_pygame_ui
```

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
