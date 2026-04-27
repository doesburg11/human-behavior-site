---
id: network-reciprocity
title: Network Reciprocity
sidebar_position: 4
slug: /evolved-cooperation/network-reciprocity
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Python-backed.</strong> This page describes the <code>moran_models/nowak_mechanisms/network_reciprocity/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository. It is not yet a browser replay case study.
  </p>
</div>

Network reciprocity is cooperation sustained by population structure. When interactions are restricted to a local neighborhood rather than the whole population, cooperators can form clusters that shield each other from exploitation by defectors — the network does the work that memory or reputation does in reciprocity models.

## How It Is Implemented Here

The positive routing kernel is **uniform over local grid neighbors** with no additional bias. The mechanism relies entirely on the spatial grid structure: the von Neumann or Moore neighborhood restricts who receives cooperative benefit and who competes for reproduction. Cooperator clusters that form through local reproduction maintain higher average fitness within the cluster than the surrounding population, allowing the cluster to expand.

There is no memory, reputation, or lineage bias — the only structural ingredient is the local neighborhood.

## Key Parameters

| Parameter | Default | Role |
|---|---|---|
| `positive_kernel_mode` | `"uniform"` | Uniform routing over local neighbors |
| `initial_identity_count` | `1` | Number of distinct initial lineage identities |
| `B_plus_scale` | `1.0` | Scales cooperative benefit produced per unit trait |
| `C_scale` | `0.2` | Private cost per unit trait |

## Python Module Layout

```text
moran_models/nowak_mechanisms/network_reciprocity/
  __init__.py
  network_reciprocity_model.py
  network_reciprocity_pygame_ui.py
  config/
    network_reciprocity_config.py
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.network_reciprocity.network_reciprocity_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.network_reciprocity.network_reciprocity_pygame_ui
```

## References

- Ohtsuki, H., Hauert, C., Lieberman, E., & Nowak, M. A. (2006). *A simple rule for the evolution of cooperation on graphs and social networks*. *Nature*, 441, 502–505. https://doi.org/10.1038/nature04605
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
