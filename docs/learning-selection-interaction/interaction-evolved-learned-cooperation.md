---
id: interaction-evolved-learned-cooperation
title: Interaction Evolved-Learned Cooperation
sidebar_position: 1
slug: /learning-selection-interaction/theory
---

# Interaction Evolved-Learned Cooperation

## A Two-Timescale Theory of Cooperation

Cooperation can emerge through two different adaptive processes:

- Learning within lifetimes (behavioral plasticity, reinforcement learning)
- Selection across generations (evolutionary dynamics)

These processes operate on entirely different timescales:

`Learning timescale <<< Evolutionary timescale`

In natural systems they interact. The two-timescale simulation family in this section provides a controlled framework where both processes can be analyzed together.

---

## Fast and Slow Dynamics

### Fast timescale — learning

Agents update their policy during their lifetime to increase expected reward.

$$
\pi_{t+1} \leftarrow \pi_t + \alpha \nabla_\pi \mathbb{E}[R]
$$

Where:

- $s$ = social state (partner history, local interaction context),
- $a$ = action (cooperate or defect),
- $R$ = interaction reward/payoff,
- $\alpha$ = learning rate.

In this simulation family, reward is defined by donation-game payoffs and partner-specific interaction outcomes.

---

### Slow timescale — evolution

Population composition changes across generations:

frequency_next = (fitness / mean_fitness) * frequency

Fitness depends on learned behavior:

fitness = f(learned_policy)

Evolution therefore selects based on learning outcomes.

---

## The Baldwin Effect

The Baldwin effect describes how learning changes evolutionary trajectories without requiring inheritance of learned behavior.

Step 1 — Plasticity enables adaptive behavior  
Individuals that can learn cooperative strategies reproduce more.

Step 2 — Selection favors learnability  
Evolution favors traits that:

- reduce learning cost
- bias initial behavior toward cooperation
- increase learning speed

Step 3 — Partial genetic assimilation  
Cooperation becomes easier or faster to learn and may become partially innate.

Learning reshapes the fitness landscape by making cooperative strategies reachable.

---

## Fitness Landscape Interpretation

Without learning:

- cooperative strategies may have low initial fitness
- evolution cannot discover them

With learning:

- agents discover cooperative policies during life
- these increase reproductive success
- evolution favors individuals predisposed to those behaviors

Learning smooths the fitness landscape and guides selection.

---

## Interaction Regimes

Learning and evolution can interact in different ways:

1. Learning accelerates evolution  
   Plasticity enables rapid discovery of cooperation that selection stabilizes.

2. Learning masks selection  
   If all agents learn equally well, fitness differences shrink.

3. Learning opposes evolution  
   Short-term learned defection may increase individual reward but reduce population fitness.

4. Coevolution of learning ability  
   Selection may favor faster or more robust learners.

---

## Manifestation in the Simulation Suite

In the integrated two-timescale cooperation simulations:

- interactions are local by default (ring structure)
- agents update behavior within generation (trust or Q-values)
- agents reproduce between generations based on accumulated payoff

This creates a Baldwin-style pathway:

1. Agents learn partner-contingent cooperation during life
2. Learners with better long-run payoff leave more offspring
3. Offspring inherit parameter settings that make successful learning more likely

Cooperation shifts from:

context-dependent learning alone -> learning supported by evolved predispositions

---

## What Can Evolve

Selection can act on:

- trust predispositions (`trust_prior`)
- social responsiveness to experience
- reinforcement-learning parameters (`alpha`, `epsilon`, `gamma`, bias)
- social-cognitive parameters (reputation weighting, rejection threshold, forgiveness)

This leads to cooperation-friendly learning phenotypes rather than fixed cooperative strategies.

---

## Testable Predictions

The two-timescale framework generates testable predictions:

- Populations with repeated interaction should evolve higher cooperation than one-shot regimes.
- Selection should favor parameter combinations that improve partner discrimination.
- In stranger-rich environments, reputation-mediated mechanisms should outperform pure partner-memory mechanisms.
- Different learning rules (trust update vs Q-learning) should produce different cooperation-payoff trade-offs.

All of these are testable within the integrated model family.

---

## Relation to Classical Theories

