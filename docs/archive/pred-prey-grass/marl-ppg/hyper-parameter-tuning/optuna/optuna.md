---
id: optuna-ppg
title: Optuna with ASHA Pruning
---
# Optuna with ASHA Pruning

This experiment uses **Optuna** as the hyperparameter search algorithm, combined with **ASHA (Asynchronous Successive Halving Algorithm)** as the pruning scheduler. The setup allows us to explore a wide hyperparameter space, while quickly eliminating poorly performing trials to save compute.

---

## Process Overview

1. **Hyperparameter Search (Optuna)**
   - The search space is defined around PPO’s learning rate (`lr`) and number of epochs (`num_epochs`).
   - Optuna suggests new parameter combinations within:
     - `lr`: sampled from a log-uniform range (`9e-5` to `1.3e-4`)
     - `num_epochs`: sampled from a discrete uniform range (`22` to `30` in steps of 2)
   - These candidate configurations are passed to Ray Tune.

2. **Pruning Scheduler (ASHA)**
   - ASHA evaluates all trials asynchronously.
   - Trials start with a **grace period** of 40 iterations (no pruning).
   - After this period, trials that perform poorly on the metric `score_pred` are **stopped early**.
   - Resources are reallocated to better-performing trials.
   - Reduction factor `3` controls the aggressiveness of pruning: about 1/3 of trials are kept each promotion step.

3. **Custom Early Stoppers**
   - In addition to ASHA pruning, two custom stoppers are used:
     - **Plateau Stopper**: ends a trial if `score_pred` shows little improvement (low variance) over 12 recent iterations.
     - **Drop Stopper**: ends a trial if performance drops significantly compared to recent history.
   - A **MaximumIterationStopper** also caps training at the configured maximum iterations (`max_iters`).

4. **Callbacks & Metrics**
   - `PredatorScore` computes a predator-specific metric (`score_pred = predator_return / 100.0`) and injects it into Ray Tune. We decided to pick this metric rather than a metric which would combine both predator and prey rewards. A combined metric is prone to a subjectivity and interferes with the independent training of predator and prey. Therefore we have chosen predator rewards as the sole metric, as maximimizing it would inherently also keep prey rewards into play. This obviously result from the fact that predators kan not prosper without prey and would go extinct otherwise. 
   - As soon as a trial reaches `score_pred >= 1.0`, it is logged once in `predator_100_hits.csv`.
   - The `FinalMetricsLogger` callback writes a `predator_final.csv` row **immediately when each trial ends**, including:
     - Trial name
     - Iteration reached
     - Final score
     - Hyperparameters (`lr`, `num_epochs`)
     - **Stop reason** (e.g., `"plateau"`, `"drop"`, `"max_iters"`, `"asha_early_stop"`, `"completed"`, or `"error"`).

5. **Resource Allocation**
   - The script runs on **32 CPUs** with up to **4 concurrent trials**:
     - Each trial: 1 driver + 1 learner + 3 environment runners (2 CPUs each).
     - Total: 8 CPUs per trial × 4 trials = 32 CPUs fully utilized.

---

## Why This Setup?

- **Optuna** ensures broad, efficient coverage of the hyperparameter space (smarter than random search).
- **ASHA pruning** aggressively cuts off poor performers, preventing wasted resources.
- **Custom stoppers** add safety nets (plateau detection and performance drops).
- **Immediate CSV logging** makes trial eliminations transparent while training is still running.

---

## Example Outcome

- Trials that failed to improve were stopped early with `asha_early_stop`.
- Some trials hit plateaus and were stopped with `plateau`.
- The best trials ran longer (50–70 iterations), achieving predator scores above **1.0** (≥100 predator reward).
- Hyperparameters around **lr ≈ 1.1e-4** and **num_epochs ≈ 26–30** consistently produced the best results.

---

**In summary:**  
This workflow is **Optuna-driven hyperparameter search** with **ASHA pruning** plus **custom stoppers**, fully utilizing available CPUs and logging every trial’s fate in real time.
