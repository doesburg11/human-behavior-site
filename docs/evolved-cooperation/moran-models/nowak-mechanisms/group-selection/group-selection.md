---
id: group-selection
title: Group Selection
sidebar_position: 5
slug: /evolved-cooperation/group-selection
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Python-backed.</strong> This page describes the <code>moran_models/nowak_mechanisms/group_selection/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository. It is not yet a browser replay case study.
  </p>
</div>

Group selection adds a second level of selection on top of individual competition. Groups whose members cooperate more produce higher average fitness, and periodically the most successful group is copied into the least successful group — selection acts on groups as well as on individuals.

## How It Is Implemented Here

Sites are partitioned into a fixed number of groups at initialisation. Within each step, individual Moran replacement proceeds normally based on individual fitness scores. Every `group_selection_interval` steps a **between-group event** fires: the group with the highest mean fitness is copied into the group with the lowest mean fitness, replacing all traits and lineage labels in the sink group with randomly sampled copies from the source group.

This implements a two-level selection process:

- **Within-group**: individual Moran replacement based on individual scores
- **Between-group**: periodic copying of the best group into the worst group

## Key Parameters

| Parameter | Default | Role |
|---|---|---|
| `group_count` | `8` | Number of groups the population is divided into |
| `group_selection_interval` | `25` | Steps between between-group selection events |
| `group_selection_mode` | `"copy_best_group_into_worst_group"` | Between-group replacement rule |
| `B_plus_scale` | `1.0` | Scales cooperative benefit produced per unit trait |
| `C_scale` | `0.2` | Private cost per unit trait |

## Python Module Layout

```text
moran_models/nowak_mechanisms/group_selection/
  __init__.py
  group_selection_model.py
  group_selection_pygame_ui.py
  config/
    group_selection_config.py
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.group_selection.group_selection_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.group_selection.group_selection_pygame_ui
```

## References

- Nowak, M. A., Tarnita, C. E., & Wilson, E. O. (2010). *The evolution of eusociality*. *Nature*, 466, 1057–1062. https://doi.org/10.1038/nature09205
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
