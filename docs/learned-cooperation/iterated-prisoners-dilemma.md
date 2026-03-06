---
id: iterated-prisoners-dilemma
title: Iterated Prisoner's Dilemma
sidebar_position: 3
---

# Iterated Prisoner's Dilemma: From Myopia to Reciprocity

When the Prisoner's Dilemma is repeated, strategy is no longer a single move.
It becomes a policy over time: "what to do now given what happened before."

## What Changes When the Game Is Repeated

- Future consequences matter ("shadow of the future")
- Reputation and retaliation become possible
- Conditional cooperation strategies can emerge (for example, reciprocity)

## Finite vs Ongoing Interaction

- **Finite known horizon**: backward-induction logic pushes toward end-game defection, often cascading earlier.
- **Uncertain or effectively ongoing horizon**: cooperation can be sustained if future interaction is valuable enough.

This tension is exactly why repeated social dilemmas are useful for studying learned cooperation.

## Why MARL Is the Bridge

In practice, agents do not compute perfect equilibria analytically.
They learn from interaction.

Multi-Agent Reinforcement Learning (MARL) lets us test whether cooperative conventions can emerge from repeated play under bounded learning dynamics, exploration, and non-stationarity.

Next step: [Bridge via MARL in the repeated Prisonners Dilemma](./repeated-prisonners-dilemma/overview)

