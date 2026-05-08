---
id: direct-reciprocity
title: Direct Reciprocity
sidebar_position: 2
slug: /evolved-cooperation/direct-reciprocity
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes three implementations in the <a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity"><code>moran_models/nowak_mechanisms/direct_reciprocity/</code></a> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

Direct reciprocity is cooperation sustained by repeated encounters between the same individuals. A cooperator can punish a defector in the next round and reward a cooperator — but only if they meet again.

## The Condition

Cooperation is stable when the re-encounter probability $w$ is high enough. Nowak (2006) shows the condition is:

$$
w > \frac{T - R}{T - P}
$$

where $T$ is the temptation payoff (defecting against a cooperator), $R$ is the reward payoff (mutual cooperation), and $P$ is the punishment payoff (mutual defection).

With the default Prisoner's Dilemma payoffs ($T = 1.7$, $R = 1.0$, $P = 0.0$):

$$
w > \frac{1.7 - 1.0}{1.7 - 0.0} \approx 0.41
$$

**The re-encounter probability $w$ is the critical variable.** Everything below follows from whether it meets this threshold.

### Stability vs. origin — two separate questions

This condition answers one specific question: *can ALLD invade a population already dominated by TFT?* If $w > 0.41$, the answer is no. TFT–TFT pairs accumulate mutual cooperation payoff ($R$ each round) and outcompete any defector that enters, because the defector's short-term gain from exploiting a cooperator is offset by the subsequent rounds of mutual punishment.

It does not answer a second, harder question: *can TFT invade a population already dominated by ALLD?*

When TFT is rare, it encounters mostly ALLD opponents. In that first interaction TFT cooperates and ALLD defects — TFT receives $S = -0.5$ while ALLD receives $T = 1.7$. TFT retaliates from the second encounter onward, but in a well-mixed population the pair is unlikely to persist long enough and is surrounded by enough ALLD to recover that initial deficit. Rare TFT cannot outcompete common ALLD even when $w > 0.41$.

This is the core distinction: **direct reciprocity can maintain cooperation once it is common, but it cannot originate cooperation from a population dominated by defectors.** The three steps below test both questions in sequence — and the results track this distinction exactly.

## Payoff Matrix

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Actor / Partner</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Partner cooperates</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Partner defects</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>Actor cooperates</strong></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$R$ = 1.0 (Reward)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$S$ = −0.5 (Sucker)</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>Actor defects</strong></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$T$ = 1.7 (Temptation)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$P$ = 0.0 (Punishment)</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Prisoner's Dilemma payoff matrix with default values ($T$ = 1.7, $R$ = 1.0, $S$ = −0.5, $P$ = 0.0).</figcaption>
</figure>

This satisfies $T > R > P > S$ — the standard definition of the Prisoner's Dilemma. Defection is individually tempting ($T > R$), mutual cooperation beats mutual defection ($R > P$), and defecting is the safe choice ($P > S$). The dilemma is that rational individuals defect even though both would be better off cooperating.

## Strategies

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Strategy</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Full name</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Rule</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>ALLC</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Always Cooperate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperate unconditionally.</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>ALLD</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Always Defect</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Defect unconditionally.</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>TFT</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Tit for Tat</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperate on the first round; then copy the partner's previous action.</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>GTFT</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Generous Tit for Tat</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Like TFT, but forgive a defection with fixed probability.</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>WSLS</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Win-Stay Lose-Shift</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Repeat the previous action if it paid at or above aspiration; otherwise switch.</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> The five strategies implemented in the direct reciprocity models and their decision rules.</figcaption>
</figure>

## Three Implementations

Three models test direct reciprocity progressively, adding one feature at a time.

### Step 1 — Pure direct reciprocity fails

**Model:** [`well_mixed/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed) with `partner_persistence_probability = 0.0`

In a well-mixed population — where every agent can interact with any other agent with equal probability, with no spatial structure or fixed neighbors — of 200 agents with random re-pairing every step, the re-encounter probability is:

$$
w \approx \frac{1}{n - 1} \approx 0.005
$$

This is far below 0.41. Memory is useless: even if TFT punished a defector last round, it will almost certainly never meet that defector again. ALLD exploits every cooperator it encounters in round 1 and sweeps the population.

**Result: ALLD dominates. Cooperation cannot emerge.**

### Step 2 — Partner persistence is necessary but not sufficient from a random start

**Model:** [`well_mixed/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed) with `partner_persistence_probability = 0.9`

