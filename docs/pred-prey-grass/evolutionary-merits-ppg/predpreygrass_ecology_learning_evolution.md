# Ecology, Learning, and Evolution in PredPreyGrass  
## Morphological, Behavioral, and Life-History Perspectives

This document is an **extensive, self-contained synthesis** of the discussion about what kind of evolution is (and is not) present in the current PredPreyGrass environment.  
It is intended to be uploaded directly to a repository, documentation site, or shared as a conceptual reference.

The goal is **classification and clarity**, not prescription.

---

## 1. What is meant by Darwinian evolution?

Darwinian evolution requires three ingredients:

1. **Variation**
2. **Inheritance**
3. **Differential survival and reproduction**

Whenever these are present, selection operates.  
The key question is **what kind of traits vary and are inherited**.

---

## 2. The three axes of Darwinian evolution

Darwinian evolution is most cleanly decomposed into **three orthogonal axes**:

1. **Morphological evolution** — what an organism *is*
2. **Behavioral evolution** — what an organism *does*
3. **Life-history evolution** — how effort is allocated *over time*

This triad is standard in evolutionary biology and maps cleanly onto artificial agent systems.

---

## 3. Morphological evolution

### 3.1 Definition

Morphological evolution is selection on **phenotype-defining parameters**:

- body size and shape  
- movement capabilities  
- metabolic efficiency  
- sensing organs  
- physical constraints  

These traits define the **state-transition dynamics** of the organism in its environment.

---

### 3.2 Morphological evolution in PredPreyGrass

In PredPreyGrass, morphology corresponds to **body parameters**, such as:

- movement speed and movement cost  
- energy decay and energy gain  
- sensing radius and observation structure  
- action affordances  
- interaction rules (e.g., kill thresholds)  

When you define multiple predator or prey types with different such parameters:

- types compete  
- population ratios change  
- types can dominate or go extinct  

This is **genuine Darwinian morphological evolution**.

---

## 4. Behavioral evolution

### 4.1 Definition

Behavioral evolution is selection on **strategy**, holding morphology fixed.

In biological terms:
- foraging strategies  
- mating strategies  
- cooperation vs defection  
- social organization  

In artificial agents:
- policies  
- decision rules  
- action-selection strategies  

---

### 4.2 Behavior vs learning

A crucial distinction:

- **Learning** changes behavior *within a lifetime*
- **Behavioral evolution** changes which behaviors are *inherited*

Learning alone does **not** constitute behavioral evolution unless behavior is heritable.

---

### 4.3 Behavioral evolution in PredPreyGrass

In the current setup:

- policies are shared per agent type  
- PPO updates policies continuously  
- offspring immediately use the shared policy  

Therefore:

- behavior adapts via learning  
- behavior does *not* evolve via inheritance  
- no strategy can go extinct as a strategy  

This is **ecology with learning**, not behavioral evolution.

---

## 5. Life-history evolution

### 5.1 Definition

Life-history evolution concerns traits that regulate **timing and allocation**, not immediate action:

- age at first reproduction  
- lifespan  
- reproduction frequency  
- offspring investment  
- semelparity vs iteroparity  

These traits are often **parameters**, not decisions.

---

### 5.2 Life-history traits in PredPreyGrass

In PredPreyGrass, life-history parameters include:

- reproduction energy threshold  
- reproduction cost  
- reproduction cooldown  
- aging rate  
- starvation dynamics  

These traits:

- strongly affect fitness  
- are heritable per type  
- are *not* under policy control  

They therefore constitute **life-history traits**, not behaviors.

---

## 6. What the current model does evolutionarily

Putting the above together, the current PredPreyGrass environment implements:

- ✔ ecological dynamics  
- ✔ death and reproduction  
- ✔ demographic selection  
- ✔ morphological evolution (between types)  
- ✔ within-lifetime learning  

But it does **not** implement:

- ✘ heritable behavioral variation  
- ✘ selection between strategies  
- ✘ policy extinction or fixation  

The correct classification is:

> **Ecological population dynamics with learning and morphological selection**

---

## 7. Why reproduction timing is not a strategy

In the current environment, reproduction follows a rule of the form:

```
IF energy ≥ threshold AND cooldown passed:
    reproduce()
```

Key consequences:

- reproduction is not an action  
- the policy cannot accept or refuse reproduction  
- timing is determined by state, not choice  

Thus:

> **Reproduction is a mechanism, not a behavioral strategy**

Policies can only influence reproduction **indirectly** by affecting survival and energy.

---

## 8. Contrast with Genetic Algorithms and PBT

### 8.1 GA / PBT

In GA and Population-Based Training:

- the population consists of **policies**
- policies reproduce and are replaced  
- inheritance is explicit  
- mutation introduces variation  
- poor strategies are removed  

Selection acts directly on **strategies**.

---

### 8.2 PredPreyGrass

In PredPreyGrass:

- the population consists of **agents (bodies)**  
- policies are shared  
- reproduction does not transmit strategies  
- death removes individuals, not strategies  

Therefore:

> **Selection removes bodies, not behaviors**

---

## 9. The minimal boundary to policy evolution

The system crosses into behavioral (policy) evolution if and only if:

1. Multiple policy variants exist **within the same morphology**  
2. Policy identity is **heritable**  
3. Differential reproduction changes **policy frequencies**  

Mutation is optional; inheritance and selection are sufficient.

---

## 10. Clean diagnostic question

A single question distinguishes ecology-with-learning from behavioral evolution:

> **Can two agents with the same body but different policies compete, reproduce, and change their relative frequencies over time?**

- No → ecology + learning  
- Yes → behavioral evolution  

---

## 11. Final synthesis

Darwinian evolution is not a single monolithic process.

It can act on:

- **Morphology** (what organisms are)
- **Behavior** (what organisms do)
- **Life-history traits** (how organisms allocate effort over time)

Your current PredPreyGrass model already captures:

- morphology-based selection  
- ecological dynamics  
- learning-driven behavioral adaptation  

Behavioral evolution requires only one additional conceptual ingredient:
**heritable strategy variation within a fixed morphology**.

---

## Final takeaway

> **Not all evolution is behavioral, and not all behavior is evolutionary.  
> PredPreyGrass currently implements ecological and morphological evolution with learning; behavioral evolution begins when strategies themselves become heritable and selectable.**
