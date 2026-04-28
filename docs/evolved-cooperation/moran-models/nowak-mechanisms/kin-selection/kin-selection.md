---
id: kin-selection
title: Kin Selection
sidebar_position: 1
slug: /evolved-cooperation/kin-selection
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Python-backed.</strong> This page describes the <code>moran_models/nowak_mechanisms/kin_selection/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository. It is not yet a browser replay case study.
  </p>
</div>

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

## Key Parameters

| Parameter | Default | Role |
|---|---|---|
| `kin_weight_same_lineage` | `0.8` | Routing weight toward same-lineage neighbors |
| `kin_weight_other_lineage` | `0.2` | Routing weight toward other-lineage neighbors |
| `B_plus_scale` | `1.0` | Scales cooperative benefit produced per unit trait |
| `C_scale` | `0.2` | Private cost per unit trait |

Hamilton's rule maps onto these parameters as $r \approx w_{\text{same}} / (w_{\text{same}} + w_{\text{other}})$, $B = $ `B_plus_scale`, $C = $ `C_scale`.

## Python Module Layout

```text
moran_models/nowak_mechanisms/kin_selection/
  __init__.py
  kin_selection_model.py
  kin_selection_pygame_ui.py
  config/
    kin_selection_config.py
  utils/
    sweep_kin_selection_phase.py
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.kin_selection.kin_selection_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.kin_selection.kin_selection_pygame_ui
```

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
