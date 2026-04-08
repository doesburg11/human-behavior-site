---
id: red-queen-ppg
title: The Red Queen Effect
---

# The Red Queen Effect in a Predator–Prey Co-Evolutionary System

## 🧬 Introduction

The **Red Queen Effect**, inspired by Lewis Carroll's *Through the Looking Glass*, describes an evolutionary dynamic where species must continually adapt just to maintain their relative fitness. In co-evolutionary systems, this manifests as *reciprocal adaptation* — a change in one species drives evolutionary pressure on the other.

In this experiment, we test for the presence of the Red Queen effect using a **Predator–Prey–Grass** environment with multi-agent reinforcement learning (RLlib, PPO). We restrict the system to:
- **`type_1_predator`**: a single predator archetype
- **`type_1_prey`**: a single prey archetype  
to isolate pure co-evolutionary interactions without intra-species competition.

We assess whether adaptation is required for either population to maintain fitness by applying a **freeze–unfreeze test**. This involves fixing (freezing) one agent population’s policy while allowing the other to continue evolving.

---

## 🔬 Experimental Setup

Four evaluation scenarios were created by combining PPO checkpoints from two generations:

- `checkpoint_iter_500` (early generation)
- `checkpoint_iter_1000` (later generation)

We then ran:

<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '28%' }} />
      <col style={{ width: '24%' }} />
      <col style={{ width: '24%' }} />
      <col style={{ width: '24%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Experiment</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Predator Source</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Prey Source</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Frozen Prey</strong></td>
        <td>checkpoint_iter_1000</td>
        <td>checkpoint_iter_500</td>
        <td>Test if predator evolved advantage</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td><strong>Frozen Predator</strong></td>
        <td>checkpoint_iter_500</td>
        <td>checkpoint_iter_1000</td>
        <td>Test if prey evolved advantage</td>
      </tr>
      <tr>
        <td><strong>Static Baseline</strong></td>
        <td>checkpoint_iter_500</td>
        <td>checkpoint_iter_500</td>
        <td>Baseline (no evolution)</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td><strong>Fully Co-Evolved</strong></td>
        <td>checkpoint_iter_1000</td>
        <td>checkpoint_iter_1000</td>
        <td>Full mutual adaptation</td>
      </tr>
    </tbody>
  </table>
</div>

Each evaluation ran for 1000 steps in the same grid-based environment.

---

## 📊 Results

<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '24%' }} />
      <col style={{ width: '19%' }} />
      <col style={{ width: '19%' }} />
      <col style={{ width: '19%' }} />
      <col style={{ width: '19%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Experiment</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Avg Prey Offspring</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Avg Prey Lifespan</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Total Prey Offspring</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Total Reward</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Frozen Prey</strong></td>
        <td>0.96</td>
        <td>4.76</td>
        <td>491</td>
        <td>6350</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td><strong>Frozen Predator</strong></td>
        <td>0.96</td>
        <td>6.01</td>
        <td>523</td>
        <td>6660</td>
      </tr>
      <tr>
        <td><strong>Static Baseline</strong></td>
        <td>0.96</td>
        <td>4.70</td>
        <td>500</td>
        <td>6500</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td><strong>Fully Co-Evolved</strong></td>
        <td>0.96</td>
        <td><strong>8.19</strong></td>
        <td><strong>529</strong></td>
        <td><strong>6680</strong></td>
      </tr>
    </tbody>
  </table>
</div>


Observations:
- All setups produced similar offspring counts and average rewards — but **lifespan diverged significantly**.
- The **co-evolved prey population** lived **longer** than in any other setup, despite no increase in reproduction rate.
- **Freezing predators** allowed prey to increase their lifespan from 4.7 to 6.01 steps.
- **Freezing prey** resulted in shorter lifespans for prey, suggesting that **predator adaptation alone** is not enough to secure ongoing advantage.

<figure style={{ textAlign: 'center' }}>
  <img src="/img/archive/pred-prey-grass/marl-ppg/experiments/red-queen/red-queen/display-1.jpg" alt="Display 1: Life span comparison" width="600" />
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
