---
id: simulations-model-3-extended
title: Model 3 - Extended (Reputation, Partner Choice, Forgiveness)
sidebar_position: 4
slug: /learning-selection-interaction/simulations/model-3
---

# Model 3 - Extended

Model 3 (`two_timescale_extended.py`) adds social mechanisms on top of Q-learning:

- Reputation
- Partner choice (interaction refusal)
- Forgiveness after betrayal

## Learning during a lifetime

Agents still update partner-specific Q-values, but now also:

- update publicly visible reputation scores
- condition interaction acceptance on partner reputation
- apply and decay betrayal penalties in relationship values

## Evolution between generations

Agents inherit Model 2 parameters plus three social parameters:

- `rejection_threshold`
- `forgiveness_rate`
- `reputation_weight`

## Results summary

| Metric | One-shot | Repeated |
|---|---|---|
| Final cooperation rate | 0.450 | 0.380 |
| Final mean payoff | 4.100 | 288.120 |
| Final exploration rate | 0.717 | 0.073 |
| Final learning rate | 0.353 | 0.514 |
| Final discount factor | 0.395 | 0.581 |
| Final initial Q-bias | 1.222 | -0.519 |
| Final rejection threshold | -0.539 | -0.687 |
| Final forgiveness rate | 0.595 | 0.761 |
| Final reputation weight | 0.522 | 0.381 |
| Final mean reputation | 0.023 | 0.016 |

### One-shot interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_one_shot_cooperation.png" width="70%" alt="Extended model one-shot cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Model 3 cooperation trajectory in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_one_shot_ql_params.png" width="70%" alt="Extended model one-shot Q-learning parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Model 3 evolved Q-learning parameters in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_one_shot_social_params.png" width="70%" alt="Extended model one-shot social parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Model 3 evolved social parameters in one-shot interaction.</figcaption>
</figure>

### Repeated interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_repeated_cooperation.png" width="70%" alt="Extended model repeated cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Model 3 cooperation trajectory in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_repeated_ql_params.png" width="70%" alt="Extended model repeated Q-learning parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 5:</strong> Model 3 evolved Q-learning parameters in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_repeated_social_params.png" width="70%" alt="Extended model repeated social parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 6:</strong> Model 3 evolved social parameters in repeated interaction.</figcaption>
</figure>

## Interpretation

The extended model trades some raw payoff and cooperation frequency for social robustness. Defectors can be screened and excluded earlier, and cooperative relationships can recover through forgiveness.
