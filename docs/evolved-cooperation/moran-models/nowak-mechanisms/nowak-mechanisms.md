---
id: nowak-mechanisms
title: Nowak Mechanisms
sidebar_position: 1
slug: /evolved-cooperation/nowak-mechanisms
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This section describes the five named Moran-process packages under <code>moran_models/nowak_mechanisms/</code> in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

This section contains one package for each of the five mechanisms for the evolution of cooperation identified in Nowak (2006). Each package is a thin wrapper over the shared [`interaction_kernel`](/evolved-cooperation/interaction-kernel) Moran engine.

## Shared Engine

All five mechanisms run on the same Moran update loop. What differs across them is the routing step — specifically the kernel that distributes cooperative benefit to neighbors, and any additional per-site state that modulates it.

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

## Spread vs. maintenance

The five mechanisms are often described as answers to the question "how does cooperation evolve?" But that question contains three distinct sub-questions — initiation (can a cooperative act occur at all?), spread (can cooperation increase in frequency when rare?), and maintenance (can cooperation resist invasion once common?) — and the five Nowak conditions address only the last.

**The Nowak conditions are maintenance conditions.** Each of the five rules — $rb > c$, $w > (T-R)/(T-P)$, $q > c/b$, $b/c > k$, $m/n > c/b$ — describes when a population already dominated by cooperators resists invasion by defectors. This is an evolutionary stability (ESS) condition. It is not a condition for spread from rare, and it is not a condition for the first cooperative act to occur.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '22%' }} />
        <col style={{ width: '28%' }} />
        <col style={{ width: '28%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Mechanism</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Condition</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Spread from rare</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Maintenance (ESS)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/kin-selection">Kin selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>rb &gt; c</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong> — rare cooperators preferentially interact with relatives who share the cooperative gene</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/direct-reciprocity">Direct reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>w &gt; (T−R)/(T−P)</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#F8D7DA' }}><strong>No</strong> — rare TFT meets mostly ALLD; no memory of cooperation to reciprocate <a href="/evolved-cooperation/direct-reciprocity#step-1-pure-direct-reciprocity-fails" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong> <a href="/evolved-cooperation/direct-reciprocity#the-condition" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/indirect-reciprocity">Indirect reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>q &gt; c/b</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#F8D7DA' }}><strong>No</strong> — reputation system requires an existing cooperative base to bootstrap</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/network-reciprocity">Network reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>b/c &gt; k</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#FFF3CD' }}><strong>Partial</strong> — cooperator clusters grow once formed, but a single isolated cooperator still loses to surrounding defectors</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/group-selection">Group selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>m/n &gt; c/b</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#FFF3CD' }}><strong>Possible</strong> — if between-group selection is strong enough to offset within-group defector advantage</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> The five Nowak conditions mapped to spread from rare and maintenance. All five conditions are ESS (maintenance) conditions. Only kin selection reliably supports spread from rare; network reciprocity and group selection offer a partial route.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Kin selection — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance:</strong> proven — 5/5 seeds, mean trait 0.984 — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/kin-selection#step-1-maintenance-cooperation-holds-when-common">Step 1 on kin selection page</a></li>
        <li><strong>Spread from rare = Yes:</strong> proven — 5/5 seeds, mean trait 0.872 — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/kin-selection#step-2-spread-from-rare-kin-bias-enables-invasion">Step 2 on kin selection page</a></li>
        <li><strong>No kin bias ablation:</strong> spread unreliable (1/5 seeds, mean trait 0.488) — kin-biased routing, not spatial structure alone, is the decisive mechanism</li>
        <li><strong>Below Hamilton's rule:</strong> full collapse from 90% to near zero (0/5 seeds) — rb &gt; c boundary confirmed</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Kin selection simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Direct reciprocity — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance:</strong> proven — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed/utils/proof_of_mechanism.py">well_mixed/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-1-pure-direct-reciprocity-fails">Step 1 on direct reciprocity page</a></li>
        <li><strong>Spread from rare = No:</strong> proven — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed/utils/proof_stability_vs_invasion.py">well_mixed/proof_stability_vs_invasion.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-2-partner-persistence-is-necessary-but-not-sufficient-from-a-random-start">Step 2 on direct reciprocity page</a></li>
        <li><strong>Spatial clustering scaffold:</strong> network reciprocity provides origin, direct reciprocity provides maintenance — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/spatial_clustering/utils/proof_of_mechanism.py">spatial_clustering/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-3-spatial-structure-adds-network-reciprocity">Step 3 on direct reciprocity page</a></li>
        <li><strong>Kin clustering scaffold:</strong> partner permanence is the origin mechanism — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/kin_clustering/utils/proof_of_mechanism.py">kin_clustering/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-4-partner-permanence-not-spatial-clustering-is-the-origin-mechanism">Step 4 on direct reciprocity page</a></li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Direct reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Indirect reciprocity — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> proven — 5/5 seeds, mean trait 0.873 — binary Nowak model (donor helps only if recipient reputation ≥ threshold, q=0.80 &gt; c/b=0.20) — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = No:</strong> proven — 0/5 seeds, mean trait 0.276 (q=0.80) and 0/5, mean trait 0.201 (q=0.05) — rare cooperators help defectors who have neutral initial reputation, but defectors never reciprocate; cooperators pay cost with no return and are eliminated before the reputation feedback loop can bootstrap — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
        <li><strong>Reputation gating ablation:</strong> without reputation-gated access to help, maintenance fails (2/5 seeds vs. 5/5 with gating) — defectors receive the same benefit as cooperators without paying the cost; confirms reputation-gated discrimination is the mechanism</li>
        <li><strong>Why the spatial model confounds this:</strong> the spatial grid provides network-reciprocity clustering on top of the reputation channel; the ablation (no reputation routing) still gives 5/5 success on the grid, proving the grid alone sustains cooperation. The well-mixed binary model isolates the reputation channel cleanly — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed/utils/proof_of_mechanism.py">well_mixed/proof_of_mechanism.py</a></li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 5:</strong> Indirect reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Network reciprocity — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> proven — 5/5 seeds, mean trait 0.928 — 24×24 von Neumann grid (k=4), b/c=5 &gt; k — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/network_reciprocity/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = Partial:</strong> proven — 2/5 seeds, mean trait 0.536 — cooperation spreads in replicates where a viable cluster forms by chance; fails in the others; directly demonstrates the stochastic cluster-formation threshold</li>
        <li><strong>b/c &gt; k boundary:</strong> proven — B_plus_scale=0.5 → b/c=2.5 &lt; k=4 — 0/5 seeds, mean trait 0.012 — cooperation collapses completely from 90% when condition is violated</li>
        <li><strong>k is the decisive parameter:</strong> proven — Moore neighbourhood (k=8) with same b/c=5 — 0/5 seeds, mean trait 0.009 — condition violated by increasing neighbourhood size, not by changing payoffs; confirms k as the network degree in Nowak's condition</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 6:</strong> Network reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Group selection — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> proven — 5/5 seeds, mean trait 0.950 — 24×24 von Neumann grid, group replacement every 25 steps, m/n &gt; c/b condition met — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/group_selection/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = Possible:</strong> proven — 2/5 seeds, mean trait 0.548 — cooperation spreads in replicates where a cooperator-rich group is occasionally copied over a defector-rich group; stochastic, directly demonstrating the "Possible" claim</li>
        <li><strong>Double ablation (Moore + no groups):</strong> proven — Moore neighbourhood (k=8 &gt; b/c=5) disables spatial clustering; group_selection_interval=99999 disables between-group copying — 0/5 seeds, mean trait 0.010 — cooperation collapses completely; confirms both mechanisms are needed</li>
        <li><strong>Group events alone cannot rescue cooperation:</strong> proven — Moore neighbourhood (spatial advantage removed) + group selection active (interval=25) — 0/5 seeds, mean trait 0.012 — between-group copying amplifies spatial within-group clusters but cannot replace them; any spread in the standard scenario is due to within-group spatial assortment, not between-group events alone</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 7:</strong> Group selection simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

