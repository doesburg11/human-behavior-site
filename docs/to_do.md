---
id: to_do
title: To do
sidebar_position: 1
---
Display Maslow's Pyramid and describe project from bottom to top:
- First layer: PredatorPreyGrass project. Typical for the first layer, physical need (eeating), survival an reproduction.
- Second layer: social needs. Need to corporate 


### Dynamic training

- Create training algorithm of competing policies and select 'winner' after each iteration/a number of iterations. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automatically at run time rather than manually after full (10 hour) experiments.
Determine success:
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
- curriculum: https://github.com/ray-project/ray/blob/master/rllib/examples/curriculum/curriculum_learning.py
- curiosity: https://github.com/ray-project/ray/tree/master/rllib/examples/curiosity

- Explore examples: https://github.com/flairox/jaxmarl?tab=readme-ov-file
  - https://raw.githubusercontent.com/FLAIROx/JaxMARL/refs/heads/main/docs/imgs/smax.gif
  - SMAX: https://github.com/FLAIROx/JaxMARL/tree/main/jaxmarl/environments/smax


### Environment enhancements
- Male & Female reproduction instead of asexual reproduction
- Build wall or move wall
- Adding water/rivers

### Improve network
- ```python check for better network:
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

  ### Experiments

- Tuning hyperparameters and env parameters simultaneously (see chat)

- max_steps_per_episode: 
  For policy learning performance: 500–2000 steps per episode is a common sweet spot in multi-agent RL — long enough for interactions to unfold, short enough for PPO to assign credit.

  For open-ended co-evolution (your case): you might intentionally want longer episodes (e.g. 2000–5000) so emergent dynamics have time to play out, even if training is slower.

  A good trick is to curriculum the horizon:

  Start short (e.g. 500–1000) → agents learn basic survival.

  Gradually increase (e.g. +500 every N iterations) → expose them to longer ecological timescales.

  “works-in-practice” plan for your PredPreyGrass run, plus what to tweak as you lengthen episodes.

  ## Recommended episode horizon + hyperparameters (curriculum)

  Start shorter for stability/throughput, then stretch to let eco-dynamics (booms, busts, Red-Queen) unfold.

  **Phase A (bootstrap)**

  * `max_steps = 1_000`
  * `gamma = 0.995` (effective credit horizon ≈ 1/(1−γ) ≈ **200** steps)
  * `lambda_ (GAE) = 0.95–0.97`

  **Phase B (mid)**

  * `max_steps = 2_000–3_000`
  * `gamma = 0.997–0.998` (horizon ≈ **333–500**)
  * `lambda_ = 0.96–0.97`

  **Phase C (long-term dynamics)**

  * `max_steps = 4_000–5_000`
  * `gamma = 0.998–0.999` (horizon ≈ **500–1 000**)
  * `lambda_ = 0.97`

  Why that mapping? PPO’s useful credit horizon is \~1/(1−γ). As you increase `max_steps`, you raise `γ` so actions can “see” far enough ahead without making variance explode.

  > Remember: in your env, if `max_steps` isn’t set in the config, it silently defaults to **10 000**—so set it explicitly to avoid accidental long runs.&#x20;

  ## Batch/throughput knobs to adjust as episodes get longer

  Keep \~**4–10 episodes per PPO iteration** so you still get decent reset diversity:

  * **train\_batch\_size**: roughly `episodes_per_iter × max_steps`.
    Example: at `max_steps=1_000`, use `8_000–16_000`. When you move to `max_steps=3_000`, bump toward `24_000–48_000`.
  * **rollout\_fragment\_length**: increase with horizon so GAE has longer contiguous fragments (e.g., 200 → 400 → 800).
  * **num\_envs\_per\_env\_runner**: raise a bit as episodes lengthen to maintain sampler throughput.
  * **KL/clip**: leave defaults unless you see instability; longer horizons often benefit from slightly smaller learning rate rather than big clip/kl changes.

  ## When to stop stretching episodes

  * If `timing/iter_minutes` balloons or TensorBoard curves update too slowly, hold the current `max_steps` for a while.
  * If you see extinction before the cap, longer episodes won’t help—tune ecology (e.g., energy gains/losses) instead.

  ## Make available the BHP archive in a repository

  
  ## LT-goal acquire more wealth as a population
  * Energy as a proxy of wealth
  * Only the top 10% of energy reproduces?
  * Escaping the Malthusian trap

  ### Integrate Dynamic Field Theory 
  - Wrapper around brain
  - Visualize first!!!

  ### Posting on the linkedin The Behavior Patterns Project?

  ### The Malthusian Trap in a Predator–Prey Co-Evolutionary System
  - Limit population size of predators or prey; is that beneficial compared to unbounded reproduction?
  - [2.5]: experiment_1 / experiment are powerfull examples of the Malthusian trap. Record this on site. Create a "Malthusian Trap" 


