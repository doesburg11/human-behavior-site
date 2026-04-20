---
id: retained-benefit
title: Retained Benefit
sidebar_position: 4
slug: /evolved-cooperation/retained-benefit
---

import RetainedBenefitReplay from '@site/src/components/RetainedBenefitReplay';

Retained Benefit is the most abstract evolved-cooperation case study on this site. It asks a simpler and more general question than Spatial Altruism, Cooperative Hunting, or Spatial Prisoner's Dilemma: **when does cooperation spread if the decisive variable is not one special story, but how much of cooperation's payoff is routed back toward cooperators or their copies instead of leaking to free-riders?**

## The Puzzle

Many cooperation models hide the key evolutionary problem inside one mechanism.

- altruism models hide it inside local public good production
- reciprocity models hide it inside repeated-game memory
- hunting models hide it inside ecological synergy

This model strips those stories back. It asks whether cooperation can rise when:

- cooperation creates value
- cooperation also carries a private cost
- some of that value is shared broadly
- some of it is retained by related or same-rule local recipients

So the central question becomes: **how much retained feedback is enough?**

## What Kind Of Model This Is

This is a spatial lattice model with **selection on an inherited continuous cooperation trait**, not a model of learning, planning, or bargaining.

Each occupied cell carries:

- one cooperation trait `h in [0, 1]`
- one inherited lineage label

The lineage label is not meant as a full kinship model. It is an abstract stand-in for copies of the same inherited rule or locally clustered descendants of the same lineage.

## The Core Rule

At each step, an agent with cooperation trait `h_i` creates benefit:

<p>B_i = b × h_i</p>

That benefit is split in two:

<p>B_i^retained = r × B_i</p>
<p>B_i^open = (1 - r) × B_i</p>

where:

- `b` is the benefit scale
- `r` is the retained-benefit fraction

The **open** part is shared across the full local neighborhood. The **retained** part is shared only across same-lineage recipients in that local neighborhood.

At the same time, cooperation pays a private cost:

<p>C_i = c × h_i</p>

So the model turns one high-level claim into a direct experiment:

> cooperation rises when enough of its return is protected from leakage

## The Frozen Replay Setup

The browser replay below is a specific seeded run from the frozen website-demo configuration, not a schematic animation. It uses:

- a `72 × 72` toroidal lattice
- a von Neumann local neighborhood
- `250` simulation steps sampled every `5` steps
- baseline fitness `1.0`
- cooperation benefit `0.30`
- cooperation cost `0.10`
- retained-benefit fraction `0.35`
- mutation rate `0.02`
- mutation standard deviation `0.05`
- `24` initial lineage labels in `6 × 6` local blocks
- random seed `0`

In the viewer:

- cooperation view colors low `h` as pale beige, mid `h` as light blue, and high `h` as burgundy-red
- lineage view switches to lineage colors so local clustering becomes visible

## Interactive Replay

The browser replay below is based on sampled frames from that same frozen configuration.

The canonical implementation and export logic live in the [EvolvedCooperation](https://github.com/doesburg11/EvolvedCooperation) repository:

- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/retained_benefit)
- [Core model](https://github.com/doesburg11/EvolvedCooperation/blob/main/retained_benefit/retained_benefit_model.py)
- [Frozen website-demo config](https://github.com/doesburg11/EvolvedCooperation/blob/main/retained_benefit/config/retained_benefit_website_demo_config.py)
- [Replay exporter](https://github.com/doesburg11/EvolvedCooperation/blob/main/retained_benefit/utils/export_github_pages_demo.py)

<RetainedBenefitReplay />

## How To Read The Replay

The replay is easiest to read as the interaction of three evolving quantities.

### 1. Mean cooperation

This shows whether the inherited cooperation trait is rising or falling in the population as a whole.

### 2. Local assortment

This shows how often agents are surrounded by same-lineage local recipients. When that value rises, retained benefit has a clearer channel back toward cooperators or their copies.

### 3. Dominant-lineage share

This shows whether one lineage is spreading strongly enough to occupy a large share of the lattice. It is a rough indicator of successful local copying and spatial consolidation.

Together these variables let you separate:

- trait change
- local clustering
- lineage expansion

instead of collapsing all three into one unexplained population curve.

## Why This Belongs Under Evolved Cooperation

This model belongs under evolved cooperation because:

- the cooperation trait is inherited rather than learned
- selection acts through differential local copying and reproduction-like replacement
- mutation creates heritable variation
- local structure changes which cooperation traits persist across generations

What changes here is not a policy inside a lifetime. What changes is the distribution of inherited cooperation levels across the population.

## Why This Model Matters

This case study is useful because it makes one possible near-law of cooperation unusually explicit:

> there is no cooperation without feedback

In other words:

- if cooperation creates value that leaks too easily to unrelated others, cooperation is hard to sustain
- if enough of that value is routed back toward cooperators or their copies, cooperation can spread

That claim is more abstract than the special-case logic of altruism, reciprocity, or hunting. This is why Retained Benefit is the best current site model for asking what the minimal conditions of cooperation might look like in general.

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1-16. https://doi.org/10.1016/0022-5193(64)90038-4
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560-1563. https://doi.org/10.1126/science.1133755
- West, S. A., Griffin, A. S., & Gardner, A. (2007). *Evolutionary explanations for cooperation*. *Current Biology*, 17(16), R661-R672. https://doi.org/10.1016/j.cub.2007.06.004
- [EvolvedCooperation retained_benefit module](https://github.com/doesburg11/EvolvedCooperation/tree/main/retained_benefit)
