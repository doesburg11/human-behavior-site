---
id: direct-reciprocity
title: Direct Reciprocity
sidebar_position: 2
slug: /evolved-cooperation/direct-reciprocity
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes three implementations in the <a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity"><code>moran_models/nowak_mechanisms/direct_reciprocity/</code></a> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

Direct reciprocity is cooperation sustained by repeated encounters between the same individuals. A cooperator can punish a defector in the next round and reward a cooperator — but only if they meet again.

## The Condition

Cooperation is stable when the re-encounter probability $w$ is high enough. Nowak (2006) shows the condition is:

$$
w > \frac{T - R}{T - P}
$$

where $T$ is the temptation payoff (defecting against a cooperator), $R$ is the reward payoff (mutual cooperation), and $P$ is the punishment payoff (mutual defection).

With the default Prisoner's Dilemma payoffs ($T = 1.7$, $R = 1.0$, $P = 0.0$):

$$
w > \frac{1.7 - 1.0}{1.7 - 0.0} \approx 0.41
$$

**The re-encounter probability $w$ is the critical variable.** Everything below follows from whether it meets this threshold.

## Payoff Matrix

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
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Actor / Partner</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Partner cooperates</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Partner defects</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>Actor cooperates</strong></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$R$ = 1.0 (Reward)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$S$ = −0.5 (Sucker)</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>Actor defects</strong></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$T$ = 1.7 (Temptation)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$P$ = 0.0 (Punishment)</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Prisoner's Dilemma payoff matrix with default values ($T$ = 1.7, $R$ = 1.0, $S$ = −0.5, $P$ = 0.0).</figcaption>
</figure>

This satisfies $T > R > P > S$ — the standard definition of the Prisoner's Dilemma. Defection is individually tempting ($T > R$), mutual cooperation beats mutual defection ($R > P$), and defecting is the safe choice ($P > S$). The dilemma is that rational individuals defect even though both would be better off cooperating.

## Strategies

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
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Strategy</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Full name</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Rule</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>ALLC</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Always Cooperate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperate unconditionally.</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>ALLD</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Always Defect</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Defect unconditionally.</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>TFT</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Tit for Tat</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperate on the first round; then copy the partner's previous action.</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>GTFT</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Generous Tit for Tat</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Like TFT, but forgive a defection with fixed probability.</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>WSLS</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Win-Stay Lose-Shift</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Repeat the previous action if it paid at or above aspiration; otherwise switch.</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> The five strategies implemented in the direct reciprocity models and their decision rules.</figcaption>
</figure>

## Three Implementations

Three models test direct reciprocity progressively, adding one feature at a time.

### Step 1 — Pure direct reciprocity fails

**Model:** [`well_mixed/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed) with `partner_persistence_probability = 0.0`

In a well-mixed population of 200 agents with random re-pairing every step, the re-encounter probability is:

$$
w \approx \frac{1}{n - 1} \approx 0.005
$$

This is far below 0.41. Memory is useless: even if TFT punished a defector last round, it will almost certainly never meet that defector again. ALLD exploits every cooperator it encounters in round 1 and sweeps the population.

**Result: ALLD dominates. Cooperation cannot emerge.**

### Step 2 — Partner persistence enables direct reciprocity

**Model:** [`well_mixed/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed) with `partner_persistence_probability = 0.9`

`partner_persistence_probability` ($p$) is the probability that an existing pair stays together in the next step. Each step, for every pair $(i, j)$:

- with probability $p$: the pair is kept; $i$ and $j$ play together again
- with probability $1 - p$: the pair is dissolved; both agents are reshuffled into new random pairs

When $p = 0.9$, the effective re-encounter probability is $w \approx 0.9 > 0.41$. The condition is satisfied. TFT–TFT pairs that find each other build mutual cooperation across rounds. ALLD exploits TFT in round 1 (earning $T = 1.7$), but TFT retaliates from round 2 onwards; the persistent ALLD–TFT pair quickly degrades to mutual defection ($P = 0.0$ for both). TFT–TFT pairs earn $R = 1.0$ per round and spread.

