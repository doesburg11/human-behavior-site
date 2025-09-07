---
id: tuning-conclusions-ppg
title: Conclusions Hyper Parameter Tuning
---
We have extensively tried to tune the hyper parameters of the Predator-Prey-Grass PPO solution model. 

We investigated:

- [searching for optimal `num_epochs`](https://humanbehaviorpatterns.org/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/)

- [Optuna with ASHA Pruning](https://humanbehaviorpatterns.org/pred-prey-grass/marl-ppg/hyper-parameter-tuning/optuna/)

- [Population Based Training](https://humanbehaviorpatterns.org/pred-prey-grass/marl-ppg/hyper-parameter-tuning/pbt-overview)

However, we did not find improvements in the reward curves which significantly exceeded our [default hyper parameter configuration](https://humanbehaviorpatterns.org/pred-prey-grass/marl-ppg/hyper-parameter-tuning/tuning-ppg). That probably tells us the default was already pretty well tuned. That could be a combination of the RLlib's default parameters which we initially utilized and some hand picked tuning afterwards. The defaults of RLlib obviously have been the product of some overall tuning by the developers beforehand and apparently are also a reasonable space for our Predator-Prey-Grass solution. 