The direct implication: demonstrating that a mechanism *maintains* cooperation is not the same as demonstrating that it *produces* cooperation. The simulation results in this section test both, and the distinction shows up clearly in every mechanism — particularly in direct reciprocity, where the maintenance condition is cleanly met but spread from rare is stochastic and unreliable.

## The origin of cooperation

Looking across all five mechanisms, kin selection is the only one with a reliable "Yes" for spread from rare. Direct reciprocity and indirect reciprocity fail outright. Network reciprocity requires a pre-existing cooperative cluster — a single isolated cooperator still loses to surrounding defectors, pushing the question back to how that cluster formed. Group selection is conditional on between-group selection being strong enough to overcome the within-group disadvantage.

This makes kin selection the most plausible *initiator* of cooperation: a single rare cooperator's offspring share the cooperative trait, so kin-biased benefit creates a positive feedback loop from the very first generation. The early evidence is consistent — multicellularity, the mitochondrion, and the eukaryotic cell all originated as cooperation between near-identical entities (r ≈ 1). At the highest relatedness, kin selection is barely distinguishable from self-interest.

**Where it gets complicated:**

- **Scale matters.** At the molecular level there is no individual yet — just replicating molecules. Kin selection in the Hamilton sense does not cleanly apply there; byproduct mutualism (an act that immediately benefits the actor) is the more appropriate concept for the very first cooperative chemistry.
- **Nowak's 2010 controversy.** In a high-profile *Nature* paper Nowak, Tarnita, and Wilson (2010) argued that inclusive fitness and kin selection are not the fundamental mechanism — that multilevel (group) selection is the more general framework and kin selection a special case. Hamilton's defenders responded sharply — a reply signed by 137 researchers appeared in the same journal (Abbot et al., 2011). The debate is not settled, but it shows that "kin selection is the origin" is a theoretical claim, not a consensus fact.
- **Kin selection as ignition, not engine.** Once a cooperative cluster exists — however it formed — direct reciprocity, network reciprocity, and group selection can sustain and amplify it far beyond what kin selection alone could. Kin selection may be best understood as the *scaffolding* that gets cooperation off the ground, after which other mechanisms take over and scale it up.

The working hypothesis the simulation results support: kin selection is the most mechanistically clean answer to how cooperation escapes rarity. What happens after that is a different question.

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
- Nowak, M. A., Tarnita, C. E., & Wilson, E. O. (2010). *The evolution of eusociality*. *Nature*, 466(7310), 1057–1062. https://doi.org/10.1038/nature09205
- Abbot, P., et al. [137 signatories] (2011). *Inclusive fitness theory and eusociality*. *Nature*, 471(7339), E1–E4. https://doi.org/10.1038/nature09831
- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
