---
id: solution-concept-ppg
title: The Solution Concept of PredPreyGrass MARL
---

MARL is not a singular problem solving concept. This already has been empasized in  the landamrk paper [If multi-agent learning is the answer, what is the question?. (paper, 2007)](https://people.eecs.berkeley.edu/~russell/classes/cs294/f21/papers/Shoham-2007-what-is-the-question.pdf). In this paper five distinctive "agenda's" have been proposed to classify  most of the MARL related solutions concepts:

1. Computational
2. Descriptive
3. Normative
4. Prescriptive, cooperative
5. Prescriptive, non-cooperative

Our Predator-Prey-Grass MARL project aligns most with the "descriptive" agenda: we aim to use MARL to model (and therefore "describe") human behavior. We hope to find emergent behavior from our MARL experiments which mimic human behavior in the real world. Our goal is to achieve this with as few assumptions as possible. That is, we try to stay away from prescribing agents what to do and what not to do, in order to gain insight into the "true" fundamentals of human behavior. 

A clear cut solution problem is hard to define as there is not an ultimate end goal in which all agents individually reach an optimal solution irrespective of all other agents. So a solution concept as for instance a Nash Equilibirum is not what we are looking for in an ever evolving open ended human behavior spectrum.

Therefore, we are more looking for a *process* solution concept — something like Co-evolutionary Stable State or Open-Ended Dynamic Equilibrium. These recognise that in asymmetric, mutating systems, “solution” means ongoing adaptability, not stasis. 

**Ongoing adaptability solution concept**:

A persistent co-evolutionary dynamic in which predator and prey populations maintain ecological viability while continuously altering their behavioural strategies in response to each other’s adaptations. Formally, a system exhibits ongoing adaptability if, over an extended period:

1. **Ecological persistence** — no agent type experiences sustained extinction (population size > 0 for all types over time). This is true for the major learning agent types "Predator" and "Prey", but not necessarily for mutating sub-types within those species.

2. **Behavioural turnover** — the distribution of strategies or policy parameters for at least one agent type changes over time, such that the similarity between strategies at times t and t+Δt remains below a threshold for sufficiently large Δt.

3. **Mutual responsiveness** — changes in one population’s strategies measurably alter the fitness landscape of the other population(s), preventing convergence to a static equilibrium.


## References

- [If multi-agent learning is the answer, what is the question?. (paper, 2007)](https://people.eecs.berkeley.edu/~russell/classes/cs294/f21/papers/Shoham-2007-what-is-the-question.pdf)
