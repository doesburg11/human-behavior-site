---
id: overview-marl-ppg
title: MARL used in PredPreyGrass
sidebar_position: 1
---
The **Predator, Prey, Grass project**([PredPreyGrass](https://github.com/doesburg11/PredPreyGrass)) is implemented utilizing [multi-agent reinforcement learning (MARL)](https://en.wikipedia.org/wiki/Multi-agent_reinforcement_learning). The cusomized RLLb multi agent environment is trained using a [Proximal Policy Optimization (PPO)](https://en.wikipedia.org/wiki/Proximal_policy_optimization). 


Learning agents Predators (red) and Prey (blue) both expend energy moving around, and replenish it by eating. Prey eat Grass (green), and Predators eat Prey if they end up on the same grid cell. In the base case for simplicity, the agents obtain all energy from the eaten Prey of Grass. However, in reality usefull energy is not 100% onverted because the [ecological efficiency](https://en.wikipedia.org/wiki/Ecological_efficiency) is only around 10% in most cases. In the configuration files the ecological effciency can be tuned at will.

Predators die of starvation when their energy is zero, Prey die either of starvation or when being eaten by a Predator. The agents asexually reproduce when energy levels of learning agents rise above a certain threshold by eating. Learning agents, learn to execute movement actions based on their partial observations of the environment to maximize cumulative reward. Due to tehe relatvely low ecological effciency founf in nature, ususually food chains are relativley short, not more than five steps ususally. Therefore we believe the implemented PredPreyGrass environment is already a decent absraction from biological reality. 

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/marl-ppg/display-1.jpg" alt="Display 1: Single Agent Reinforcement learning" width="400" />
  <figcaption><strong>Display 1:</strong> Single Agent Reinforcement Learning</figcaption>
</figure>
<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/marl-ppg/display-2.jpg" alt="Display 2: Multi Agent Reinforcement learning" width="400" />
  <figcaption><strong>Display 2:</strong> Multi Agent Reinforcement Learning</figcaption>
</figure>




  




