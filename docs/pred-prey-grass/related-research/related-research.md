---
id: related-research-ppg
title: Related Research
---

# Related Research

Research at the intersection of **multi-agent reinforcement learning (MARL)**, **ecological modeling**, and **open-ended evolution** spans several largely disconnected literatures. The present work builds on foundations in **RL-based predator–prey models**, **agent-based ecology**, and **artificial life**, but differs substantially from existing approaches by integrating **multi-trophic resource dynamics**, **energy-based metabolism**, **lineage-aware reproduction**, and **mutation-driven evolutionary variation** within a unified MARL framework. Below, we summarize the most relevant work across these domains.

## RL-Based Predator–Prey Systems

Predator–prey interactions have long served as testbeds for emergent multi-agent behaviors. Early work focused on rule-based or evolutionary models rather than learning agents, but recent studies have explored the use of deep RL. **Park et al. (2021)** introduced a grid-world predator–prey system in which predators and prey alternately train approximate best-response policies using AlgaeDICE, showing oscillatory population dynamics reminiscent of Lotka–Volterra cycles and simple spatial self-organization. Their model, however, lacks resource flow, energy metabolism, reproduction, or evolutionary processes.

**Wang et al. (2019, 2020)** developed DQN-based predator–prey environments where both species learn behavior policies under adversarial reward structures. While demonstrating co-adaptation and fluctuating population trajectories, these systems employ fixed population sizes, no trophic base, and no ecological constraints such as starvation or reproduction. Similarly, PettingZoo’s *Pursuit* environment and OpenAI’s Multi-Agent Particle Environment (*simple_tag*) frame predator–prey interactions as pursuit-evasion problems, but omit ecological realism, metabolic processes, and population turnover.

The **Vectorized Multi-Agent Simulator (VMAS)** from the Prorok Lab (Bettini et al., 2023) provides highly efficient, differentiable PyTorch-based multi-agent physics tasks (including pursuit/escape scenarios) for MARL benchmarking. VMAS emphasizes batched simulation speed and gradient-based policy learning, but it models short-horizon tasks without trophic structure, resource metabolism, reproduction, or mutation-driven lineage change, making it complementary but not ecological in scope compared with PPG. The RLlib (version 2.2) interface to date (2025-12-07) is not in RLlib new stack (2.40+)

More recent work has examined **cooperative hunting** using deep RL. Notably, **Moreira et al. (2024, eLife)** demonstrated that predators can spontaneously adopt complementary roles (e.g., chaser vs. ambusher) when jointly trained with PPO. While this constitutes an important step toward biologically inspired multi-agent behavior, the task is episodic, non-evolutionary, and lacks resource layers, trophic cascades, or multi-generational dynamics. In contrast, PPG allows cooperative or competitive behaviors to emerge within a continuously evolving ecological–evolutionary system.

## Agent-Based Ecological and Evolutionary Models

Agent-based ecology has extensively modeled predator–prey–resource systems. Classical examples include the NetLogo *Wolf–Sheep Predation* model, which incorporates energy budgets, reproduction, starvation, and a renewable grass layer. Such models capture essential ecological mechanisms but lack adaptive behavior, as agents follow fixed rules rather than learning policies. Extensions with simple genetic evolution exist, but they generally evolve fixed behavioral parameters rather than learned policies.

More sophisticated ecological simulators—such as MESA-based ecosystems or MASON predator–prey models—provide richer spatial and demographic dynamics, yet similarly rely on hand-coded behavioral rules. These frameworks demonstrate population cycles, trophic cascades, dispersers strategies, and niche competition, but do not incorporate RL, neural policy learning, or large-scale multi-policy coevolution.

The ecological realism of PPG is most closely related to this line of work, yet it departs from it fundamentally by allowing **behavioral strategies to be learned** through deep MARL, while reproduction and mutation drive **population-level evolutionary change** across many generations.

## Artificial Life, Digital Evolution, and Open-Ended Learning

Artificial life platforms such as **Avida**, **Tierra**, and **Nanopond** model evolutionary processes in silico using reproduction, mutation, and selection acting on digital genomes. These systems allow lineage tracking, open-ended adaptation, and emergent ecological structure, but agents are not typically embodied in spatial predator–prey environments nor trained with RL. Instead, behaviors result from instruction-level machine code evolution, making these systems evolutionarily rich but behaviorally opaque.