`partner_persistence_probability` ($p$) is the probability that an existing pair stays together in the next step. Each step, for every pair $(i, j)$:

- with probability $p$: the pair is kept; $i$ and $j$ play together again
- with probability $1 - p$: the pair is dissolved; both agents are reshuffled into new random pairs

When $p = 0.9$, the effective re-encounter probability is $w \approx 0.9 > 0.41$. The theoretical condition is satisfied: TFT–TFT pairs that find each other can build mutual cooperation across rounds, and ALLD–TFT pairs degrade to mutual defection ($P = 0.0$ for both), removing the exploiter's advantage.

In practice, however, a simulation run of 500 steps from a random mixed start shows that ALLD still dominates. Cooperation collapses across all seeds and starting conditions tested (final cooperation rate ≈0.008, ALLD frequency ≈0.99). High partner persistence is necessary for the mechanism to operate, but the initial frequency of ALLD in a random population is high enough to outrun reciprocal strategies before TFT–TFT partnerships can establish.

This is precisely the stability vs. origin distinction playing out in simulation. The condition $w > 0.41$ is an evolutionary stability condition: it guarantees that *if the population were already dominated by TFT*, ALLD could not invade. But the population starts randomly. When TFT is rare, it mostly encounters ALLD — it cooperates in round 1, is exploited, and loses fitness before repeated interaction can compensate. ALLD spreads while TFT is still too rare to find other TFT partners. The mechanism that would protect cooperation cannot get started because there is not yet enough cooperation to protect.

Direct reciprocity, on its own, has no answer to this. It is a mechanism for *preserving* a cooperative norm, not for *creating* one.

**Result: Cooperation does not emerge from a random start despite the condition being met.** The $w > 0.41$ condition is necessary but not sufficient — it is a maintenance condition, not an emergence condition. A cooperative founding population or spatial structure is also required.

### Step 3 — Spatial structure adds network reciprocity

**Model:** [`scaffolds/spatial_clustering/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/spatial_clustering)

Placing agents on a 2D grid and restricting both interactions and Moran replacement to local neighbors adds a second mechanism on top of direct reciprocity: **network reciprocity**. Cooperators can form spatial clusters and preferentially interact with each other, even before any trust has been established.

Network reciprocity solves specifically the *origin* problem — the one that direct reciprocity alone cannot solve. In a well-mixed population, rare TFT agents mostly encounter ALLD and are exploited before repeated interaction can help. On a grid, cooperators that happen to sit adjacent to one another interact mostly with each other. Within such a cluster, direct reciprocity operates effectively from the start: partners meet repeatedly, TFT–TFT pairs accumulate $R = 1.0$ each round, and the cluster grows. ALLD can only attack the cluster at its boundary, where it does gain a short-term advantage, but interior cooperators generate enough fitness to outpace boundary losses.

The two mechanisms therefore work in sequence on two distinct problems:

- **Network reciprocity** (spatial clustering) handles *emergence*: it creates the protected founding environment that TFT needs to become common.
- **Direct reciprocity** (partner memory, repeated rounds) handles *maintenance*: once cooperation is established, it sustains cooperation within partnerships and punishes any defector that enters.

Removing either one causes complete collapse — as the ablation tests confirm. The grid alone without partner memory fails (no direct reciprocity means no sustained cooperation within pairs). Partner memory without the grid also fails (Step 2). Both are necessary; neither is sufficient alone.

Simulation runs of 500 steps confirm this is highly robust. Cooperation reaches ≈98% from a random mixed start and ≈96% even from a rare 5% reciprocal cluster, with 100% success across all seeds in both cases. Two ablation tests reveal what is essential: removing partner memory or reducing to a single round per pair both cause complete collapse (cooperation ≈0.7%, ALLD ≈99%) — identical to the well-mixed model without spatial structure. The grid alone is not enough; memory and repeated rounds are required.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '34%' }} />
      <col style={{ width: '16%' }} />
      <col style={{ width: '18%' }} />
      <col style={{ width: '18%' }} />
      <col style={{ width: '14%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Scenario</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Success rate</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperation rate</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Reciprocal frequency</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>ALLD</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Default mixed start</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.978</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.893</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.019</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Rare cluster start (5% reciprocal)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.961</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.889</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.024</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No memory (ablation)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.007</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.008</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.989</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>One round per pair (ablation)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.007</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.008</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.989</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Proof-of-mechanism results for the spatial clustering model (500 steps, 5 seeds each). Success criteria: cooperation ≥ 0.60, reciprocal frequency ≥ 0.50, ALLD ≤ 0.25.</figcaption>
</figure>

**Result: Cooperation emerges reliably (≈97–98%) from any starting condition. Spatial structure, partner memory, and multiple rounds are all necessary — removing any one of them causes full collapse.**

### Step 4 — Partner permanence, not spatial clustering, is the origin mechanism

**Model:** [`scaffolds/kin_clustering/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/kin_clustering)

