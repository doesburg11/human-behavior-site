---
id: to_do
title: To do
sidebar_position: 1
---

### Dynamic training

- Create training algorithm of competing policies and select 'winner' after each iteration/a number of iterations. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automaticly at run time rather than manually after full (10 hour) experiments.
Determine succes:
  - fitness metrics
  - ability to co-adapt


- curriculum reward tuning

- Fitness parameters:
    - offspring per agent
    - offspring per agent per energy
- Protocol for storing/retrieving stats per step (outside env: in evaluation loop)

### Examples to try out

- Meta learning example RLlib ("learning-to-learn"):
https://github.com/ray-project/ray/blob/master/rllib/examples/algorithms/maml_lr_supervised_learning.py
- curriliculum: https://github.com/ray-project/ray/blob/master/rllib/examples/curriculum/curriculum_learning.py
- curiosity: https://github.com/ray-project/ray/tree/master/rllib/examples/curiosity

- Explore examples: https://github.com/flairox/jaxmarl?tab=readme-ov-file
  - https://raw.githubusercontent.com/FLAIROx/JaxMARL/refs/heads/main/docs/imgs/smax.gif
  - SMAX: https://github.com/FLAIROx/JaxMARL/tree/main/jaxmarl/environments/smax


### Envrionment enhancements
- Male & Female reproduction instead of asexual reproduction
- Build wall or move wall
- Adding water/rivers

### Improve network
- ```python check for netter network:
        model_config={
            "conv_filters": [
                [16, [3, 3], 1],
                [32, [3, 3], 1],
                [64, [3, 3], 1],
            ],
        }
  ```
- the network is now adjustable to the observation range. was not effectively tuned for observation_range = 9 (for Prey)
- TODO: test experiment"_network_tuning" on HBP computer 
- change config_ppo_gpu
  - batch_size_per_earner-> batch_size
  - adjust other scripts? pbt? maybe externalize build_policy_spec?

  ### Experiments

- Tuning hyperparameters and env parameters simultaneously (see chat)

- max_steps_per_episode: 
  For policy learning performance: 500–2000 steps per episode is a common sweet spot in multi-agent RL — long enough for interactions to unfold, short enough for PPO to assign credit.

  For open-ended co-evolution (your case): you might intentionally want longer episodes (e.g. 2000–5000) so emergent dynamics have time to play out, even if training is slower.

  A good trick is to curriculum the horizon:

  Start short (e.g. 500–1000) → agents learn basic survival.

  Gradually increase (e.g. +500 every N iterations) → expose them to longer ecological timescales.






