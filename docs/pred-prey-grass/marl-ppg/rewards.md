---
id: rewards
title: Rewards in PredPreyGrass MARL
---
Rewards play a pivitoal rol in reinforcement learning (RL). Although RL is seen as a fundamental diferent AI paradigm compared to supervized learning, rewards are the supervized elements in RL. Upfront, the designer needs to shape the reward structuren, inevitably leading to bias nd subjectivity,

In order to reduce this subjectivity, our base configuration has a reward structure which has been made as minimal (sparse) as possible. Both Predators and Prey agents agents only receive a reward when reproducing in the base configuration. This sparse reward structure leads to interesting and sustainable results, without nudging agents with other intermediate reward like reward for eating or rewards for stepping. After training agents learn that to reproduce they have to move and have to eat, because not doing so makes agents exposed to starvation and wil not be optimal in scoring reward through reproducing. Reproducing occurs for both Preadtors and Prey when their energy leveel exceeds a certain treshold. 

All in all, it appears that rewarding reproduction only, already results in emerging behavior like chasing prey for predators, evading predators for prey, while at the same time also cooperating an competing behaviors can be observed.