**Result: Cooperation emerges through direct reciprocity alone, without any spatial structure.** The time-averaged cooperation rate rises from ≈0.33 ($p = 0.0$) to ≈0.52 ($p = 0.9$).

### Step 3 — Spatial structure adds network reciprocity

**Model:** [`scaffolds/spatial_clustering/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/spatial_clustering)

Placing agents on a 2D grid and restricting both interactions and Moran replacement to local neighbors adds a second mechanism on top of direct reciprocity: **network reciprocity**. Cooperators can form spatial clusters and preferentially interact with each other, even before any trust has been established.

Both mechanisms are active simultaneously:

- Pair memory and repeated rounds sustain cooperation within established pairs (direct reciprocity).
- The grid prevents ALLD from reaching the interior of a cooperator cluster (network reciprocity).

**Result: Cooperation emerges more robustly, but the mechanism is no longer pure direct reciprocity.**

### Note — Continuous spatial memory model

**Model:** [`scaffolds/continuous_spatial_memory/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/continuous_spatial_memory)

A separate, continuous-trait implementation wraps the shared interaction-kernel engine. Each site carries a cooperation capacity $h$ and pair-specific partner memory. Expressed cooperation is scaled by that memory:

$$
B^+_i = \text{B\_plus\_scale} \times h_i \times \text{clip}(\text{baseline} + \text{gain} \times m_i,\; 0, 1)
$$

After reproduction, memory is updated from the parent's memory and the positive return it received:

$$
m_i \leftarrow \text{decay} \times m_{\text{parent}} + (1 - \text{decay}) \times \frac{R^+_{\text{parent}}}{\text{B\_plus\_scale}}
$$

This model uses a benefit–cost framework rather than a Prisoner's Dilemma and is not directly comparable to the discrete-strategy models above.

## Summary

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}></th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>well_mixed</code> p = 0.0</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>well_mixed</code> p = 0.9</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>spatial_clustering</code></th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>continuous_spatial_memory</code></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Re-encounter probability w</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>≈0.005</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>≈0.9</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>High (fixed neighbors)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>N/A</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Condition w > 0.41</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>N/A</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Spatial clustering</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Active mechanisms</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>None</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Direct reciprocity</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Direct + network</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Direct reciprocity</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperation emerges</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes (moderate)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes (robust)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Outcome comparison across the three direct reciprocity implementations.</figcaption>
</figure>

## Python Module Layout

```text
moran_models/nowak_mechanisms/direct_reciprocity/
  __init__.py
  well_mixed/
    __init__.py
    direct_reciprocity_well_mixed_model.py
    direct_reciprocity_well_mixed_async_model.py
    direct_reciprocity_well_mixed_pygame_ui.py
    direct_reciprocity_well_mixed_grid_pygame_ui.py
    direct_reciprocity_well_mixed_linked_pygame_ui.py
    config/
    data/
    utils/
  scaffolds/
    __init__.py
    spatial_clustering/
      __init__.py
      spatial_clustering_model.py
      spatial_clustering_pygame_ui.py
      config/
      data/
      utils/
    continuous_spatial_memory/
      __init__.py
      continuous_spatial_memory_model.py
      continuous_spatial_memory_pygame_ui.py
      config/
```

## Usage

**Well-mixed model:**

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.well_mixed.direct_reciprocity_well_mixed_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.well_mixed.direct_reciprocity_well_mixed_pygame_ui
```

**Spatial clustering scaffold:**

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.scaffolds.spatial_clustering.spatial_clustering_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.scaffolds.spatial_clustering.spatial_clustering_pygame_ui
```

**Continuous spatial memory scaffold:**

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.scaffolds.continuous_spatial_memory.continuous_spatial_memory_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.scaffolds.continuous_spatial_memory.continuous_spatial_memory_pygame_ui
```

## References

- Axelrod, R., & Hamilton, W. D. (1981). *The evolution of cooperation*. *Science*, 211(4489), 1390–1396. https://doi.org/10.1126/science.7466396
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
