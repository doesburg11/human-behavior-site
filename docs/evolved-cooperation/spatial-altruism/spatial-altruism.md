---
id: spatial-altruism
title: Spatial Altruism
sidebar_position: 2
slug: /evolved-cooperation/spatial-altruism
---

import SpatialAltruismReplay from '@site/src/components/SpatialAltruismReplay';

`spatial_altruism/altruism_model.py` is a direct evolutionary altruism model rather than an ecological predator-prey system.

It models a patch-based population in which:

- each grid cell is empty, selfish, or altruistic,
- altruists provide a local benefit but pay a private cost,
- selfish patches receive the local benefit without paying that cost,
- the next occupant of each patch is chosen by a local weighted lottery.

## Interactive Replay

The exported browser replay is rendered directly on this page. It is based on sampled frames from a fixed Python run.

[GitHub Module](https://github.com/doesburg11/EvolvedCooperation/tree/main/spatial_altruism)

<SpatialAltruismReplay />

## Static Run Snapshot

The figure below is generated from a fixed Python run of the current NumPy implementation. It shows the initial patch state, the patch state after `200` updates, and the population counts across time.

![Spatial altruism overview](/evolved-cooperation/spatial-altruism/spatial-altruism-overview.png)

## Patch States

Each patch has one of three states:

- altruist: pink
- selfish: green
- empty: black

The model is spatial because each patch interacts only with its own plus-shaped neighborhood:

- the focal patch itself,
- the patch above,
- the patch below,
- the patch to the left,
- the patch to the right.

So each local calculation uses exactly `5` patches.

## Local Benefit Rule

The altruism benefit at one patch is:

`altruism_benefit = benefit_from_altruism × (benefit_out_self + sum_of_neighbor_benefit_out) / 5`

Variable meanings:

- `altruism_benefit`: total social benefit currently available at the focal patch
- `benefit_from_altruism`: strength of the positive externality produced by altruists
- `benefit_out_self`: `1` if the focal patch is altruist, otherwise `0`
- `sum_of_neighbor_benefit_out`: number of altruist contributors in the four-neighbor set
- `5`: the focal patch plus its four neighbors

This means altruists create a benefit that is local and shared.

## Fitness Rule

Fitness depends on patch type:

- altruist patch: `fitness = (1 - cost_of_altruism) + altruism_benefit`
- selfish patch: `fitness = 1 + altruism_benefit`
- empty patch: `fitness = harshness`

Variable meanings:

- `fitness`: the reproductive weight a patch contributes to nearby lotteries
- `cost_of_altruism`: private cost paid only by altruist patches
- `harshness`: baseline weight assigned to empty patches

This is the core social dilemma:

- altruists help the neighborhood,
- selfish patches enjoy that help too,
- but only altruists pay the direct cost.

## Neighborhood Lottery

After each patch computes its fitness, the focal patch collects three local totals:

- `alt_fitness`: summed fitness contributed by altruist patches in the focal plus-neighborhood
- `self_fitness`: summed fitness contributed by selfish patches in the focal plus-neighborhood
- `harsh_fitness`: summed fitness contributed by empty patches in the focal plus-neighborhood

The normalized lottery weights are:

- `alt_weight = alt_fitness / fitness_sum`
- `self_weight = self_fitness / fitness_sum`
- `harsh_weight = (harsh_fitness + disease) / fitness_sum`

with:

`fitness_sum = alt_fitness + self_fitness + harsh_fitness + disease`

Variable meanings:

- `alt_weight`: probability mass for the next patch becoming altruist
- `self_weight`: probability mass for the next patch becoming selfish
- `harsh_weight`: probability mass for the next patch becoming empty
- `disease`: extra pressure toward emptiness, even when no empty neighbor strongly contributes

The next generation at each patch is then sampled from those weights:

- altruist if the draw lands in `alt_weight`
- selfish if the draw lands in `self_weight`
- empty otherwise

## Why This Belongs Under Evolved Cooperation

This model is on equal footing with cooperative hunting because both models study cooperation through inherited variation and selection across generations.

The difference is the mechanism:

- `Spatial Altruism` studies a direct altruism-versus-selfishness social dilemma in a patch lottery
- `Predator-Prey-Grass Cooperative Hunting` studies selection on an inherited hunting-investment trait inside an ecological food web

So they are complementary examples of evolved cooperation at different levels of abstraction:

- one minimal and spatial,
- one ecological and agent-based

## References

- [Repository root](https://github.com/doesburg11/EvolvedCooperation)
- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/spatial_altruism)
- [Active runtime](https://github.com/doesburg11/EvolvedCooperation/blob/main/spatial_altruism/altruism_model.py)
- [Interactive UI](https://github.com/doesburg11/EvolvedCooperation/blob/main/spatial_altruism/altruism_pygame_ui.py)
- [Module README](https://github.com/doesburg11/EvolvedCooperation/blob/main/spatial_altruism/README.md)
