# Ecology, Learning, and Evolution in PredPreyGrass  
## Morphological, Behavioral, and Life-History Perspectives (Clarified)

This document is an **extensive, self-contained synthesis** of the discussion about what kind of evolution is (and is not) present in the current PredPreyGrass environment.

It explicitly clarifies the distinction between **morphological (physiological)** traits, **behavioral** traits, and **life-history** traits — including how **energy-related parameters can belong to different categories depending on their role**.

The goal is **conceptual precision**, not prescription.

---

## 1. Darwinian evolution: a minimal definition

Darwinian evolution requires three ingredients:

1. **Variation**
2. **Inheritance**
3. **Differential survival and reproduction**

Whenever these are present, selection operates.  
The key question is **which traits vary and are inherited**.

---

## 2. Three axes of Darwinian evolution

Darwinian evolution is most cleanly decomposed into **three orthogonal axes**:

1. **Morphological (physiological) evolution** — what an organism *is*
2. **Behavioral evolution** — what an organism *does*
3. **Life-history evolution** — how resources are allocated *over time*

This triad is standard in evolutionary biology and maps cleanly onto artificial agent systems.

---

## 3. Morphological (physiological) evolution

### 3.1 Definition

Morphological evolution is selection on **phenotype-defining physical and physiological traits**.

These traits answer the question:

> *How costly is it for this body to exist and act?*

They define the **physics of the organism** and shape the state-transition dynamics of the environment.

---

### 3.2 Morphological traits in PredPreyGrass

In PredPreyGrass, morphological (physiological) traits include:

- movement speed and movement cost  
- energy cost per action  
- basal metabolic cost per time step  
- efficiency of converting prey/food into energy  
- maximum energy storage capacity  
- sensing radius and observation geometry  
- action affordances  
- interaction mechanics (e.g. kill thresholds)  

If two agents take the same actions in the same environment but lose energy at different rates, this difference is **morphological / physiological**.

---

## 4. Behavioral evolution

### 4.1 Definition

Behavioral evolution is selection on **strategy**, holding morphology constant.

These traits answer the question:

> *Given the same body, what actions are chosen?*

Examples (biological):
- foraging strategies  
- social and cooperative behavior  
- risk-taking vs avoidance  

Examples (artificial agents):
- policies  
- decision rules  
- action-selection strategies  

---

### 4.2 Learning versus behavioral evolution

A crucial distinction:

- **Learning** modifies behavior *within a lifetime*
- **Behavioral evolution** modifies which behaviors are *inherited*

Learning alone does **not** constitute behavioral evolution unless behavioral variation is heritable.

---

### 4.3 Behavioral evolution in PredPreyGrass (current state)

In the current setup:

- policies are shared per agent type  
- PPO updates policies continuously  
- offspring immediately use the shared policy  

As a result:

- behavior adapts via learning  
- behavior does *not* evolve via inheritance  
- no strategy can go extinct as a strategy  

This is **ecology with learning**, not behavioral evolution.

---

## 5. Life-history evolution

### 5.1 Definition

Life-history evolution concerns traits that regulate **timing and allocation across the lifespan**, not immediate action choice.

These traits answer the question:

> *When should energy be spent on survival, growth, or reproduction?*

They are often implemented as **parameters**, not decisions.

---

### 5.2 Life-history traits in PredPreyGrass

In PredPreyGrass, life-history traits include:

- reproduction energy threshold  
- reproduction energy cost  
- reproduction cooldown  
- aging rate or maximum age  
- starvation death rules  

These traits:

- strongly affect fitness  
- are heritable per agent type  
- are **not** under direct policy control  

They therefore belong to **life-history evolution**, not behavior.

---

## 6. Clarifying energy-related parameters

Energy-related variables can appear in **both morphology and life-history**, depending on their role.

### 6.1 Energy as physiology (morphology)

Energy parameters belong to **morphology** when they describe **costs of existence or action**, such as:

- basal energy decay per time step  
- energy cost per movement or attack  
- conversion efficiency from food to energy  

These answer:

> *How expensive is this body to run?*

---

### 6.2 Energy as life-history constraint

Energy parameters belong to **life-history** when they regulate **lifespan or reproduction timing**, such as:

- energy thresholds for reproduction  
- energy depletion leading to starvation death  
- age-related decline expressed via energy limits  

These answer:

> *How long can this organism persist, and when can it reproduce?*

---

### 6.3 Why the same variable can play different roles

A single variable (e.g. `energy_decay`) may:

- represent **metabolic cost** → morphology  
- represent **aging or lifespan pressure** → life-history  

This is common in models but conceptually important to recognize.

---

## 7. What the current model implements evolutionarily

Putting everything together, the current PredPreyGrass model implements:

- ✔ ecological dynamics  
- ✔ death and reproduction  
- ✔ demographic selection  
- ✔ morphological (physiological) evolution between types  
- ✔ within-lifetime behavioral learning  

It does **not** implement:

- ✘ heritable behavioral variation  
- ✘ selection between strategies  
- ✘ policy extinction or fixation  

The correct classification is:

> **Ecological population dynamics with learning and morphological selection**

---

## 8. Why reproduction timing is not a strategy

In the current environment, reproduction follows a rule of the form:

```
IF energy ≥ threshold AND cooldown passed:
    reproduce()
```

Key consequences:

- reproduction is not an action  
- the policy cannot refuse reproduction  
- timing is determined by state, not choice  

Therefore:

> **Reproduction is a mechanism, not a behavioral strategy**

Policies can only influence reproduction **indirectly** via survival and energy acquisition.

---

## 9. Contrast with Genetic Algorithms and PBT

### 9.1 GA / PBT

In Genetic Algorithms and Population-Based Training:

- the population consists of **policies**
- policies reproduce, mutate, and are replaced  
- inheritance is explicit  
- poor strategies are removed  

Selection acts directly on **strategies**.

---

### 9.2 PredPreyGrass

In PredPreyGrass:

- the population consists of **agents (bodies)**  
- policies are shared  
- reproduction does not transmit strategies  
- death removes individuals, not strategies  

Thus:

> **Selection removes bodies, not behaviors**

---

## 10. The minimal boundary to behavioral (policy) evolution

The system crosses into behavioral evolution if and only if:

1. Multiple policy variants exist **within the same morphology**  
2. Policy identity is **heritable**  
3. Differential reproduction changes **policy frequencies**  

Mutation is optional; inheritance and selection are sufficient.

---

## 11. Diagnostic question

A single question distinguishes ecology-with-learning from behavioral evolution:

> **Can two agents with the same body but different policies compete, reproduce, and change their relative frequencies over time?**

- No → ecology + learning  
- Yes → behavioral evolution  

---

## 12. Final synthesis

Darwinian evolution is not monolithic.

It acts on:

- **Morphology / physiology** (what organisms are)
- **Behavior** (what organisms do)
- **Life-history traits** (how organisms allocate effort over time)

Your current PredPreyGrass model already captures:

- morphology-based selection  
- ecological dynamics  
- learning-driven behavioral adaptation  

Behavioral evolution begins only when **strategies themselves become heritable and selectable**.

---

## Final takeaway

> **Energy-related parameters are morphological when they describe physiological costs, and life-history traits when they regulate lifespan or reproduction.  
> PredPreyGrass currently implements ecological and morphological evolution with learning; behavioral evolution requires heritable strategy variation.**
