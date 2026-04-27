---
id: nowak-mechanisms
title: Nowak Mechanisms
sidebar_position: 1
slug: /evolved-cooperation/nowak-mechanisms
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Python-backed.</strong> This section describes the five named Moran-process packages under <code>moran_models/nowak_mechanisms/</code> in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository. None are browser replay case studies yet.
  </p>
</div>

This section contains one package for each of the five mechanisms for the evolution of cooperation identified in Nowak (2006). Each package is a thin wrapper over the shared [`interaction_kernel`](/evolved-cooperation/interaction-kernel) Moran engine.

## Shared Engine

All five mechanisms run on the same Moran update loop. What differs across them is the routing step — specifically the kernel that distributes cooperative benefit to neighbors, and any additional per-site state that modulates it.

The full engine description is on the [Interaction Kernel](/evolved-cooperation/interaction-kernel) page.

## The Five Mechanisms

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '78%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Mechanism</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>How cooperation is sustained</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/kin-selection">Kin Selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Benefit is routed with a lineage bias. Same-lineage neighbors receive more weight, operationalising Hamilton's rule <em>rB &gt; C</em>.</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/direct-reciprocity">Direct Reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Each site carries a memory of recently received help. Expressed cooperation is scaled by that memory, creating a direct reciprocal feedback loop.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/indirect-reciprocity">Indirect Reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Each site carries a public reputation. The routing kernel is biased toward higher-reputation recipients, sustaining cooperation through a reputation channel.</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/network-reciprocity">Network Reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Benefit is routed uniformly over local grid neighbors. Spatial structure alone protects cooperator clusters from exploitation, with no memory or lineage bias.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/group-selection">Group Selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Sites are partitioned into groups. Individual Moran replacement runs each step. Periodically the highest-fitness group is copied into the lowest-fitness group, adding a second level of selection.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> The five Nowak mechanisms and how each sustains cooperation in this implementation.</figcaption>
</figure>

## Beyond These Five

Nowak's taxonomy is a useful compact framework but not an exhaustive list. Important cooperation mechanisms outside the five include:

- **Partner choice** — agents preferentially interact with cooperative partners and abandon poor ones.
- **Partner control** — agents alter partner incentives through sanctions, punishment, or exclusion.
- **Byproduct mutualism** — an action benefits others because it directly benefits the actor at the same time.
- **Policing** — third parties suppress selfish behavior or stabilize collective rules.
- **Pseudoreciprocity** — an actor benefits another because a more productive partner later improves the actor's own payoff.
- **Greenbeard effects** — a recognizable trait marks cooperators and directs help toward others carrying the same marker.
- **Niche construction** — cooperative behavior changes the environment, which then feeds back on selection.
- **Institutional enforcement** — norms, monitoring, and punishment stabilize cooperation at social scales.
- **General assortment** — cooperators interact with cooperators more often than random mixing predicts, regardless of the specific cause.

The shared condition across all of them mirrors the repo-level feedback framing: cooperation spreads when enough of the value it creates returns to cooperators or copies of the cooperative rule to outweigh the private cost.

## References

- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