Classical evolutionary models:
- fixed strategies
- cooperation via selection only

Pure reinforcement learning models:
- cooperation within lifetimes
- no generational dynamics

This framework unifies both:

Cooperation = f(learning dynamics, evolutionary dynamics)

---

## Related Work (Closest by Axis)

No single landmark paper fully matches this integrated setup across all dimensions (reciprocal cooperation, reinforcement learning, social structure, and learning-selection coupling). The closest lines of work are:

<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '38%' }} />
      <col style={{ width: '24%' }} />
      <col style={{ width: '38%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Work</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Closest axis to PPG</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Main gap vs PPG</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://www.cs.toronto.edu/~cebly/Papers/multirl-abs.html">
            Claus and Boutilier (1998), <em>The Dynamics of Reinforcement Learning in Cooperative Multiagent Systems</em>
          </a>
        </td>
        <td>Foundational emergence of cooperation in MARL</td>
        <td>Small, abstract cooperative games; limited evolutionary parameter dynamics</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://arxiv.org/abs/1702.03037">
            Leibo et al. (2017), <em>Multi-agent Reinforcement Learning in Sequential Social Dilemmas</em>
          </a>
        </td>
        <td>Sequential social dilemmas and emergent cooperation</td>
        <td>Limited explicit between-generation selection over learning traits</td>
      </tr>
      <tr>
        <td>
          <a href="https://papers.nips.cc/paper/7593-inequity-aversion-improves-cooperation-in-intertemporal-social-dilemmas">
            Hughes et al. (2018), <em>Inequity Aversion Improves Cooperation in Intertemporal Social Dilemmas</em>
          </a>
        </td>
        <td>Mechanisms that stabilize cooperation in sequential settings</td>
        <td>Focus on social preferences, not explicit inheritance/mutation of learning parameters</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://arxiv.org/abs/1903.08082">
            Eccles et al. (2019), <em>Learning Reciprocity in Complex Sequential Social Dilemmas</em>
          </a>
        </td>
        <td>Reciprocity under temporal and social complexity</td>
        <td>No explicit reproduction-selection loop over agent-level traits</td>
      </tr>
      <tr>
        <td>
          <a href="https://arxiv.org/abs/1812.07019">
            Leibo et al. (2018), <em>Malthusian Reinforcement Learning</em>
          </a>
        </td>
        <td>Population pressure and ecology-linked MARL adaptation</td>
        <td>Less focused on partner-specific reciprocity mechanisms</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://ojs.aaai.org/index.php/AAAI/article/view/11771">
            Zheng et al. (2018), <em>MAgent</em>
          </a>
        </td>
        <td>Large-scale many-agent ecological-like environments</td>
        <td>Benchmark platform, not a targeted two-timescale reciprocity model</td>
      </tr>
      <tr>
        <td>
          <a href="https://arxiv.org/abs/1903.00784">
            Suarez et al. (2019), <em>Neural MMO</em>
          </a>
        </td>
        <td>Persistent multi-agent worlds with resource pressure and emergent roles</td>
        <td>Different task framing; weaker explicit reciprocity-selection theory framing</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://arxiv.org/abs/2107.06857">
            Leibo et al. (2021), <em>Melting Pot</em>
          </a>
        </td>
        <td>Broad evaluation of social behaviors in MARL</td>
        <td>Evaluation suite rather than a single coupled learning-selection model</td>
      </tr>
    </tbody>
  </table>
</div>

Taken together, these works bracket the design space of the present simulation family. The integrated model set is closest to their intersection, rather than to any one benchmark or theory.

---

## Simulation Companion

The concrete two-timescale experiments documented for this site are available in:

- [Two-Timescale Simulations](/learning-selection-interaction/simulations)

That section contains model-by-model results (trust learning, Q-learning, extended social mechanisms), the network-diversity experiment, and focused appendices.

---

## Summary

The interaction between learning and selection:

- couples fast behavioral adaptation with slow population change
- enables the Baldwin effect
- allows plasticity to guide evolution
- explains how cooperation emerges, stabilizes, or collapses

This interaction forms the core mechanism linking nurture and nature in the integrated two-timescale cooperation simulations.
