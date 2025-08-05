---
id: to_do
title: To do
sidebar_position: 1
---
- define solution concept: maximize the episode length of mortal

- Create training algorithm of competing policies and select 'winner' after each iteration. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automaticly at run time rather than manually after full (10 hour) experiments.

- [2.5]: experiment_1 / experiment are powerfull examples of the Malthusian trap. Record this on site. 

- Explore examples: https://github.com/flairox/jaxmarl?tab=readme-ov-file
  - https://raw.githubusercontent.com/FLAIROx/JaxMARL/refs/heads/main/docs/imgs/smax.gif
  - SMAX: https://github.com/FLAIROx/JaxMARL/tree/main/jaxmarl/environments/smax

- Tune for hyperparameter tuning?

- Make flow chart from step function

- curriculum reward tuning

- Fitness parameters:
    - offspring per agent
    - offspring per agent per energy
- Protocol for storing/retrieving stats per step (outside env: in evaluation loop)

Record for agents to be used in tooltips:

    - Age


- Meta learning example RLlib ("learning-to-learn"):
https://github.com/ray-project/ray/blob/master/rllib/examples/algorithms/maml_lr_supervised_learning.py
- curriliculum: https://github.com/ray-project/ray/blob/master/rllib/examples/curriculum/curriculum_learning.py
- curiosity: https://github.com/ray-project/ray/tree/master/rllib/examples/curiosity

Population Based Training
https://arxiv.org/abs/1711.09846

https://deepmind.google/discover/blog/population-based-training-of-neural-networks/

https://docs.ray.io/en/latest/tune/api/doc/ray.tune.schedulers.PopulationBasedTraining.html

https://github.com/ray-project/ray/blob/59aad1997bb649785ffd98f72b9ca9286b340b5b/python/ray/tune/tests/test_trial_scheduler.py#L1056