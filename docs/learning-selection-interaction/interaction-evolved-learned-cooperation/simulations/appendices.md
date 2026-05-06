---
id: simulations-appendices
title: Appendices
sidebar_position: 6
slug: /learning-selection-interaction/simulations/appendices
---

# Appendices

## Ecological realism of benefit > cost

The donation game uses `benefit = 3.0` and `cost = 1.0`. This does not imply free energy. It captures settings where social coordination or information transfer produces synergistic gains.

For pure resource transfer, conservation constraints imply `b <= c`. But for alarm signaling, collective defense, and division of labor, effective social benefit can exceed individual cost.

## The ring network

All three models are embedded in a ring topology with repeated local encounters.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
		<table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
			<colgroup>
				<col style={{ width: '40%' }} />
				<col style={{ width: '60%' }} />
			</colgroup>
			<thead>
				<tr>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Neighbors per agent</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model 1</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>8 (4 left, 4 right)</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model 2</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>2 (left and right)</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model 3</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>2 (left and right)</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Ring-neighborhood sizes across the three simulation models.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ring_network_visual.png" width="70%" alt="Ring network diagram"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Ring-lattice visualization used to communicate local repeated interactions.</figcaption>
</figure>

The ring is used because it provides repeated local interaction while minimizing additional geometric effects that are stronger on 2D lattices.

## Why compare one-shot and repeated interaction?

Model 1 runs both:

- `lifetime_rounds = 1` (one-shot dominant)
- `lifetime_rounds = 80` (repeated interaction)

This isolates whether cooperation emerges from actual partner-history learning or from static predispositions alone.

## Cooperation mechanisms and model scope

### Included

- Direct reciprocity (partner-specific learning)
- Network reciprocity (local repeated interaction)

### Not yet fully included

- Kin selection
- Population-wide indirect reciprocity
- Group selection

## Strategic and psychological interpretation

Trust-learning tends toward high cooperation rates in repeated settings, but can be exploitable.

Q-learning tends to cooperate less often while earning more by preserving strategic selectivity and accounting for future relationship value.

The broader interpretation is that adaptive human cooperation resembles selective, future-oriented reciprocity rather than unconditional cooperation.