Modern open-ended learning systems—such as **DeepMind’s XLand**, **POET**, or **AlphaEvolve-style evolutionary MARL**—investigate environments where multi-agent interactions or environmental generators drive continual skill innovation. These systems emphasize behavioral diversity, population-level learning, and the emergence of new capabilities. However, they lack biological realism: organisms do not metabolize resources, do not exist within trophic structures, and do not evolve under ecological constraints. Evolution occurs at the policy or task level, not at the organismal level within an ecosystem.

The PredPreyGrass environment bridges artificial life and MARL by enabling **multi-generational adaptation of learned policies**, **mutation of agent types**, and **lineage-based dynamics** within a fully embodied ecological system. Unlike prior work, behavioral adaptation (via RL) and evolutionary adaptation (via reproduction + mutation) occur simultaneously, producing a coupled eco-evolutionary process rarely explored in machine learning.

## Positioning of the Present Work

Prior research has explored predator–prey interactions, cooperative hunting, multi-agent coordination, ecological simulations, digital evolution, and open-ended RL. However, no existing framework combines:

1. **A three-level trophic ecology** (grass → prey → predators)
2. **Energy-based metabolism and resource flow**
3. **Birth, death, reproduction, and multi-generational population turnover**
4. **Mutation-driven lineage diversification**
5. **Multiple behavioral “species” or type variants co-evolving in the same environment**
6. **Deep multi-agent RL for within-lifetime behavioral adaptation**
7. **Long-term open-ended eco-evolutionary dynamics**

The PredPreyGrass project therefore occupies a unique position—**a genuinely ecological MARL platform** that supports both **behavioral learning** and **evolutionary adaptation**. To our knowledge, no prior MARL or artificial life system incorporates this combination of trophic structure, metabolism, reproduction, mutation, and lineages at scale. This work thus extends existing models toward a unified simulation of learning, ecology, and evolution.

**Comparison: Ecology × MARL Frameworks**
| Dimension                  | **PredPreyGrass (PPG)**        | **VMAS**                    | **Melting Pot**             |
| -------------------------- | ------------------------------ | --------------------------- | --------------------------- |
| Primary focus              | Ecological dynamics + learning | Scalable MARL benchmarking  | Social dilemmas & norms     |
| Deep learning              | ✅ PPO / MAPPO (RLlib)          | ✅ PPO / MAPPO (PyTorch)     | ✅ PPO / DQN-style           |
| Multi-agent RL             | ✅                              | ✅                           | ✅                           |
| Population size            | Variable, endogenous           | Fixed                       | Fixed                       |
| Birth & reproduction       | ✅                              | ❌                           | ❌                           |
| Death & extinction         | ✅ (central)                    | ❌                           | ❌                           |
| Energy budgets             | ✅                              | ❌                           | ❌                           |
| Resource metabolism        | ✅ (grass → prey → predator)    | ❌                           | ⚠️ (abstract resources)     |
| Predator–prey relations    | ✅ explicit                     | ⚠️ toy (e.g. simple_tag)    | ❌                           |
| Cooperation pressure       | Emergent, ecological           | Reward-engineered           | Game-theoretic              |
| Costly cooperation         | ✅ (energy, risk, death)        | ⚠️ (reward trade-offs only) | ⚠️                          |
| Exploitation possible      | ✅                              | ✅                           | ✅                           |
| Exploiters can go extinct  | ✅                              | ❌                           | ❌                           |
| Lineages / generations     | ✅                              | ❌                           | ❌                           |
| Co-evolution               | ✅ (agent types, traits)        | ❌                           | ❌                           |
| Open-ended dynamics        | ✅                              | ❌                           | ❌                           |
| Environment non-stationary | ✅ (by population dynamics)     | ❌                           | ❌                           |
| Centralized critic         | Optional                       | ✅                           | Varies                      |
| External reward shaping    | Minimal                        | Heavy                       | Heavy                       |
| Norms / conventions        | Implicit, learned              | Implicit                    | Explicitly studied          |
| Typical episode ending     | Ecosystem collapse or horizon  | Fixed horizon               | Fixed horizon               |
| Main research question     | *Which behaviors survive?*     | *How do agents coordinate?* | *When do agents cooperate?* |


