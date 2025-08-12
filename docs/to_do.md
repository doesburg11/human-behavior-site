---
id: to_do
title: To do
sidebar_position: 1
---
- Testing Red Queen hypothesis --> Positive
- Implement Population Based Training from Deepmind (2017).
- Hyperparameter search.


- Create training algorithm of competing policies and select 'winner' after each iteration. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automaticly at run time rather than manually after full (10 hour) experiments.


- Explore examples: https://github.com/flairox/jaxmarl?tab=readme-ov-file
  - https://raw.githubusercontent.com/FLAIROx/JaxMARL/refs/heads/main/docs/imgs/smax.gif
  - SMAX: https://github.com/FLAIROx/JaxMARL/tree/main/jaxmarl/environments/smax

- curriculum reward tuning

- Fitness parameters:
    - offspring per agent
    - offspring per agent per energy
- Protocol for storing/retrieving stats per step (outside env: in evaluation loop)

- Meta learning example RLlib ("learning-to-learn"):
https://github.com/ray-project/ray/blob/master/rllib/examples/algorithms/maml_lr_supervised_learning.py
- curriliculum: https://github.com/ray-project/ray/blob/master/rllib/examples/curriculum/curriculum_learning.py
- curiosity: https://github.com/ray-project/ray/tree/master/rllib/examples/curiosity

