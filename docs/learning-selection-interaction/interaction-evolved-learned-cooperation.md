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

In natural systems they interact. PredPreyGrass provides a framework in which both occur in the same ecological environment.

---

## Fast and Slow Dynamics

### Fast timescale — learning

Agents update their policy during their lifetime to increase expected reward.

$$
\pi_{t+1} \leftarrow \pi_t + \alpha \nabla_\pi \mathbb{E}[R]
$$

Where:

- $s$ = state (local ecological context),
- $a$ = action (e.g., hunt, wait, share space),
- $R$ = reward (in PredPreyGrass: reproduction),
- $\alpha$ = learning rate.

Reward is determined by ecological and social interaction.  
In PredPreyGrass: reproduction is the only reward.

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

## Manifestation in PredPreyGrass

In PredPreyGrass:

- reward = reproduction
- cooperation increases capture efficiency
- learned coordination increases lifetime fitness

This creates a Baldwin pathway:

1. Predators learn group hunting  
2. Group hunters reproduce more  
3. Offspring inherit traits that improve coordination conditions  
   (e.g. speed ratios, spatial proximity tendencies, reduced interference)

Cooperation shifts from:

purely learned → facilitated by inherited traits

---

## What Can Evolve

Selection can act on:

- morphological traits (speed, vision, energy capacity)
- learning parameters
- initial policy biases
- social attraction or avoidance tendencies

This leads to cooperation-friendly phenotypes rather than fixed cooperative strategies.

---

## Testable Predictions

The two-timescale framework generates testable predictions:

- Populations with learning evolve cooperation faster than populations without learning.
- Disabling learning after evolution reveals partially innate cooperation.
- High plasticity reduces selection gradients.
- Low plasticity increases evolutionary pressure on morphology.

All of these can be tested in PredPreyGrass.

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

No single landmark paper fully matches PredPreyGrass across all dimensions (sequential MARL, ecology, cooperation, population pressure, and learning-selection coupling). The closest lines of work are:

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
        <td>Small, abstract cooperative games; no ecological population dynamics</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://arxiv.org/abs/1702.03037">
            Leibo et al. (2017), <em>Multi-agent Reinforcement Learning in Sequential Social Dilemmas</em>
          </a>
        </td>
        <td>Sequential social dilemmas and emergent cooperation</td>
        <td>Limited evolutionary/selection dynamics</td>
      </tr>
      <tr>
        <td>
          <a href="https://papers.nips.cc/paper/7593-inequity-aversion-improves-cooperation-in-intertemporal-social-dilemmas">
            Hughes et al. (2018), <em>Inequity Aversion Improves Cooperation in Intertemporal Social Dilemmas</em>
          </a>
        </td>
        <td>Mechanisms that stabilize cooperation in sequential settings</td>
        <td>Focus on social preferences, not ecology-selection coupling</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://arxiv.org/abs/1903.08082">
            Eccles et al. (2019), <em>Learning Reciprocity in Complex Sequential Social Dilemmas</em>
          </a>
        </td>
        <td>Reciprocity under temporal and social complexity</td>
        <td>No explicit ecological reproduction-selection loop</td>
      </tr>
      <tr>
        <td>
          <a href="https://arxiv.org/abs/1812.07019">
            Leibo et al. (2018), <em>Malthusian Reinforcement Learning</em>
          </a>
        </td>
        <td>Population pressure and ecology-linked MARL adaptation</td>
        <td>Less focused on explicit cooperative hunting ecology</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://ojs.aaai.org/index.php/AAAI/article/view/11771">
            Zheng et al. (2018), <em>MAgent</em>
          </a>
        </td>
        <td>Large-scale many-agent ecological-like environments</td>
        <td>Benchmark platform, not a specific two-timescale cooperation theory</td>
      </tr>
      <tr>
        <td>
          <a href="https://arxiv.org/abs/1903.00784">
            Suarez et al. (2019), <em>Neural MMO</em>
          </a>
        </td>
        <td>Persistent multi-agent worlds with resource pressure and emergent roles</td>
        <td>Different task framing; weaker explicit learning-selection theory framing</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://arxiv.org/abs/2107.06857">
            Leibo et al. (2021), <em>Melting Pot</em>
          </a>
        </td>
        <td>Broad evaluation of social behaviors in MARL</td>
        <td>Evaluation suite rather than a single ecological cooperation model</td>
      </tr>
    </tbody>
  </table>
</div>

Taken together, these works bracket PPG's design space. PPG is closest to their intersection, rather than to any one benchmark or theory.

---

## Summary

The interaction between learning and selection:

- couples fast behavioral adaptation with slow population change
- enables the Baldwin effect
- allows plasticity to guide evolution
- explains how cooperation emerges, stabilizes, or collapses

This interaction forms the core mechanism linking nurture and nature in PredPreyGrass.