**Comparison: Ecology × MARL Frameworks**
| Dimension                  | **PredPreyGrass (PPG)**        | **VMAS**                    | **Melting Pot**             | **NetLogo**                | **MASON**                    | **POET**                    |
| -------------------------- | ------------------------------ | --------------------------- | --------------------------- | -------------------------- | ---------------------------- | --------------------------- |
| Primary focus              | Ecological dynamics + learning | Scalable MARL benchmarking  | Social dilemmas & norms     | Agent-based modeling (ABM) | Large-scale ABM              | Open-ended curriculum       |
| Deep learning              | ✅ PPO / MAPPO (RLlib)          | ✅ PPO / MAPPO (PyTorch)     | ✅ PPO / DQN-style           | ❌                          | ❌                            | ⚠️ (often ES / RL hybrids)  |
| Multi-agent RL             | ✅                              | ✅                           | ✅                           | ❌                          | ❌                            | ⚠️                          |
| Population size            | Variable, endogenous           | Fixed                       | Fixed                       | Variable                   | Variable                     | Fixed per env               |
| Birth & reproduction       | ✅                              | ❌                           | ❌                           | ✅                          | ✅                            | ❌                           |
| Death & extinction         | ✅ (central)                    | ❌                           | ❌                           | ✅                          | ✅                            | ❌                           |
| Energy budgets             | ✅                              | ❌                           | ❌                           | ✅ (common pattern)         | ✅                            | ❌                           |
| Resource metabolism        | ✅ (grass → prey → predator)    | ❌                           | ⚠️ (abstract)               | ✅                          | ✅                            | ❌                           |
| Predator–prey relations    | ✅ explicit                     | ⚠️ toy                      | ❌                           | ✅ classic                  | ✅ classic                    | ❌                           |
| Cooperation pressure       | Emergent, ecological           | Reward-engineered           | Game-theoretic              | Rule-based / emergent      | Rule-based / emergent        | Task-driven                 |
| Costly cooperation         | ✅                              | ⚠️                          | ⚠️                          | ✅                          | ✅                            | ❌                           |
| Exploitation possible      | ✅                              | ✅                           | ✅                           | ✅                          | ✅                            | ⚠️                          |
| Exploiters can go extinct  | ✅                              | ❌                           | ❌                           | ✅                          | ✅                            | ❌                           |
| Lineages / generations     | ✅                              | ❌                           | ❌                           | ✅                          | ✅                            | ❌                           |
| Co-evolution               | ✅                              | ❌                           | ❌                           | ⚠️ (manual)                | ⚠️ (manual)                  | ✅ (env–agent)               |
| Open-ended dynamics        | ✅                              | ❌                           | ❌                           | ⚠️                         | ⚠️                           | ✅                           |
| Environment non-stationary | ✅ (endogenous)                 | ❌                           | ❌                           | ✅                          | ✅                            | ✅                           |
| Centralized critic         | Optional                       | ✅                           | Varies                      | ❌                          | ❌                            | ❌                           |
| External reward shaping    | Minimal                        | Heavy                       | Heavy                       | ❌                          | ❌                            | Heavy                       |
| Norms / conventions        | Implicit                       | Implicit                    | Explicit focus              | Emergent                   | Emergent                     | ❌                           |
| Typical episode ending     | Ecosystem collapse / horizon   | Fixed horizon               | Fixed horizon               | User-defined               | User-defined                 | Curriculum shift            |
| Main research question     | *Which behaviors survive?*     | *How do agents coordinate?* | *When do agents cooperate?* | *What patterns emerge?*    | *How do populations evolve?* | *How do skills accumulate?* |


## References

Predator–Prey MARL and Cooperative Hunting

Moreira, C., Wydmuch, M., Zawalski, M., Kwiatkowski, M., & Jaśkowski, W. (2024).
Collaborative hunting in artificial agents with deep reinforcement learning.
eLife, 13, RP85694.
https://doi.org/10.7554/eLife.85694

Park, J., Lee, J., Kim, T., Ahn, I., & Park, J. (2021).
Co-evolution of predator–prey ecosystems by reinforcement learning agents.
Entropy, 23(4), 461.
https://doi.org/10.3390/e23040461

Wang, X., Cheng, J., & Wang, L. (2019).
Deep-reinforcement-learning-based co-evolution in a predator–prey system.
Entropy, 21(8), 773.
https://doi.org/10.3390/e21080773

Wang, X., Cheng, J., & Wang, L. (2020).
A reinforcement learning-based predator–prey model.
Ecological Complexity, 42, 100815.
https://doi.org/10.1016/j.ecocom.2020.100815

