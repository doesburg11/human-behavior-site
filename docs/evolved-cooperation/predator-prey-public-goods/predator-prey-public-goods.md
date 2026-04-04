---
id: predator-prey-public-goods
title: Predator-Prey Public Goods
sidebar_position: 1
slug: /evolved-cooperation/predator-prey-public-goods
---

import PredatorPreyReplay from '@site/src/components/PredatorPreyReplay';

This section incorporates the current-state README of the predator-prey public-goods module into the website as a nested part of **Evolved Cooperation**.

The model is a spatial predator-prey-grass ecology with an evolving predator cooperation trait:

- predators pay a private cost for hunt investment,
- successful hunts generate a shared benefit,
- offspring inherit the hunt-investment trait with mutation,
- selection acts through survival, hunting success, and reproduction.

## Interactive Replay

The exported browser replay is rendered directly on this page. It is based on sampled frames from a fixed Python run, so it does **not** execute the Python simulation live in the browser.

[Open Source Module](https://github.com/doesburg11/EvolvedCooperation/tree/main/predpreygrass_public_goods)

<PredatorPreyReplay />

## State Variables

- predator i: position (x<sub>i</sub>, y<sub>i</sub>), energy E<sub>i</sub>, hunt-investment trait h<sub>i</sub>
- prey j: position (x<sub>j</sub>, y<sub>j</sub>), energy P<sub>j</sub>
- grass field: per-cell energy G(x, y)

Interpretation:

- h<sub>i</sub> is a continuous inherited trait in [0, 1]
- higher h<sub>i</sub> increases a predator's contribution to coordinated hunting
- higher h<sub>i</sub> also increases its private per-tick cooperation cost

## Tick Structure

Each call to the main world-step function applies the ecology in this order:

1. Grass regrows, capped at the cell maximum.
2. Each prey may move, pay metabolic and movement costs, eat one grass bite, and reproduce.
3. Hunting is resolved from the prey side.
4. Dead prey and hunted prey are removed, and newborn prey are appended.
5. Each predator pays metabolic, movement, and cooperation costs, then may reproduce and may die from starvation.
6. Diagnostics are written into per-step histories.

Important details:

- movement uses a Moore neighborhood with dx, dy in {-1, 0, 1}
- movement cost depends on realized Euclidean distance
- prey reproduction happens before hunting in the same tick
- newborn prey and newborn predators act only from the next tick onward
- predators committed to one successful hunt cannot be reused in a second successful hunt during that tick

## Hunt Mechanism

Common symbols:

- h<sub>i</sub>: hunt-investment trait of predator i
- E<sub>i</sub>: current energy of predator i
- C<sub>i</sub> = E<sub>i</sub> × h<sub>i</sub>: effective contribution of predator i
- W<sub>g</sub> = sum of all C<sub>i</sub>: total coalition contribution
- S<sub>g</sub> = sum of all h<sub>i</sub>: unweighted sum of predator traits in the hunting group
- P: current prey energy
- n<sub>g</sub>: number of predators in the hunting group

The active default is the `threshold_synergy` rule.

Formation conditions:

<p>n<sub>g</sub> ≥ n<sub>min</sub><br />W<sub>g</sub> ≥ P × α<sub>form</sub></p>

If both conditions hold, kill probability is:

<p>p<sub>kill</sub> = p<sub>max</sub> × σ(k × (W<sub>g</sub> − P × α<sub>exec</sub>))</p>

Variable meanings:

- n<sub>min</sub>: minimum coalition size required to form a hunt
- α<sub>form</sub>: formation effort factor
- α<sub>exec</sub>: execution threshold factor
- k: steepness around the execution threshold
- p<sub>max</sub>: maximum success probability
- σ(z) = 1 / (1 + e<sup>−z</sup>)

This rule creates a real coalition barrier rather than a smooth one-predator escalation.

## Reward Sharing And Private Cost

If a hunt succeeds, the captured prey energy is split across participating predators. The active default uses contribution-weighted sharing:

<p>reward<sub>i</sub> = P × C<sub>i</sub> / W<sub>g</sub></p>

Private cooperation cost is always on:

<p>cost<sub>i</sub> = c<sub>coop</sub> × h<sub>i</sub></p>

So the model combines a persistent individual cost with intermittent group hunting gains.

## Reproduction, Mutation, And Selection

Prey reproduce asexually when they exceed the prey birth threshold and pass a reproduction draw.

Predators also reproduce asexually, but their reproduction probability is scaled by crowding and prey availability:

<p>s<sub>pred,birth</sub> = max(0, 1 − N<sub>pred</sub> / K<sub>pred</sub>) × min(1, N<sub>prey</sub> / N<sub>prey,0</sub>)</p>

Variable meanings:

- N<sub>pred</sub>: current predator count
- N<sub>prey</sub>: current prey count
- K<sub>pred</sub>: predator crowding soft cap
- N<sub>prey,0</sub>: initial prey count
- s<sub>pred,birth</sub>: predator reproduction scale

At predator birth:

- parent energy is halved,
- the child inherits the parent's current trait,
- the child is placed nearby,
- with some probability the trait receives Gaussian mutation noise,
- the trait is then clamped back into [0, 1].

This is where natural selection enters the model: higher-trait predators may gain more from coordinated hunts, but they also pay a continuous private cost, so trait frequencies change through ecological success and reproduction rather than within-lifetime learning.

## Diagnostics

The Python run collects:

- predator and prey population histories,
- mean and variance of the predator hunt-investment trait,
- trait statistics for successful hunters, reproducing parents, and dead predators,
- macro energy-flow histories,
- the final distribution of survivor traits.

The integrated replay exposes a lighter subset of that state: the world grid, agent positions, and the cooperation-rate trajectory.

## Source

Source module:

- [GitHub repository](https://github.com/doesburg11/EvolvedCooperation)
- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/predpreygrass_public_goods)
- [Active runtime](https://github.com/doesburg11/EvolvedCooperation/blob/main/predpreygrass_public_goods/emerging_cooperation.py)
- [Active configuration](https://github.com/doesburg11/EvolvedCooperation/blob/main/predpreygrass_public_goods/config/emerging_cooperation_config.py)
