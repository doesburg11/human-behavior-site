---
id: simulations-model-2-q-learning
title: Model 2 - Q-learning
sidebar_position: 3
slug: /learning-selection-interaction/simulations/model-2
---

# Model 2 - Q-learning

Model 2 (`two_timescale_q_learning.py`) keeps the same two-timescale framework but replaces scalar trust with action-value learning.

## Learning during a lifetime

Each agent stores partner-specific Q-values for both actions:

```python
Q[i, j, COOPERATE]
Q[i, j, DEFECT]
```

Updates follow temporal-difference learning:

```text
new Q = old Q + alpha * (reward + gamma * max future Q - old Q)
```

Action selection is epsilon-greedy exploration.

## Evolution between generations

Agents inherit and mutate four RL parameters:

- `exploration_rate` (`epsilon`)
- `learning_rate` (`alpha`)
- `discount_factor` (`gamma`)
- `initial_q_bias`

## Results summary

| Metric | One-shot | Repeated |
|---|---|---|
| Final cooperation rate | 0.445 | 0.560 |
| Final mean payoff | 8.150 | 611.350 |
| Final exploration rate | 0.581 | 0.109 |
| Final learning rate | 0.353 | 0.180 |
| Final discount factor | 0.621 | 0.360 |
| Final initial Q-bias | -0.509 | 0.889 |

### One-shot interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_one_shot_cooperation.png" width="70%" alt="Q-learning one-shot cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Model 2 cooperation trajectory in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_one_shot_parameters.png" width="70%" alt="Q-learning one-shot parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Model 2 evolved Q-learning parameters in one-shot interaction.</figcaption>
</figure>

### Repeated interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_repeated_cooperation.png" width="70%" alt="Q-learning repeated cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Model 2 cooperation trajectory in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_repeated_parameters.png" width="70%" alt="Q-learning repeated parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Model 2 evolved Q-learning parameters in repeated interaction.</figcaption>
</figure>

## Interpretation

Compared with Model 1, Q-learning yields lower cooperation rates but substantially higher repeated-interaction payoffs by valuing future relationship returns more explicitly.

For strategic and psychological interpretation of this trade-off, see [Appendix: Strategic and psychological interpretation](./appendices#strategic-and-psychological-interpretation).
