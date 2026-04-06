---
id: evolved-cooperation
title: Evolved Cooperation
sidebar_position: 1
slug: /evolved-cooperation
---

## Cooperation Across Generations

Evolved cooperation refers to cooperative behavior that becomes more common **through natural selection across generations**, rather than through adaptation during a single lifetime.

In this framework, populations:

- contain heritable variation in behavior,
- differ in survival and reproductive success,
- pass on traits associated with higher fitness.

This process corresponds to **evolutionary dynamics** in biology and to **selection over inherited behavioral tendencies** in population-level models.

---

## From Adaptive Policies to Inherited Strategies

Classical evolutionary models treat cooperation as a trait or strategy that can spread when it improves reproductive success under specific ecological and social conditions.

Evolved cooperation differs fundamentally from learned cooperation:

| Learned cooperation | Evolved cooperation |
|---|---|
Policy changes within lifetime | Strategy frequencies change across generations |
Learning acts across interactions | Selection acts across generations |
Reward shapes behavior | Fitness shapes trait prevalence |
Adaptation is individual-level | Adaptation is population-level |

Thus, cooperation can persist even when individuals are not explicitly "trying" to cooperate, provided cooperative traits are favored by selection.

---

## Evolutionary Dynamics as a Model of Selection

Evolutionary models describe how cooperative and defective strategies change in frequency over time under selection pressure.

Key ingredients include:

- heritability of behavioral tendencies,
- differential reproductive success,
- ecological constraints on survival,
- interaction structure (who meets whom).

Because fitness depends on interactions with other individuals, the evolutionary problem is inherently social.

This creates:

- frequency-dependent selection,
- coexistence of strategies,
- evolutionary cycling,
- context-dependent stable equilibria.

---

## Evolved Cooperation in Social Dilemmas

Evolutionary game theory shows that:

- Cooperation can spread when it yields higher inclusive or long-term fitness
- It can be undermined by defectors exploiting cooperators
- Stability often depends on structure, repeated interaction, or assortment
- Population composition changes the payoffs of each strategy

Key mechanisms include:

### Kin Selection
Cooperation evolves when helping relatives increases inclusive fitness.

### Direct and Indirect Reciprocity
Cooperation can be favored when repeated interactions or reputation make future benefits likely.

### Spatial and Network Structure
Limited mixing can protect cooperative clusters from exploitation.

These mechanisms explain how cooperation can evolve without requiring centralized control.

---

## Sequential and Ecological Contexts

In natural systems, cooperation is often embedded in **sequences of actions** and changing environments rather than one-shot interactions.

This introduces:

- delayed fitness consequences,
- ecological feedback,
- population-level outcomes emerging from local interactions.

Such settings are better captured by ecological and evolutionary simulations than by static matrix games alone.

---

## Evolved Cooperation in Model Systems

Different model systems expose different mechanisms by which cooperative tendencies may be favored by selection across generations.

Examples include:

- local altruism in a spatial patch lattice,
- inherited predispositions for coordinated hunting,
- traits that reduce costly interference,
- selection for timing and spacing that improves capture success,
- plasticity traits that make cooperation easier to learn.

In this view, cooperation is not only a behavioral pattern but also a target of **selection on underlying traits**.

---

## Instability and Evolutionary Social Dilemmas

Selected cooperation is also often fragile.

Populations can face:

- invasion by defectors,
- shifting ecological conditions,
- tradeoffs between short-term and long-term fitness,
- dependence on population density and assortment.

This leads to:

- cycles between cooperation and defection,
- polymorphic populations,
- collapses of cooperative regimes after environmental change.

Studying these instabilities is central to understanding when selection can sustain cooperation.

---

## Relation to Learned Cooperation

Selected cooperation operates on a **slower timescale** than learning within lifetimes.

This creates several possibilities:

- Evolution can shape the capacity to learn cooperative behavior.
- Learning can alter ecological conditions and therefore selection pressures.
- Plasticity can mediate the interaction between immediate adaptation and long-term evolution.

Ecological systems like PredPreyGrass provide one way to study both timescales together, while simpler spatial models isolate the selection logic more cleanly.

---

## Research Questions

The study of selected cooperation in the current model systems focuses on:

- Under what ecological conditions does cooperation spread through selection?
- How stable are cooperative traits against invasion by defectors?
- When do cooperative and defective strategies coexist evolutionarily?
- How does population structure affect evolutionary outcomes?
- How does plasticity influence the evolution of cooperation?

---

## Summary

Evolved cooperation is:

- a population-level adaptive process,
- driven by differential reproduction and survival,
- capable of stabilizing coordination under the right ecological and social conditions,
- often fragile when exploitative strategies can invade.

Understanding its dynamics is essential for explaining the **nature** component of cooperation and how it interacts with lifetime learning.

Across these model systems, evolved cooperation forms the **nature component** of a two-timescale theory of cooperation.

---

## Current Case Studies

The current site includes two complementary evolved-cooperation examples:

- [Spatial Altruism](/evolved-cooperation/spatial-altruism/)
  A minimal patch-based model in which altruist and selfish traits compete through local benefit, private cost, and a neighborhood lottery.
- [Predator-Prey-Grass Cooperative Hunting](/evolved-cooperation/predator-prey-cooperative-hunting/)
  A spatial ecological model in which predator cooperation evolves through hunting success, energetic cost, and inherited trait variation.

## Next Candidate From The Repo

The strongest remaining candidate for a third evolved-cooperation case study is:

- `Cooperative vs Greedy Grazing`

That model is simpler than the two current examples, but it still fits the same general logic:

- two inherited behavioral types,
- selection through survival and reproduction,
- a shared resource environment that couples behavior to long-run population outcomes.

So the current roadmap is:

1. `Spatial Altruism`
2. `Predator-Prey-Grass Cooperative Hunting`
3. possible later addition: `Cooperative vs Greedy Grazing`
