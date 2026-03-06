---
id: pbt-config
title: Configuration
---

# Configuration PBT with the Pred-Prey-Grass Environment

## Hyperparameter settings

- "Initialization" -> ```.training(...)``` → defines defaults inside the PPOConfig builder.

- "Reset" -> ```param_space``` → overrides those values when a trial starts.

- "At runtime" -> ```hyperparam_mutations``` → allows them to change later during PBT exploitation/exploration.

That means:

- If you only use ```.training(...)```, your runs are fixed.

- If you add ```param_space```, those ```.training(...)``` values get replaced per trial.

- If you also add ```hyperparam_mutations```, then PBT will mutate them dynamically.

### Example snippets:

```python
.training(
    # These params are tuned from a fixed starting value.
    clip_param=config_ppo["clip_param"],
    lr=config_ppo["lr"],
    entropy_coeff=config_ppo["entropy_coeff"],
    # set safe defaults; will be overridden per-trial
    num_epochs=config_ppo["num_epochs"],
    minibatch_size=config_ppo["minibatch_size"],
    train_batch_size_per_learner=config_ppo["train_batch_size_per_learner"],
)
```
```python
param_space = {
    "algo_config": ppo_config,                # base template
    # ← tunables live at top-level so Tune can sample them
    "lr": tune.choice(config_ppo["pbt_lr_choices"]),
    "clip_param": tune.uniform(*config_ppo["pbt_clip_range"]),
    "entropy_coeff": tune.choice(config_ppo["pbt_entropy_choices"]),
    "num_epochs": tune.choice(config_ppo["pbt_num_epochs_range"]),
    "minibatch_size": tune.choice(config_ppo["pbt_minibatch_choices"]),
    "train_batch_size_per_learner": tune.choice(config_ppo["pbt_train_batch_size_choices"]),
}
```
```python
hyperparam_mutations = {
    "lr": config_ppo["pbt_lr_choices"],
    "clip_param": lambda: random.uniform(*config_ppo["pbt_clip_range"]),
    "entropy_coeff": config_ppo["pbt_entropy_choices"],
    "num_epochs": lambda: random.randint(*config_ppo["pbt_num_epochs_range"]),
    "minibatch_size": lambda: random.choice(config_ppo["pbt_minibatch_choices"]),
    "train_batch_size_per_learner": lambda: random.choice(config_ppo["pbt_train_batch_size_choices"]),
}
```

