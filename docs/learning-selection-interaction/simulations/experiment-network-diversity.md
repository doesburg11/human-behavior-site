---
id: simulations-experiment-network-diversity
title: Experiment - Network Diversity
sidebar_position: 5
slug: /learning-selection-interaction/simulations/network-diversity
---

# Experiment - Network Diversity

This experiment (`experiment_network_diversity.py`) tests when simple partner-memory mechanisms stop being sufficient and social infrastructure mechanisms start to dominate.

## Hypothesis

In stable local neighborhoods, personal experience should be enough for cooperation.

As `stranger_fraction` increases, reputation and partner choice should become more important and the extended model should outperform simpler models.

## Design

The manipulated variable is `stranger_fraction`, the probability that an interaction is with a random agent rather than a ring neighbor.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
		<table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
			<colgroup>
				<col style={{ width: '30%' }} />
				<col style={{ width: '70%' }} />
			</colgroup>
			<thead>
				<tr>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Condition</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Meaning</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0%</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Pure ring: same local neighbors</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>50%</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Half local, half strangers</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>100%</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Fully anonymous interactions</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Network-diversity experiment conditions.</figcaption>
</figure>

## Results

| Stranger fraction | Trust learning | Q-learning | Extended |
|---|---|---|---|
| 0% | 315.7 | 199.2 | 191.8 |
| 10% | 111.2 | 185.9 | 177.4 |
| 25% | 297.3 | 229.8 | 169.3 |
| 50% | 4.9 | 232.9 | 172.3 |
| 75% | 0.0 | 268.4 | 251.5 |
| 100% | 0.0 | 168.1 | 242.5 |

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/experiment_network_diversity.png" width="80%" alt="Payoff versus stranger exposure across models"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Final payoff as stranger exposure increases across all three models.</figcaption>
</figure>

## Main findings

- Trust learning collapses at high `stranger_fraction`.
- Q-learning is robust in mixed environments, but degrades in fully anonymous regimes.
- The extended model is strongest at very high `stranger_fraction` because reputation can guide first encounters with unknown partners.

This supports the claim that social-information infrastructure is an adaptation for large-scale, stranger-rich societies.
