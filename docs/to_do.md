---
id: to_do
title: To do
sidebar_position: 1
---

- Create training algorithm of competing policies and select 'winner' after each iteration. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automaticly at run time rather than manually after full (10 hour) experiments.

- [2.5]: experiment_1 / experiment are powerfull examples of the Malthusian trap. Record this on site. 

- Fix link in https://github.com/doesburg11/PredPreyGrass/tree/main/src/predpreygrass/rllib/v1_0. Create .md for reward scaling from legacy website.

<details closed>
    <summary>Collapsable menu ></summary>
    - Traditional academic environments
    - [DI-zoo](https://github.com/opendilab/DI-engine#environment-versatility): various decision intelligence demonstrations and benchmark environments with DI-engine.
</details>

- Explore examples: https://github.com/flairox/jaxmarl?tab=readme-ov-file
  - https://raw.githubusercontent.com/FLAIROx/JaxMARL/refs/heads/main/docs/imgs/smax.gif
  - SMAX: https://github.com/FLAIROx/JaxMARL/tree/main/jaxmarl/environments/smax

- Tune for hyperparameter tuning?

- Make flow chart from step function

- can v2_5 be generalized to v1_0?
    - vx_x reduces to a config
    - experiment: vx_x + config_env


- curriculum reward tuning

- Fitness parameters:
    - offspring per agent
    - offspring per agent per energy
- Protocol for storing/retrieving stats per step (outside env: in evaluatio loop)
- Flowcharts Visio-like
    - In Linux?
    - Windows emulator?

- Find a mechanism to limit energy intake for

    - The grass at full 2.0 can regarded as a battery; extra solar power does not increase the capcity of the battery any more.

    - Maybe distinction between solarpower on the one hand which can be transformed to grass (eg. When all grass is zero and the regeneration rate is 0.08. if 100 grass available that soloarpower transforms into 0,08x100 = 8 units per time step (at maximum). On the other hand the real regeneration energy turned into grass energy.

    - The latter needs to be recorded still.

Record for agents to be used in tooltips:

    - Unique ID (other than eg. predator_0, which can be reused)

    - Age