Step 3 showed that combining a fixed spatial graph with partner memory and multiple rounds produces robust cooperation. But it left open a question: is it the *spatial clustering* of cooperators that matters, or the *permanence* of the interaction graph itself?

To separate these, the kin-clustering scaffold replaces the 2D grid with a kin-biased interaction graph. At initialization, agents are assigned to lineages. Each agent's interaction partners are drawn with a bias toward same-lineage agents — controlled by `kin_interaction_fraction` — creating a genetic-clustering analog of the spatial grid. The graph is static (fixed at initialization, just like the grid), and all other parameters are identical to the spatial-clustering scaffold: same discrete strategies, same PD payoffs, same partner memory and replacement rule.

The result surprises and clarifies. Cooperation emerges reliably from a random start. But when `kin_interaction_fraction` is set to 0.0 — removing all kin bias so the interaction graph is purely random — cooperation still emerges just as strongly (99.1%). A random fixed graph is sufficient.

This identifies the true origin mechanism: **partner permanence**, not kin clustering. What Step 3's grid accomplished was not the clustering of cooperators but the locking of interaction pairs. When the same agents face each other every step, a TFT agent that is exploited by ALLD in round 1 locks ALLD into mutual defection ($P = 0$) from round 2 onward — permanently. ALLD cannot escape to exploit fresh cooperators. Meanwhile TFT–TFT pairs keep accumulating $R = 1.0$ each round. TFT outcompetes ALLD in fitness not through clustering but through freezing the punishment.

This is why Step 2's p = 0.9 was insufficient: with a 10% dissolution probability each step, ALLD could occasionally be reshuffled to a new cooperator and reset the exploitation cycle. A completely static graph (p = 1.0) closes that loophole.

