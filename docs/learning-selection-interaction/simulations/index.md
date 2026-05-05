---
id: simulations-index
title: Two-Timescale Simulations
sidebar_position: 1
slug: /learning-selection-interaction/simulations
---

# Two-Timescale Simulations

These pages document the simulation suite implemented in the companion repository and summarize what each model contributes.

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
	<p style={{ margin: '0' }}>
		<strong style={{ color: '#0F3368' }}>Working definition.</strong> These simulations test how within-lifetime learning and between-generation selection jointly shape cooperation under controlled social interaction structures.
	</p>
</div>

The common architecture is:

1. Fast timescale: learning within lifetimes
2. Slow timescale: selection across generations

## Model progression

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
		<table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
			<colgroup>
				<col style={{ width: '8%' }} />
				<col style={{ width: '30%' }} />
				<col style={{ width: '31%' }} />
				<col style={{ width: '31%' }} />
			</colgroup>
			<thead>
				<tr>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>#</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Script</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Learning mechanism</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Extra social features</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>two_timescale_reciprocity.py</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Simple trust update (Rescorla-Wagner style)</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>None</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>2</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>two_timescale_q_learning.py</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Q-learning (action-value learning)</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>None</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>3</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>two_timescale_extended.py</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Q-learning</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Reputation, partner choice, forgiveness</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Three-model progression in learning and social complexity.</figcaption>
</figure>

## Navigate the simulation docs

- [Model 1: Trust Learning](/learning-selection-interaction/simulations/model-1)
- [Model 2: Q-learning](/learning-selection-interaction/simulations/model-2)
- [Model 3: Extended (reputation, partner choice, forgiveness)](/learning-selection-interaction/simulations/model-3)
- [Network diversity experiment](/learning-selection-interaction/simulations/network-diversity)
- [Appendices](/learning-selection-interaction/simulations/appendices)

## Core takeaway

Across all three models, cooperation is not a fixed trait. It is an adaptive outcome that depends on interaction structure, learning dynamics, and selective pressures acting over generations.
