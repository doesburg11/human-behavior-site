---
id: evolutionary-merits-ppg
title: The Evolutionary Merits of PPG
---


# Ecology, Learning, and Policy Evolution in PredPreyGrass

This document consolidates the discussion into a **single, coherent reference**.  
It clarifies **what the current PredPreyGrass model already does evolutionarily**, what it does *not* do, and what the **minimal conceptual boundary** is between:

- ecological population dynamics with learning, and  
- true evolutionary selection on policies (strategies).

The aim is **conceptual precision**, not prescriptions.

---

## 1. What the current model does

### 1.1 Ecology with death and reproduction

In the current environment:

- Agents **die**:
  - prey die by being eaten
  - predators die due to energy depletion, age, or failure
- Agents **reproduce**:
  - reproduction creates offspring
  - many agents never reproduce
- Parents and offspring **coexist**
- Generations **overlap**

This already produces **real ecological selection**:
- not all agents survive
- not all agents reproduce
- population sizes and compositions change over time

This is *not* a trivial or fake form of selection.

---

### 1.2 Learning dominates strategy change

Behavioral adaptation occurs via:

- shared policies per agent type
- PPO updating policy parameters continuously
- offspring immediately using the *current shared policy*

As a consequence:

- strategies change primarily via **learning**
- reproduction affects **population size**, not **strategy space**
- no strategy can go extinct as a strategy

This is **learning in a population**, not evolution of behavior.

---

### 1.3 Fitness is individual, not lineage-based

In the current model, success is determined mainly by:

- individual survival time
- individual energy accumulation
- individual reproduction events

What matters much less:

- whether offspring survive
- whether a lineage persists

This corresponds to **individual-level fitness**, not gene- or lineage-level fitness.

---

## 2. What the current model is (precise classification)

The most accurate description is:

> **An ecological population model with overlapping generations and within-lifetime learning.**

More explicitly:

- ✔ ecological dynamics
- ✔ demographic selection
- ✔ predation-based death
- ✔ learning-driven behavioral adaptation
- ✘ heritable behavioral variation
- ✘ selection between strategies
- ✘ policy extinction or fixation

This is **not** a genetic algorithm, nor Population-Based Training (PBT).

---

## 3. Contrast with Genetic Algorithms / PBT

### 3.1 What GA / PBT do

In GA / PBT:

- the population consists of **policies**
- policies reproduce, mutate, and are replaced
- poor policies are discarded
- inheritance is explicit
- selection acts on **strategies**, not bodies

Evolutionary loop (conceptually):

```
policies → evaluate fitness → select → copy → mutate → replace
```

Learning (if present) is subordinate to selection.

---

### 3.2 What PredPreyGrass currently does instead

- population consists of **agents (bodies)**
- policies are **shared**
- reproduction does not transmit strategy variation
- death removes individuals, not strategies

So:

> **Selection removes bodies, not behaviors.**

This is the fundamental difference.

---

## 4. Body parameters vs policy parameters

### 4.1 Body parameters (phenotype)

Body parameters are fixed, non-learned traits that define *what an agent is*:

- movement speed and costs
- energy metabolism
- sensing range and observation structure
- action affordances
- interaction rules (e.g. kill thresholds)
- reproduction rules (thresholds, costs, cooldowns)

If two agents have the same policy but different body parameters, they will behave differently.

---

### 4.2 Policy parameters (behavior)

Policy parameters determine *how an agent decides*:

- neural network weights
- value estimates
- internal memory state (if any)

Policy evolution is only meaningful when **body parameters are held constant**.

---

## 5. Species / morph evolution vs policy evolution

### 5.1 What multiple predator types give you

If you have:

- predator type A (fast)
- predator type B (slow)

with different body parameters, then you already have:

> **Real Darwinian selection between morphologies or species.**

Population ratios can change, types can go extinct.

This is valid evolution — but it is **not policy evolution**.

---

### 5.2 Why this is not policy evolution

In that case:

- body and policy are inseparable
- selection acts on the *package*
- you cannot tell whether success is due to:
  - morphology
  - behavior
  - or both

Policy evolution requires selection **within the same phenotype**.

---

## 6. The minimal boundary for true policy evolution

The system crosses the boundary into policy evolution if and only if:

1. There exist **multiple policy variants** for the same ecological role  
2. All variants share:
   - identical body parameters
   - identical observation space
   - identical action space
3. Agents **inherit which policy variant they use**
4. Differential reproduction/survival changes **variant frequencies**

Formally:

> Selection must act on *which policy persists*, not just on *which bodies survive*.

Mutation is *not* required to cross the boundary — only heritable variation and selection.

---

## 7. Why reproduction timing is not a strategy in the current model

### 7.1 Reproduction is a mechanism, not an action

In the current environment:

```
IF energy ≥ threshold AND cooldown passed:
    reproduce()
```

There is:
- no explicit “reproduce” action
- no way for the policy to refuse reproduction
- no direct choice over timing

Therefore:

> **Reproduction is not a strategic decision.**

---

### 7.2 What behavior can and cannot influence

Policies can only influence reproduction **indirectly**, via:

- survival
- energy acquisition
- spatial positioning

They cannot implement true life-history strategies such as:
- reproductive restraint
- delayed reproduction by choice
- conditional reproduction

So “early vs late reproduction” is *not* a policy dimension in the strict sense.

---

## 8. Valid policy variants in the current environment

Given the above constraints, valid policy variants are those that differ in **decision-making**, not in mechanics.

### Examples that ARE valid:
- different network weights
- different risk tolerance
- different cooperation tendencies
- different spatial strategies
- different exploration behavior
- different learning hyperparameters (γ, entropy, etc.)

### Examples that are NOT policy variants:
- different reproduction thresholds
- different energy costs
- different sensing radius
- different action sets
- different kill rules

Those are body/environment changes.

---

## 9. Summary: what changes and what does not

### What the current model already gives you
- ecology
- learning
- demographic selection
- species/morph competition (if body differs)

### What it does not give you (yet)
- heritable behavioral variation
- strategy extinction/fixation
- selection between policies

---

## 10. One-paragraph summary (for reuse)

> The current PredPreyGrass environment implements ecological population dynamics with overlapping generations and within-lifetime learning. Agents die, reproduce, and compete for resources, producing demographic selection at the level of individuals. However, policies are shared within ecological roles and reproduction does not transmit distinct behavioral variants. As a result, strategy change is driven primarily by learning rather than inheritance, and selection acts on bodies rather than on behaviors. This places the system in the category of ecological multi-agent reinforcement learning rather than evolutionary selection on policies.

---

## 11. Key invariant (the litmus test)

A single question cleanly distinguishes ecology-with-learning from policy evolution:

> **Can two agents with the same body but different policies compete, reproduce, and change their relative frequencies over time?**

- If **no** → ecology + learning  
- If **yes** → policy evolution

---

## Final takeaway

> **Your current model already contains real ecology and real selection — but strategy evolution only begins when behavior itself becomes heritable and selectable.**

Nothing about this is a criticism; it is a precise classification.
