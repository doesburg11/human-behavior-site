---
id: simulations-model-1-trust-learning
title: Model 1 - Trust Learning
sidebar_position: 2
slug: /learning-selection-interaction/simulations/model-1
---

# Model 1 - Trust Learning

Model 1 (`two_timescale_reciprocity.py`) is the baseline two-timescale model.

## Learning during a lifetime

Each agent tracks partner-specific trust:

```python
learned_trust[i, j]
```

The decision score combines inherited tendency and learned partner history:

```python
score_i = trust_prior[i] + responsiveness[i] * learned_trust[i, j]
cooperate_i = score_i > 0.0
```

The trust update rule follows a Rescorla–Wagner style prediction-error update — see [Appendix: Rescorla–Wagner style learning](/learning-selection-interaction/simulations/appendices#rescorlawagner-style-learning).

## Evolution between generations

Agents reproduce proportional to lifetime payoff. Offspring inherit and mutate:

- `trust_prior`
- `learning_rate`
- `responsiveness`

## Payoff structure

Donation-game defaults:

- `benefit = 3.0`
- `cost = 1.0`

For ecological interpretation of why benefit can exceed cost in this abstraction, see [Appendix: Ecological realism of benefit > cost](./appendices#ecological-realism-of-benefit--cost).

For one-shot versus repeated scenario rationale, see [Appendix: Why compare one-shot and repeated interaction?](./appendices#why-compare-one-shot-and-repeated-interaction).

## Results summary

| Metric | One-shot (`rounds=1`) | Repeated (`rounds=80`) |
|---|---|---|
| Final cooperation rate | 0.000 | 0.979 |
| Final mean payoff | 0.000 | 313.300 |
| Final trust prior | -0.864 | 1.447 |
| Final learning rate | 0.095 | 0.186 |
| Final responsiveness | 1.126 | 2.459 |

### One-shot interaction

Repeated reciprocity cannot form. Cooperation collapses to zero.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/one_shot_cooperation.png" width="70%" alt="One-shot cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Model 1 cooperation trajectory in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/one_shot_traits.png" width="70%" alt="One-shot traits"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Model 1 evolved trait trajectories in one-shot interaction.</figcaption>
</figure>

### Repeated interaction

Cooperation stabilizes near 1.0, with strong selection for high trust prior and responsiveness.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/repeated_cooperation.png" width="70%" alt="Repeated cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Model 1 cooperation trajectory in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/repeated_traits.png" width="70%" alt="Repeated traits"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Model 1 evolved trait trajectories in repeated interaction.</figcaption>
</figure>

## Interpretation

Learning and evolution reinforce each other in repeated interaction regimes. Without repeated contact, there is no reliable learning signal and selection removes cooperative predispositions.
