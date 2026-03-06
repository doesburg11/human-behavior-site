---
id: prisoners-dilemma
title: Prisoner's Dilemma (One-Shot)
sidebar_position: 2
---

# Prisoner's Dilemma (One-Shot): Why Defection Comes First

The one-shot Prisoner's Dilemma captures the non-trivial core of cooperation.

Each player has two actions:

- `C`: cooperate
- `D`: defect

Canonical payoff ordering:

`T > R > P > S`

Where:

- `T` (temptation): payoff for defecting against a cooperator
- `R` (reward): payoff for mutual cooperation
- `P` (punishment): payoff for mutual defection
- `S` (sucker): payoff for cooperating against a defector

## Defection Is the Dominant One-Shot Strategy

For each player, `D` yields a higher immediate payoff regardless of the other player's action:

- if the opponent cooperates, defecting gives `T > R`
- if the opponent defects, defecting gives `P > S`

So in one-shot play, rational best response is defection.

## Why This Matters for Learned Cooperation

If defection is the local optimum, then cooperation cannot be assumed. It needs a mechanism.
That mechanism often comes from repeated interaction, memory, and contingent responses.

Next step: [Iterated Prisoner's Dilemma](./iterated-prisoners-dilemma)

