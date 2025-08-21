---
id: scaling
title: Rewards scaling in PredPreyGrass MARL
---

One of the most subtle but crucial features in multi-agent reinforcement learning (MARL) is the reward magnitude — especially in environments where rewards are sparse and agents must coordinate to survive. In the custom-built MARL environment simulating predators, prey, and grass on a grid, changing the reproduction reward from 1.0 to 10.0 dramatically altered the course of learning. This section explains why that matters, and what it reveals about reward scaling in co-evolving agent populations.

### The Setup: A Sparse-Reinforcement Ecosystem
In the default environment setup:

- Prey only receive a reward when they reproduce. They get no reward for eating grass, nor for surviving time steps.

- Predators only receive a reward when they reproduce. They get no reward for catching prey, nor for surviving time steps.

- There are no dense rewards, and no reward shaping. Just life, death, and reproduction.

This creates a sparse reward problem: many steps in the simulation provide no reward at all. Only successful reproduction yields any reward. Despite this, stable dynamics emerge: predators learning to catch prey, prey learning to survive and reproduce, and ideally for our project, both populations are coexisting without collapsing. However, success turned out to hinge critically on the size of the reproduction reward.

### When Reward = 10.0: Sparse but Learnable

Simply increasing the reproduction reward to 10.0 — while keeping everything else the same — resulted in striking improvements:

- Agents survived much longer on average.

- Predators and prey began to develop behaviors that looked like pursuit and evasion.

- Reproduction occurred frequently enough to sustain populations.

- The environment began to show dynamic, emergent co-evolution between agent types.

With a sparse reproduction reward of 1.0 it appeared that learnig was poore while training. On the other hand, with a reward of 10.0, even a sparse signal became strong enough to be learned. It allowed early successes (like an agent reproducing) to result in meaningful gradient updates. This is essential in environments with no intermediate reward shaping.

### Why Reward Scaling Matters in Sparse Settings

These results align with known insights from reinforcement learning:

- In sparse-reward environments, rare positive events must produce a signal strong enough to influence policy updates.

- A reward of 1.0 might work well in dense-reward tasks, but in sparse tasks, it can easily get lost in the variance of the episode.

- In PPO specifically, rewards are typically normalized and clipped, meaning that low-magnitude rewards produce tiny advantage values — leading to minimal updates.

In short: reward magnitude is not just a multiplier. It shapes the entire learning dynamics.

### Evaluation of trained policies Confirms the Effect

After training two sets of PPO agents — one with reproduction reward set to 1.0, and one with it set to 10.0 — post-training evaluations under identical conditions were conducted.

- Agents trained with reward = 1.0 often failed to maintain stable populations. Their strategies collapsed, and episodes ended early.

- Agents trained with reward = 10.0 maintained persistent, diverse populations. Different agent speeds emerged and coexisted. Reproduction patterns were sustained.

These results were visible not only in episode length, but also in population graphs, reward traces, and behavioral observations.

### Conclusion: Reward Scale Drives Ecosystem Viability

In an environment with no static targets and no fixed goal, the size of the reward signal controls whether any adaptive behavior emerges at all. In our experiments:

- A reward of 1.0 led to extinction.

- A reward of 10.0 led to open-ended co-evolution and ecological balance.

This finding should be of interest to anyone building MARL environments focused on emergence and adaptation. If rewards are sparse, their magnitudes must be high enough to stand out — not just in theory, but in practice, where stochasticity and delayed returns are the norm.