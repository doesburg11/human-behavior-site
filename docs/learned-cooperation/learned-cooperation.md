---
id: learned-cooperation
title: Learned Cooperation
sidebar_position: 4
slug: /learned-cooperation
---

## Cooperation Within Lifetimes

Learned cooperation refers to cooperative behavior that emerges **through adaptation during an agent’s lifetime**, rather than through genetic or evolutionary selection across generations.

In this framework, agents:

- begin with no cooperative strategy,
- interact repeatedly with others,
- update their behavior based on experience and reward.

This process corresponds to **reinforcement learning (RL)** in artificial systems and **behavioral plasticity** in biological systems.

---

## From Fixed Strategies to Adaptive Policies

Classical evolutionary models of cooperation (e.g., kin selection, evolutionary game theory) assume that agents are born with **fixed strategies**. Cooperation spreads because cooperative strategies achieve higher reproductive success.

Learned cooperation differs fundamentally:

| Evolutionary cooperation | Learned cooperation |
|---|---|
Strategy is fixed within lifetime | Policy changes within lifetime |
Selection acts across generations | Learning acts across interactions |
Fitness determines reproduction | Reward shapes behavior |
Adaptation is population-level | Adaptation is individual-level |

Thus, cooperation can emerge **without requiring genetic relatedness or population selection**, purely through experience.

---

## Reinforcement Learning as a Model of Plasticity

In reinforcement learning, an agent updates its policy $\pi(a \mid s)$ to maximize expected cumulative reward:

$$
\pi_{t+1} \leftarrow \pi_t + \alpha \nabla_\pi \mathbb{E}[R]
$$

Where:

- $s$ = state (local ecological context),
- $a$ = action (e.g., hunt, wait, share space),
- $R$ = reward (in PredPreyGrass: reproduction),
- $\alpha$ = learning rate.

Because reward depends on **interactions with other agents**, the learning problem is inherently social.

This creates:

- coordination dynamics,
- reciprocity-like behavior,
- role specialization,
- context-dependent cooperation.

---

## Learned Cooperation in Social Dilemmas

Multi-agent reinforcement learning studies show that:

- Cooperation can emerge in repeated interactions
- It is sensitive to exploration noise
- It may collapse under non-stationarity
- Stable cooperation often requires spatial or temporal structure

Key mechanisms include:

### Direct Reciprocity Through Learning
Agents learn to cooperate because cooperative partners yield higher long-term reward.

### Coordination Learning
Agents learn complementary roles (e.g., blocking vs capturing).

### Conditional Cooperation
Policies become contingent on local context and recent interaction history.

These mechanisms do **not** require kinship or genetic selection.

---

## Sequential Social Dilemmas

In spatial and temporally extended environments, cooperation is not a single decision but a **policy over trajectories**.

This introduces:

- delayed benefits of cooperation,
- ecological feedback,
- group-level outcomes emerging from local learning.

Such settings are closer to natural systems than matrix games.

---

## Learned Cooperation in PredPreyGrass

PredPreyGrass studies learned cooperation under the constraint that:

> **Reproduction is the only reward.**

There are no explicit cooperation rewards.

Cooperation must therefore emerge because it **increases survival and reproductive success during the agent’s lifetime**.

Examples include:

- group hunting increasing capture probability,
- energy pooling through spatial coordination,
- division of roles among predators,
- avoidance of interference competition.

These behaviors arise from **policy adaptation**, not from inherited strategies.

---

## Instability and Social Dilemmas

Learned cooperation is often fragile.

Independent learners face:

- non-stationary environments (others are learning),
- credit assignment problems,
- temptation to defect.

This leads to:

- oscillations between cooperation and defection,
- metastable cooperative regimes,
- sensitivity to population density and resource levels.

Studying these instabilities is central to understanding when learning alone can sustain cooperation.

---

## Relation to Evolutionary Cooperation

Learned cooperation operates on a **faster timescale** than evolutionary selection.

This creates several possibilities:

- Learning can **enable** cooperation before evolution acts.
- Learning can **mask** fitness differences, slowing selection.
- Learning can **bias** evolutionary trajectories (Baldwin effect).

NB: The Baldwin effect describes how learning within lifetimes alters evolutionary selection across generations. Individuals that can learn beneficial behaviors achieve higher reproductive success, causing evolution to favor traits that make those behaviors easier to acquire. In this way, plasticity guides the direction of selection without requiring the inheritance of learned behavior.

PredPreyGrass provides a system in which both processes can be studied simultaneously.

---

## Research Questions

The study of learned cooperation in PredPreyGrass focuses on:

- Under what ecological conditions does cooperation emerge through learning alone?
- How stable is learned cooperation without selection?
- When do cooperative and defective policies coexist?
- How does population structure affect policy convergence?
- What role does plasticity play in enabling later evolutionary cooperation?

---

## Summary

Learned cooperation is:

- an individual-level adaptive process,
- driven by reinforcement from social interaction,
- capable of producing coordination and reciprocity without genetic relatedness,
- often unstable in the absence of evolutionary selection.

Understanding its dynamics is essential for explaining how cooperation can arise rapidly and how it interacts with slower evolutionary processes.

In PredPreyGrass, learned cooperation forms the **nurture component** of a two-timescale theory of cooperation.

# Learned Cooperation: from Defection to Cooperation

This section is organized around your central motto:

**The Nature and Nurture of Cooperation**  
Here we focus on the **nurture** side: how cooperation can emerge from learning.

## Why start with defection?

Cooperation is non-trivial. In many strategic settings, selfish behavior is the local default.
So the right starting point is:

- first explain why defection is often rational at first glance,
- then show when repeated interaction can change that logic,
- then test whether agents can discover that transition through learning.

## Logical Path for This Section

1. [Prisoner's Dilemma: defection as baseline](/learned-cooperation/prisoners-dilemma)
2. [Repeated Prisoner's Dilemma Theory: when reciprocity can become rational](/learned-cooperation/repeated-prisoners-dilemma)
3. [Repeated Prisoner's Dilemma PPO Study: independent PPO on the repeated game](/learned-cooperation/repeated-prisoners-dilemma/ppo-study)
4. [General learned-cooperation theory in ecological systems](/learned-cooperation)

## What This Gives You

By following this order, the reader sees:

- why cooperation is difficult,
- why repetition matters,
- how MARL can operationalize that theory,
- and where learned cooperation is stable vs fragile.

## Go Further Toward Cooperation

After this section, there are three natural directions:

1. **Toward broader social cooperation**: [Cooperation](/cooperation-in-perspective)
2. **Toward inherited cooperation (nature)**: [Evolved Cooperation Theory](/evolved-cooperation)
3. **Toward the bridge between both**: [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory)
