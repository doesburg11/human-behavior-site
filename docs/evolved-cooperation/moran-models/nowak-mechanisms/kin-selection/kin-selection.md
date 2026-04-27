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
