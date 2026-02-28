---
id: to_do
title: To do
sidebar_position: 99
---

### on top of display 1 at overview 
- `<=Nature===========Nurture=>`

### display 2
- point out the RL bit and the evolutionary bit in the display

### Brainstorming

- "The Inevitablity of Selfishness"
- "Cooperation is not trivial. Competition is intuitivly more sensible due to the inevitability of selfishness"

### [X]Cooperation by bundled forces of predators
- Predators can eat if the predators enters the Moore neighborhood of a Prey
- It can only eat if it has a higher energy level than the Prey
- If more Predators ar in the Moore neighborhood, it can eat the Prey only if their cumulative energy is greater or equal than the Prey. If so: the divide the energy proportionally to their own energy.
- "When you can't do it alone you must do it together"

### SSD - sequential social dilemma

- iterative tit-for-tat
- always end defecting if finite ending
- MARL training with random ending periods (max_steps), might result in cooperating


### [ ] Failed attack cost energy Predators 
- proportionally (to own energy level) punish failed Predators 

### [ ] Dividing prey
- Proportionally
- Equally


### [ ] Mammoths

- Make Prey with behaving as Mamoths
  - [v] Larger energy than Predators
  - [v] Fewer in numbers than Predator
  - [ ] Maybe, the sum of energy humans can be smaller (a fraction), because of more intelligence/tool use)

### [ ] Mixed -Stah Hunt
- Have to types of Prey: Mammoths and Deer
  - Experiment for coevolution
  - https://chatgpt.com/share/694e5758-e21c-8008-87d9-1c01dc66cf1b
  - https://en.wikipedia.org/wiki/Stag_hunt

### Macro-level energy
- Add it to the file which is already in place: energy_by_type.json (created by evaluate_......_debug.py)
- Substract cumulative decay energy Predator and Prey per step (homeostatic energy)
- Add cumulative photosynthesis energy from grass


### layered cooperationn in SocialBehavior
- Marl Book example
- Display Maslow's Pyramid and describe project from bottom to top:
- First layer: PredatorPreyGrass project. Typical for the first layer, physical need (eeating), survival an reproduction.
- Second layer: social needs. Need to corporate 


### Dynamic training

- Create training algorithm of competing policies and select 'winner' after each iteration/a number of iterations. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automatically at run time rather than manually after full (10 hour) experiments.
Determine success:
  - fitness metrics
  - ability to co-adapt

- curriculum reward tuning



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


### Pranjal 2-12-2025

- Communication: leave ant trace (ant colony/lenia), also keep previous state in Observation?
- www.talkRL.com
- Reshape Field of Vision for Predators; only into the direction of moiving? In that way Prey can hide more easily from Predators?
- Is the existence of a prolonged episode betweeen predators and prey not an emergence of cooperation?

### Research shortlist: evolution + birth/death + MARL

- Malthusian Reinforcement Learning (Leibo et al., 2018/2019): population pressure and ecology-linked MARL adaptation.  
  https://arxiv.org/abs/1812.07019  
  https://www.ifaamas.org/Proceedings/aamas2019/pdfs/p1099.pdf
- Neural MMO (Suarez et al., 2019; Neural MMO 2.0, 2021): persistent many-agent worlds with spawn/death and resource pressure.  
  https://arxiv.org/abs/1903.00784  
  https://arxiv.org/abs/2110.07594
- Evolutionary Population Curriculum (2020): evolutionary selection over policy populations in large-scale MARL.  
  https://arxiv.org/abs/2003.10423
- Evolutionary MARL in Group Social Dilemmas (Chaos, 2025): evolutionary pressure on RL traits in social dilemmas.  
  https://pubmed.ncbi.nlm.nih.gov/39937196/
- Iterated + Evolutionary Games with MARL (Nature Communications, 2025): MARL-discovered strategies tested in evolving populations.  
  https://www.nature.com/articles/s41467-025-67178-6
- Neural Population Learning beyond Symmetric Zero-Sum Games (AAMAS 2024): population-level selection/equilibrium in general-sum MARL.  
  https://deepmind.google/research/publications/24820/