Terry, J. K., Black, B., Jayakumar, M., et al. (2021).
PettingZoo: Gym for Multi-Agent Reinforcement Learning.
NeurIPS 2021 Track on Datasets and Benchmarks.
https://pettingzoo.farama.org/

Mordatch, I., & Abbeel, P. (2017).
Emergence of grounded compositional language in multi-agent populations.
AAAI Conference on Artificial Intelligence.
(Related to the Multi-Agent Particle Environment line of work.)
https://arxiv.org/abs/1703.04908

Zheng, L., Yang, J., Cai, H., Zhou, M., Zhang, W., Wang, J., & Yu, Y. (2017).
MAgent: A Many-Agent Reinforcement Learning Platform for Artificial Collective Intelligence.
arXiv:1712.00600.
https://arxiv.org/abs/1712.00600

Prorok, A., De Magistris, G., & Prorok Lab. (2023).
Vectorized Multi-Agent Simulator (VMAS).
GitHub repository.
https://github.com/proroklab/VectorizedMultiAgentSimulator

Bettini, G., Sakawa, Y., Liu, S., & Prorok, A. (2023).
VMAS: A Vectorized Multi-Agent Simulator for Scalable Multi-Agent Reinforcement Learning.
In Proceedings of the 2023 International Conference on Autonomous Agents and Multiagent Systems (AAMAS).
https://github.com/proroklab/VectorizedMultiAgentSimulator

Agent-Based Ecology & Predator–Prey Modeling

Wilensky, U. (1997).
NetLogo Wolf–Sheep Predation Model.
Northwestern University Center for Connected Learning and Computer-Based Modeling.
https://ccl.northwestern.edu/netlogo/models/WolfSheepPredation

Railsback, S. F., & Grimm, V. (2011).
Agent-Based and Individual-Based Modeling: A Practical Introduction.
Princeton University Press.
ISBN: 9780691143369

North, M. J., Collier, N. T., & Vos, J. R. (2006).
Experiences creating three implementations of the Repast agent modeling toolkit.
ACM Transactions on Modeling and Computer Simulation, 16(1), 1–25.
https://doi.org/10.1145/1122012.1122013

Artificial Life, Digital Evolution & Open-Ended Learning

Ofria, C., & Wilke, C. O. (2004).
Avida: A Software Platform for Research in Computational Evolutionary Biology.
Artificial Life, 10(2), 191–229.
https://doi.org/10.1162/106454604773563612

https://avida.dev/

Ray, T. S. (1991).
An approach to the synthesis of life.
In C. Langton et al. (Eds.), Artificial Life II (pp. 371–408).
Addison-Wesley.
(Foundational description of Tierra digital organisms.)

Taylor, T., Bedau, M. A., Channon, A., et al. (2016).
Open-Ended Evolution: Perspectives from the ALife Community.
Artificial Life, 22(3), 408–423.
https://doi.org/10.1162/ARTL_a_00210

Ecoffet, A., Huizinga, J., Lehman, J., Stanley, K. O., & Clune, J. (2021).
First return, then explore.
Nature, 590, 580–586.
(Describes POET and curiosity-driven open-endedness.)
https://doi.org/10.1038/s41586-021-03350-5

DeepMind Team. (2021).
Open-ended learning leads to generally capable agents.
Nature, 600, 595–603.
https://doi.org/10.1038/s41586-021-04233-4

Evolution Strategies, Neuroevolution, and Population-Based Training

Stanley, K. O., & Miikkulainen, R. (2002).
Evolving neural networks through augmenting topologies.
Evolutionary Computation, 10(2), 99–127.
(NEAT.)
https://doi.org/10.1162/106365602320169811

Salimans, T., Ho, J., Chen, X., Sidor, S., & Sutskever, I. (2017).
Evolution Strategies as a Scalable Alternative to Reinforcement Learning.
arXiv:1703.03864.
https://arxiv.org/abs/1703.03864

Jaderberg, M., Dalibard, V., Osindero, S., et al. (2017).
Population Based Training of Neural Networks.
arXiv:1711.09846.
https://arxiv.org/abs/1711.09846

Multi-Agent RL Foundations

Silver, D., et al. (2016).
Mastering the game of Go with deep neural networks and tree search.
Nature, 529, 484–489.
https://doi.org/10.1038/nature16961

Foerster, J., Chen, R. Y., Al-Shedivat, M., et al. (2018).
Counterfactual Multi-Agent Policy Gradients.
AAAI Conference on Artificial Intelligence.
https://arxiv.org/abs/1705.08926