The ablation tests confirm the same conclusions as in Step 3: memory is necessary (without it, cooperation collapses to ≈1.2%) and multiple rounds are necessary (one round per pair also collapses to ≈1.2%). The kin bias itself is not among the necessary conditions.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '34%' }} />
      <col style={{ width: '16%' }} />
      <col style={{ width: '18%' }} />
      <col style={{ width: '18%' }} />
      <col style={{ width: '14%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Scenario</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Success rate</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperation rate</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Reciprocal frequency</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>ALLD</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Default mixed start</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.977</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.883</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.022</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Rare lineage start (5% reciprocal)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.988</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.839</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.021</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No memory (ablation)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.012</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.008</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.990</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>One round per pair (ablation)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.012</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.008</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.990</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No kin bias — random fixed graph (ablation)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.00</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.991</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.880</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.010</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 5:</strong> Proof-of-mechanism results for the kin-clustering model (500 steps, 5 seeds each). Success criteria: cooperation ≥ 0.60, reciprocal frequency ≥ 0.50, ALLD ≤ 0.25.</figcaption>
</figure>

**Result: Cooperation emerges reliably (≈97–99%) under any starting condition, with or without kin bias. The origin mechanism is partner permanence — a completely static interaction graph. Removing memory or multiple rounds causes full collapse regardless of graph structure.**

## Summary

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '20%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Property</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>well_mixed p = 0.0</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>well_mixed p = 0.9</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>spatial_clustering</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>kin_clustering</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Re-encounter probability w</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>≈0.005</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>≈0.9</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.0 (fixed grid)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.0 (fixed graph)</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Condition w &gt; 0.41</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Static interaction graph</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes (grid)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes (kin graph)</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Active mechanisms</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>None</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Direct reciprocity</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Partner permanence + direct reciprocity</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Partner permanence + direct reciprocity</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperation emerges</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>No (collapses)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes (≈97–98%)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Yes (≈97–99%)</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 6:</strong> Outcome comparison across all four direct reciprocity implementations (discrete strategies, Prisoner's Dilemma payoffs).</figcaption>
</figure>

The shared feature of the two successful models is a completely static interaction graph ($w = 1.0$), not spatial or genetic clustering specifically. The kin_clustering no-kin-bias ablation (random fixed graph) produces the same outcome as the full kin-biased model, confirming that partner permanence is the load-bearing mechanism.

The three steps together tell a single, coherent story — but it is not the story that a naive reading of the condition $w > 0.41$ would suggest.

**Direct reciprocity is a maintenance mechanism, not an origin mechanism.** The theoretical condition describes when a cooperating population resists invasion — when TFT is already common, when cooperative pairs already exist, when the norm is already in place. It says nothing about how that norm arrived. Step 1 and Step 2 make this concrete: even when $w$ is well above the threshold, ALLD dominates a random starting population. The mechanism that would protect cooperation cannot activate because it has nothing yet to protect.

This reveals a general principle that holds across evolutionary game theory. Evolutionary stability (ESS) and evolutionary origin are separate questions with separate answers. A strategy can be an ESS — impossible to invade once fixed — while simultaneously being unable to invade from rare. TFT is exactly such a strategy in a well-mixed population. It is both stable when common and unable to spread when rare. Proving that direct reciprocity can sustain cooperation is therefore not the same as explaining how cooperation got started.

**Step 4 sharpens what Steps 1–3 revealed.** Step 3 showed that a spatial grid combined with partner memory and multiple rounds produces robust cooperation — but it left open whether it was the *clustering* of cooperators or the *permanence* of the interaction graph that mattered. Step 4 answers this directly: the kin-clustering scaffold with zero kin bias (a purely random fixed graph) produces cooperation just as strongly as the kin-biased version. The origin mechanism is **partner permanence** — a completely static interaction graph — not any form of clustering.

The logic is precise. With a static graph, a TFT agent exploited by ALLD in round 1 locks ALLD into mutual defection ($P = 0$) from round 2 onward — permanently. ALLD cannot escape to exploit fresh cooperators. TFT–TFT pairs keep accumulating $R = 1.0$ each round. TFT outcompetes ALLD in fitness not through geographic or genetic clustering but through freezing the punishment. This is why Step 2's $p = 0.9$ was insufficient: a 10% dissolution probability per step allows ALLD to occasionally refresh the exploitation cycle against a new cooperating partner. A completely static graph ($p = 1.0$) closes that loophole entirely.

**What is required is partner permanence plus direct reciprocity.** Partner permanence solves the *origin* problem: it prevents ALLD from escaping the consequences of exploiting TFT. Direct reciprocity (partner memory + multiple rounds) solves the *maintenance* problem: it sustains cooperation within established pairs and ensures that TFT–TFT interactions remain more profitable than TFT–ALLD interactions. Removing either one causes full collapse — as the ablation tests in both Step 3 and Step 4 confirm.

This is worth distinguishing carefully from Nowak's Rule 4 (network reciprocity). Nowak's network reciprocity operates through spatial clustering *without* memory: cooperators survive on a lattice as long as the benefit-to-cost ratio exceeds the degree, $b/c > k$. With our parameters ($T = 1.7$, $R = 1.0$, $P = 0.0$, $S = -0.5$) and degree $k = 4$, the ratio is approximately $b/c \approx 2.4$, which falls short of the threshold $k = 4$. The no-memory ablation confirms this: even on a static graph, removing partner memory causes full collapse. The static graph in our models does not supply cooperation through network reciprocity in Nowak's sense. What it supplies is $w = 1.0$ — a re-encounter probability high enough that Nowak's Rule 2 (direct reciprocity) becomes fully effective. The graph is the delivery mechanism for Rule 2, not an independent instance of Rule 4. Both rules operate in nature; these models are specifically in the parameter regime where Rule 2 does the work and the graph's role is to make Rule 2 possible.

This has a direct biological implication. In early human populations, small stable bands — where the same individuals interacted repeatedly over long periods — provided the partner permanence that made direct reciprocity viable as a maintenance mechanism. The bands themselves (created by geography, kinship, or social structure) were the origin mechanism. The evolution of cooperation is not the story of a single mechanism doing everything. It is the story of partner permanence enabling direct reciprocity, which then protects cooperation from invasion and maintains it indefinitely.


## References

- Axelrod, R., & Hamilton, W. D. (1981). *The evolution of cooperation*. *Science*, 211(4489), 1390–1396. https://doi.org/10.1126/science.7466396
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
