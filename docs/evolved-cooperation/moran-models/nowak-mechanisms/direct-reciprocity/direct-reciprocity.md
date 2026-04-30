---
id: direct-reciprocity
title: Direct Reciprocity
sidebar_position: 2
slug: /evolved-cooperation/direct-reciprocity
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Python-backed.</strong> This page describes three implementations in the <code>moran_models/nowak_mechanisms/direct_reciprocity/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository. None is yet a browser replay case study.
  </p>
</div>

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

| Actor / Partner | Partner cooperates | Partner defects |
|---|---|---|
| Actor cooperates | R = 1.0 (reward) | S = −0.5 (sucker) |
| Actor defects | T = 1.7 (temptation) | P = 0.0 (punishment) |

This satisfies $T > R > P > S$ — the standard definition of the Prisoner's Dilemma. Defection is individually tempting ($T > R$), mutual cooperation beats mutual defection ($R > P$), and defecting is the safe choice ($P > S$). The dilemma is that rational individuals defect even though both would be better off cooperating.

## Strategies

| Strategy | Full name | Rule |
|---|---|---|
| ALLC | Always Cooperate | Cooperate unconditionally. |
| ALLD | Always Defect | Defect unconditionally. |
| TFT | Tit for Tat | Cooperate on the first round; then copy the partner's previous action. |
| GTFT | Generous Tit for Tat | Like TFT, but forgive a defection with fixed probability. |
| WSLS | Win-Stay Lose-Shift | Repeat the previous action if it paid at or above aspiration; otherwise switch. |

## Three Implementations

Three models test direct reciprocity progressively, adding one feature at a time.

### Step 1 — Pure direct reciprocity fails

**Model:** `well_mixed/` with `partner_persistence_probability = 0.0`

In a well-mixed population of 200 agents with random re-pairing every step, the re-encounter probability is:

$$
w \approx \frac{1}{n - 1} \approx 0.005
$$

This is far below 0.41. Memory is useless: even if TFT punished a defector last round, it will almost certainly never meet that defector again. ALLD exploits every cooperator it encounters in round 1 and sweeps the population.

**Result: ALLD dominates. Cooperation cannot emerge.**

### Step 2 — Partner persistence enables direct reciprocity

**Model:** `well_mixed/` with `partner_persistence_probability = 0.9`

`partner_persistence_probability` ($p$) is the probability that an existing pair stays together in the next step. Each step, for every pair $(i, j)$:

- with probability $p$: the pair is kept; $i$ and $j$ play together again
- with probability $1 - p$: the pair is dissolved; both agents are reshuffled into new random pairs

When $p = 0.9$, the effective re-encounter probability is $w \approx 0.9 > 0.41$. The condition is satisfied. TFT–TFT pairs that find each other build mutual cooperation across rounds. ALLD exploits TFT in round 1 (earning $T = 1.7$), but TFT retaliates from round 2 onwards; the persistent ALLD–TFT pair quickly degrades to mutual defection ($P = 0.0$ for both). TFT–TFT pairs earn $R = 1.0$ per round and spread.

**Result: Cooperation emerges through direct reciprocity alone, without any spatial structure.** The time-averaged cooperation rate rises from ≈0.33 ($p = 0.0$) to ≈0.52 ($p = 0.9$).

### Step 3 — Spatial structure adds network reciprocity

**Model:** `pair_game/`

Placing agents on a 2D grid and restricting both interactions and Moran replacement to local neighbors adds a second mechanism on top of direct reciprocity: **network reciprocity**. Cooperators can form spatial clusters and preferentially interact with each other, even before any trust has been established.

Both mechanisms are active simultaneously:

- Pair memory and repeated rounds sustain cooperation within established pairs (direct reciprocity).
- The grid prevents ALLD from reaching the interior of a cooperator cluster (network reciprocity).

**Result: Cooperation emerges more robustly, but the mechanism is no longer pure direct reciprocity.**

### Note — Continuous model

**Model:** `continuous/`

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

| | `well_mixed` p = 0.0 | `well_mixed` p = 0.9 | `pair_game` | `continuous` |
|---|---|---|---|---|
| Re-encounter probability w | ≈0.005 | ≈0.9 | High (fixed neighbors) | N/A |
| Condition w > 0.41 | No | Yes | Yes | N/A |
| Spatial clustering | No | No | Yes | No |
| Active mechanisms | None | Direct reciprocity | Direct + network | Direct reciprocity |
| Cooperation emerges | No | Yes (moderate) | Yes (robust) | Yes |

## Python Module Layout

```text
moran_models/nowak_mechanisms/direct_reciprocity/
  __init__.py
  continuous/
    direct_reciprocity_model.py
    direct_reciprocity_pygame_ui.py
    config/direct_reciprocity_config.py
  pair_game/
    direct_reciprocity_pair_game_model.py
    direct_reciprocity_pair_game_pygame_ui.py
    config/direct_reciprocity_pair_game_config.py
    utils/proof_of_mechanism.py
  well_mixed/
    direct_reciprocity_well_mixed_model.py
    direct_reciprocity_well_mixed_pygame_ui.py
    config/direct_reciprocity_well_mixed_config.py
    utils/proof_of_mechanism.py
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

Proof utility:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.well_mixed.utils.proof_of_mechanism
```

**Spatial pair game:**

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.pair_game.direct_reciprocity_pair_game_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.pair_game.direct_reciprocity_pair_game_pygame_ui
```

Proof utility:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.pair_game.utils.proof_of_mechanism
```

**Continuous model:**

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.continuous.direct_reciprocity_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.direct_reciprocity.continuous.direct_reciprocity_pygame_ui
```

## References

- Axelrod, R., & Hamilton, W. D. (1981). *The evolution of cooperation*. *Science*, 211(4489), 1390–1396. https://doi.org/10.1126/science.7466396
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
