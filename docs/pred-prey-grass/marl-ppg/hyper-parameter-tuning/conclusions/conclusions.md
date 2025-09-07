---
id: tuning-conclusions-ppg
title: Conclusions Hyper Parameter Tuning
---
We have extensively tried to tune the hyper parameters of the Predator-Prey-Grass PPO solution model. However, we did not find improvements in the reward curves which significantly exceeded our [default hyper parameter configuration](https://humanbehaviorpatterns.org/pred-prey-grass/marl-ppg/hyper-parameter-tuning/tuning-ppg).

- We tried searching for optimal `num_epochs`. [We found some wall time improvement, but at the expense of mean rewards](https://humanbehaviorpatterns.org/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/)
- We tried 
