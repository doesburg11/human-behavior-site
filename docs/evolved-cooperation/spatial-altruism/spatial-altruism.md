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

## Culling Variants

The repository now implements the full three-variant Mitteldorf-Wilson set:

- `steady_state`: void competition with continuous empty-patch lottery mass
- `uniform_culling`: scheduled random evacuation of a fixed share of sites
- `compact_swath`: scheduled clearing of one contiguous square region

The replay above remains a frozen `steady_state` run, but the underlying Python module also includes both disturbance variants.

## Culling Experiment

A first culling-only sweep compared `uniform_culling` and `compact_swath` under the following settings:

- `benefit_from_altruism` from `0.00` to `1.00` in steps of `0.05`
- `cost_of_altruism` from `0.00` to `0.35` in steps of `0.05`
- fixed `harshness = 0.96`
- disturbance interval `50`
- disturbance fractions `0.25` and `0.50`
- `5` replicates per parameter set

Headline outcome:

- both culling variants produced coexistence regions
- `uniform_culling` was more robust overall than `compact_swath`
- the strongest gap appeared at disturbance fraction `0.50`

Measured summary from that sweep:

- mean coexistence probability was about `0.089` for `uniform_culling` and `0.057` for `compact_swath`
- mean occupied fraction was about `0.509` for `uniform_culling` and `0.400` for `compact_swath`
- at disturbance fraction `0.50`, `uniform_culling` still reached coexistence probability `1.0`, while `compact_swath` peaked at `0.8`

## Static Run Snapshot

The figure below is generated from a fixed Python run of the current NumPy implementation. It shows the initial patch state, the patch state after `200` updates, and the population counts across time.

![Spatial altruism overview](/evolved-cooperation/spatial-altruism/spatial-altruism-overview.png)

## Static Culling Heatmaps

The next figures fix `harshness = 0.96`, disturbance interval `50`, and disturbance fraction `0.50`. They compare the two disturbance variants over the `benefit_from_altruism` and `cost_of_altruism` plane.

### Coexistence Probability

![Uniform culling coexistence probability](/evolved-cooperation/spatial-altruism/culling_uniform_fraction_050_coexist_prob.png)

`uniform_culling` still shows parameter cells with coexistence probability `1.0` at disturbance fraction `0.50`.

![Compact swath coexistence probability](/evolved-cooperation/spatial-altruism/culling_compact_swath_fraction_050_coexist_prob.png)

`compact_swath` retains coexistence in a narrower region and does not reach `1.0` at the same disturbance level in this sweep.

### Occupied Fraction

![Uniform culling occupied fraction](/evolved-cooperation/spatial-altruism/culling_uniform_fraction_050_occupied_avg.png)

Under the same disturbance settings, `uniform_culling` preserves substantially more occupied space on average.

![Compact swath occupied fraction](/evolved-cooperation/spatial-altruism/culling_compact_swath_fraction_050_occupied_avg.png)

`compact_swath` produces a sharper occupancy collapse, consistent with a stronger recolonization bottleneck after contiguous clearing.

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
- `Cooperative Hunting` studies selection on an inherited hunting-investment trait inside an ecological food web

So they are complementary examples of evolved cooperation at different levels of abstraction:

- one minimal and spatial,
- one ecological and agent-based

## Conclusions

- the package now covers the steady-state model and both paper disturbance variants
- both culling variants can support altruist-selfish coexistence under some settings
- `uniform_culling` was more robust than `compact_swath` in the first culling sweep
- the current evidence suggests that contiguous swath clearing creates a harsher recolonization bottleneck than scattered clearing at the same nominal disturbance level
- these conclusions come from one sweep at fixed `harshness` and interval, so they are comparative results for this run, not universal claims about every parameter regime

## References

- [Repository root](https://github.com/doesburg11/EvolvedCooperation)
- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/spatial_altruism)
- [Active runtime](https://github.com/doesburg11/EvolvedCooperation/blob/main/spatial_altruism/altruism_model.py)
- [Interactive UI](https://github.com/doesburg11/EvolvedCooperation/blob/main/spatial_altruism/altruism_pygame_ui.py)
- [Module README](https://github.com/doesburg11/EvolvedCooperation/blob/main/spatial_altruism/README.md)
