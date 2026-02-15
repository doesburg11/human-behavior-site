# Implementing Behavioral Evolution Strategies in PredPreyGrass
## Cooperative vs Opportunistic Predator Policies (Codex Context File)

This document is meant to be **used directly as context for Codex in VS Code**.
Place it in your repository (e.g. `docs/behavioral_strategies.md`) and instruct Codex
to use it as implementation guidance.

It intentionally contains **only actionable design**, not theory.

---

## Goal

We want to test **behavioral evolution**.

- All predators have **identical morphology and life-history**
- Differences are **purely behavioral**
- Strategies are implemented as **distinct policies**
- Strategy identity is **preserved on reproduction**

---

## Strategy A: Cooperative Hunter

### Behavioral intent
A cooperative hunter:
- waits for nearby predators before attacking large prey
- approaches large prey *together*
- avoids attacking large prey alone if success probability is low
- rallies toward predator clusters when alone

This strategy is **coordination-first**.

---

### Decision logic (conceptual)

1. Detect nearby predators in Moore neighborhood
2. Detect nearby prey (distinguish large vs small if applicable)
3. If large prey is adjacent or reachable:
   - attack **only if** enough predators are nearby
4. If large prey is visible but cooperation condition is not met:
   - move toward nearest predator / predator cluster
5. Otherwise:
   - forage opportunistically or patrol

---

### Pseudocode

```python
def cooperative_policy(obs):
    predators_near = count_predators(obs, radius=1)
    large_prey_dir = nearest_large_prey(obs)
    small_prey_dir = nearest_small_prey(obs)

    if large_prey_dir is not None:
        if predators_near >= 2:
            return move(large_prey_dir)   # coordinated attack
        else:
            return move(toward_predator_cluster(obs)) or stay()

    if small_prey_dir is not None:
        return move(small_prey_dir)

    return move(toward_predator_cluster(obs)) or random_walk()
```

---

## Strategy B: Opportunistic Defector

### Behavioral intent
An opportunistic defector:
- attacks whenever prey is nearby
- ignores coordination cues
- exploits situations where others soften prey
- shadows predator clusters to steal opportunities

This strategy is **greedy and myopic**.

---

### Decision logic (conceptual)

1. If any prey is adjacent or reachable:
   - attack immediately
2. If prey is visible:
   - chase prey even if alone
3. If no prey visible:
   - shadow predator clusters or patrol randomly

---

### Pseudocode

```python
def opportunistic_policy(obs):
    prey_dir = nearest_any_prey(obs)

    if prey_dir is not None:
        return move(prey_dir)   # always commit

    return move(toward_predator_cluster(obs)) or random_walk()
```

---

## Implementation Notes (PredPreyGrass-specific)

### 1. Actions
- Predators typically "attack" by **moving onto prey cells**
- Avoiding attack = **avoiding stepping onto prey when alone**

No new actions are required.

---

### 2. Observations required
The policy assumes access to:
- predator positions (same type)
- prey positions (distinguish large vs small if needed)
- local neighborhood geometry

These are already present in PredPreyGrass observation channels.

---

### 3. Strategy identity (policy identity)

Each predator must have a **strategy label**, e.g.:

- `type_1_predator_A_0`
- `type_1_predator_B_7`

Mapping rule:
- `A` → cooperative policy
- `B` → opportunistic policy

---

### 4. Policy mapping (RLlib)

`policy_mapping_fn` must map agent IDs to different policies:

```python
def policy_mapping_fn(agent_id, *args, **kwargs):
    # Example agent_id: type_1_predator_A_3
    parts = agent_id.split("_")
    type_ = parts[1]
    role = parts[2]
    allele = parts[3]
    return f"type_{type_}_{role}_{allele}"
```

---

### 5. Reproduction (inherit strategy)

When a predator reproduces:
- child inherits **parent strategy label (A or B)**
- no mutation required for baseline test

Example:
```text
type_1_predator_A_5 → child: type_1_predator_A_12
```

This is essential for behavioral evolution.

---

## How to use this file with Codex

1. Save this file as:
   ```text
   docs/behavioral_strategies.md
   ```

2. In VS Code, open Codex and prompt:

   ```text
   Use docs/behavioral_strategies.md as context.
   Implement the cooperative and opportunistic predator strategies
   as scripted baseline controllers in the PredPreyGrass environment.
   Do not change morphology or env mechanics.
   ```

3. Optionally ask Codex to:
   - convert scripted policies into PPO-initialized policies
   - add logging of strategy frequencies over time

---

## Success criterion

You have implemented behavioral evolution if:
- cooperative and opportunistic predators coexist initially
- reproduction changes their relative frequencies
- extinction or coexistence occurs **without changing body parameters**

---

## Scope note

This document intentionally avoids:
- reward shaping
- architectural changes
- evolutionary mutation
- curriculum learning

It defines the **minimal, clean behavioral-evolution test case**.
