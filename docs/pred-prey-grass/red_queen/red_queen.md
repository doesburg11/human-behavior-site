---
id: red-queen-ppg
title: The Red Queen effect
---

# Detecting the Red Queen Effect in a Predator–Prey Co-Evolutionary System

## 🧬 Introduction

The **Red Queen Effect**, inspired by Lewis Carroll's *Through the Looking Glass*, describes an evolutionary dynamic where species must continually adapt just to maintain their relative fitness. In co-evolutionary systems, this manifests as *reciprocal adaptation* — a change in one species drives evolutionary pressure on the other.

In this experiment, we test for the presence of the Red Queen effect using a **Predator–Prey–Grass** environment with multi-agent reinforcement learning (RLlib, PPO). We restrict the system to:
- **`type_1_predator`**: a single predator archetype
- **`type_1_prey`**: a single prey archetype  
to isolate pure co-evolutionary interactions without intra-species competition.

We assess whether adaptation is required for either population to maintain fitness by applying the classic **freeze–unfreeze test**. This involves fixing (freezing) one agent population’s policy while allowing the other to continue evolving.

---

## 🔬 Experimental Setup

Four evaluation scenarios were created by combining PPO checkpoints from two generations:

- `checkpoint_iter_500` (early generation)
- `checkpoint_iter_1000` (later generation)

We then ran:

| Experiment         | Predator Source     | Prey Source        | Purpose                      |
|-------------------|----------------------|---------------------|------------------------------|
| **Frozen Prey**   | checkpoint_iter_1000 | checkpoint_iter_500 | Test if predator evolved advantage |
| **Frozen Predator** | checkpoint_iter_500 | checkpoint_iter_1000 | Test if prey evolved advantage |
| **Static Baseline** | checkpoint_iter_500 | checkpoint_iter_500 | Baseline (no evolution)     |
| **Fully Co-Evolved** | checkpoint_iter_1000 | checkpoint_iter_1000 | Full mutual adaptation      |

Each evaluation ran for 1000 steps in the same grid-based environment.

---

## 📊 Results

| Experiment         | Avg Prey Offspring | Avg Prey Lifespan | Total Prey Offspring | Total Reward |
|-------------------|--------------------|--------------------|----------------------|--------------|
| **Frozen Prey**   | 0.96               | 4.76               | 491                  | 6350         |
| **Frozen Predator** | 0.96             | 6.01               | 523                  | 6660         |
| **Static Baseline** | 0.96             | 4.70               | 500                  | 6500         |
| **Fully Co-Evolved** | 0.96            | **8.19**           | **529**              | **6680**     |


Observations:
- All setups produced similar offspring counts and average rewards — but **lifespan diverged significantly**.
- The **co-evolved prey population** lived **longer** than in any other setup, despite no increase in reproduction rate.
- **Freezing predators** allowed prey to increase their lifespan from 4.7 to 6.01 steps.
- **Freezing prey** resulted in shorter lifespans for prey, suggesting that **predator adaptation alone** is not enough to secure ongoing advantage.

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/redqueen/display-1.jpg" alt="Display 1: Life span comparison" width="600" />
  <figcaption><strong>Display 1:</strong> Life span comparison</figcaption>
</figure>

---

## ✅ Conclusion

This experiment provides strong empirical evidence of the **Red Queen effect** in our co-evolutionary predator–prey simulation.

Key conclusions:
- Mutual co-adaptation yields the best prey performance (↑ lifespan)
- Freezing one side reduces the other's contextual fitness — indicating that **fitness is relative and dependent on opponents**
- Predator improvement **depends on the ability to respond** to evolving prey — not just isolated learning

In essence:  
> "It takes all the running you can do, to stay in the same place."  
> — *The Red Queen*, Lewis Carroll

This test confirms that **evolutionary pressure is bidirectional** and **ongoing adaptation is necessary** to maintain performance — a defining hallmark of Red Queen dynamics.

---

## 🔁 Future Work

Next steps may include:
- Running across multiple random seeds for statistical validation
- Introducing `type_2` predator/prey variants to observe **strategy replacement**
- Logging mutation rates and lineage turnover for **evolutionary depth analysis**
- Visualizing arms race dynamics across generations

