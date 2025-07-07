---
id: pred-prey-grass-project
title: Predator, Prey, Grass project
---

The [Predator, Prey, Grass project](https://github.com/doesburg11/PredPreyGrass) aims to investigate behavior of multiple agents in a simple closed grid world. Although only partially applicable to modern humans, this could shed light to ancestral human behavior. In the hunter-gatherer period of Homo Sapiens, roughly 10,000 years ago a common setting, humans could be as well be predators as prey. Moreover, the limited availability of grass could be regarded as a proxy for the limited proximal resources for humans down the food chain.

To implement this, a [multi-agent reinforcement learning (MARL)](https://en.wikipedia.org/wiki/Multi-agent_reinforcement_learning) environment is trained using a [Proximal Policy Optimization (PPO)](https://en.wikipedia.org/wiki/Proximal_policy_optimization). Learning agents Predators (red) and Prey (blue) both expend energy moving around, and replenish it by eating. Prey eat Grass (green), and Predators eat Prey if they end up on the same grid cell. In the base case for simplicity, the agents obtain all energy from the eaten Prey of Grass. However, in reality this is much less because the [ecological efficiency](https://en.wikipedia.org/wiki/Ecological_efficiency) is only around 10% in most cases, and certainly not 100%.

Predators die of starvation when their energy is zero, Prey die either of starvation or when being eaten by a Predator. The agents asexually reproduce when energy levels of learning agents rise above a certain threshold by eating. Learning agents, learn to execute movement actions based on their partial observations of the environment to maximize cumulative reward.

<video width="640" height="360" controls>
  <source src="/videos/predpreygrass.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

