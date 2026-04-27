---
id: direct-reciprocity
title: Direct Reciprocity
sidebar_position: 2
slug: /evolved-cooperation/direct-reciprocity
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Python-backed.</strong> This page describes the <code>moran_models/nowak_mechanisms/direct_reciprocity/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository. It is not yet a browser replay case study.
  </p>
</div>

Direct reciprocity is cooperation sustained by repeated encounters between the same individuals. An agent is more likely to help a neighbor from whom it has recently received help — "I scratch your back, you scratch mine."

## How It Is Implemented Here

Each site carries a **reciprocity memory** variable alongside its cooperation trait. At each step, expressed cooperation is scaled by that memory:

$$
B^+_i = \text{B\_plus\_scale} \times h_i \times \text{clip}(\text{baseline} + \text{gain} \times m_i,\; 0, 1)
$$

where $m_i$ is the site's memory of recently received help. After reproduction, the memory of the offspring is updated from the parent's memory and the positive return it received in the previous step:

$$
m_i \leftarrow \text{decay} \times m_{\text{parent}} + (1 - \text{decay}) \times \frac{R^+_{\text{parent}}}{\text{B\_plus\_scale}}
$$

This means agents that have been helped in the past express more cooperation, which tends to attract further help — a direct reciprocal feedback loop.

## Key Parameters

| Parameter | Default | Role |
|---|---|---|
| `memory_baseline_expression` | `0.35` | Minimum cooperation expressed regardless of memory |
| `memory_expression_gain` | `0.85` | How strongly memory amplifies cooperation expression |
| `memory_decay` | `0.35` | Weight on previous memory versus recent experience |
| `B_plus_scale` | `1.0` | Scales cooperative benefit produced per unit trait |
| `C_scale` | `0.2` | Private cost per unit trait |

## Python Module Layout

```text
moran_models/nowak_mechanisms/direct_reciprocity/
  __init__.py
  direct_reciprocity_model.py
  direct_reciprocity_pygame_ui.py
  config/
    direct_reciprocity_config.py
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.direct_reciprocity_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.direct_reciprocity_pygame_ui
```

## References

- Axelrod, R., & Hamilton, W. D. (1981). *The evolution of cooperation*. *Science*, 211(4489), 1390–1396. https://doi.org/10.1126/science.7466396
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
