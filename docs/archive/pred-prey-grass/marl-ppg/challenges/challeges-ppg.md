---
id: challenges-ppg
title: Challenges of Multi-Agent Reinforcement Learning (MARL) in Predator-Prey-Grass
sidebar_position: 1
---

Although a promissing tool, MARL faces many challenges. Also implementing the **Predator-Prey-Grass (PPG)** environment highlights many of the core challenges of MARL. Below, some are listed in general.

---

## 1. Non-stationarity
Non-stationarity is severe in PPG because every agent’s behavior shifts the effective environment of all others

* In PPG, prey and predators are **constantly adapting**.
* From the predator’s perspective, the environment keeps changing because prey behaviors evolve (and vice versa).
* This makes it very hard for a policy to converge — what works against today’s prey may fail tomorrow.
* Mutations, in the case of `mutating_agents`. Each reproduction event has a chance to mutate type (from type-1 ↔ type-2).This means the environment’s population composition is constantly changing. A predator that learns to exploit type-1 prey suddenly faces mostly type-2 prey later.
* Ecosystem feedback: Grass regeneration, prey eating, and predator hunting all feed back into each other:
    * If prey overshoot grass consumption, predators starve even if their hunting skill is fine.
    * If predators become too efficient, prey collapse, which then kills predators. Each population’s learning changes the “rules of survival” for the others in real time.
* Masking of observations, in the case of `walls_occlusion` & LOS (Line-Of-Sight) masking. Non-stationarity is worsened by masking of observations. A predator may learn a policy assuming prey are always visible in range, but then walls block visibility and shift the effective dynamics. The environment seen by the agent is constantly changing as agents and walls interact.
* Training instability: Because RLlib ties policies to agent groups (via policy_mapping_fn), each group’s distribution of experiences changes as population counts fluctuate. This makes the replay buffer distribution highly non-stationary, destabilizing PPO updates.
---

## 2. Scalability and Combinatorial Explosion

* Each additional prey or predator increases the **joint action space**.
* With multiple speed types (e.g., speed-1 vs speed-2 predators), the coordination problem explodes.
* Exploration and training time grow rapidly with population size.

---

## 3. Credit Assignment

* When prey survive, is it because of **their evasive moves** or because predators made mistakes?
* When predators succeed, which predator’s chase was decisive?
* Without good credit assignment, agents may learn misleading strategies (e.g., prey staying still if predators happen to ignore them).

---

## 4. Coordination and Equilibria

* Predators may need to **coordinate to corner prey**.
* Prey may evolve **group-level survival strategies** (clustering, dispersal).
* The system may fall into **suboptimal equilibria**, such as predators chasing grass instead of prey, or prey overexploiting grass and starving.

---

## 5. Exploration

* Random exploration often fails in PPG.
* Example: a predator randomly moving may never experience coordinated hunting.
* Prey may never discover evasive strategies if they don’t “stumble upon” predator encounters often enough.
* Coordinated exploration is necessary but difficult to achieve.

---

## 6. Partial Observability

* Each agent sees only a **local observation window**.
* Prey might not know if predators are lurking just outside the range.
* This makes PPG effectively a **Dec-POMDP**, which is very hard to solve.
* Agents must infer hidden state or develop behaviors that hedge against uncertainty.

---

## 7. Communication and Information Sharing

* In theory, predators could benefit from signaling (“prey spotted!”), or prey from alarm calls.
* But in PPG, there is **no explicit communication channel**, so coordination must emerge through behavior.
* This limits possible strategies and forces implicit communication through movement patterns.

---

## 8. Heterogeneity

* Our advanced configuration is making use of **heterogeneous agents**:

  * Speed-1 vs speed-2 predators.
  * Speed-1 vs speed-2 prey.
* This creates asymmetric challenges: fast predators may dominate unless slower types specialize (e.g., ambush, endurance).
* Balancing heterogeneity is key to long-term dynamics.

---

## 9. Stability and Convergence

* Predator-prey cycles naturally resemble **Lotka-Volterra oscillations**.
* Training can collapse if one population goes extinct (predators starve, prey overpopulate, or grass vanishes).
* Ensuring stability over long runs is difficult.

---

## 10. Evaluation and Metrics

* Success is not just about “maximizing episode reward.”
* In PPG, you care about **ecosystem persistence** (avoiding collapse).
* Standard reward curves may not capture this.
* Population balance, survival rates, and diversity of strategies become better evaluation metrics.

---

## 11. Open-endedness and Co-evolution

* The PPG setup naturally supports **open-ended Red Queen dynamics**:

  * Predators get faster → prey evolve better evasion → grass pressure changes dynamics → cycle continues.
* The challenge is **avoiding stagnation or extinction** while keeping adaptation alive.
* Designing the right mutation/selection mechanisms is crucial to prevent collapse and maintain diversity.

---

## Summary

In Predator-Prey-Grass, MARL challenges manifest as:

* **Non-stationary learning dynamics** (agents adapt to each other).
* **Scalability** issues with larger populations.
* **Credit assignment** difficulties in survival and hunting.
* **Coordination requirements** for both predators and prey.
* **Exploration struggles** due to sparse opportunities for successful behaviors.
* **Partial observability**, forcing agents to hedge against uncertainty.
* **Heterogeneity**, making balance and specialization necessary.
* **Stability problems**, with frequent extinction risks.
* **Evaluation challenges**, since reward alone doesn’t reflect ecosystem health.
* **Open-ended dynamics**, where ongoing adaptation (Red Queen effect) is the true “solution concept.”

---
