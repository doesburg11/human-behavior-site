---
id: ecosystem-ppg
title: The Predator, Prey, Grass Ecosystem
---

# Energy Flow and Entropy in the Predator–Prey–Grass Ecosystem

This page explains how energy flows through the simulated ecosystem of grass, prey, and predators, and how entropy increases in accordance with the second law of thermodynamics. The diagram below visualizes the core concepts behind the simulation model.

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/display-1.jpg" alt="Display 1: Energy flows in the ecosystem" width="400" />
  <figcaption><strong>Display 1:</strong> Energy flows in the ecosystem</figcaption>
</figure>
---

## Energy Input: The Role of the Sun

The sun is the only external energy source in this simulated ecosystem. It powers the growth of grass, which forms the foundation of the food web. In the simulation, this input is modeled by a regeneration mechanic:

```python
energy_gain_per_step_grass = 0.1
```

This parameter ensures that usable energy is continually added into the system via the grass layer.

---

## Trophic Levels and Energy Transfer

Energy flows through the ecosystem via interactions between different trophic levels: grass, prey, and predator. However, energy transfer between levels is never 100% efficient. A portion of energy is always lost due to respiration, movement, digestion, and other metabolic costs.

### Real-World Ecological Efficiency Heuristics

| Energy Flow        | Typical Efficiency | Description |
|--------------------|--------------------|-------------|
| Sun → Grass        | ~1–2%              | Only a small fraction of solar energy is converted into plant biomass. |
| Grass → Prey       | ~10–30%            | Much of the energy in grass is lost through digestion, heat, and movement. |
| Prey → Predator    | ~10–20%            | Energy transfer further degrades; predators expend energy hunting and processing prey. |

These values are commonly used heuristics in ecology and are derived from studies on trophic efficiency, such as Lindeman’s 10% rule.

---

## Simulated Energy Transfer Efficiency

In the simulation, the efficiency of energy transfer between entities is a configurable parameter:

```python
energy_transfer_efficiency = 0.3
```

This determines the proportion of energy successfully passed to the consumer (prey or predator). The remaining energy is lost, modeling entropy increase during biological processes.

Example from the simulation:

```python
raw_gain = min(source_energy, max_energy_gain)
gain = raw_gain * energy_transfer_efficiency
agent_energies[consumer] += gain
```

---

## The Second Law of Thermodynamics in the Simulation

The second law states that entropy tends to increase in any closed system. In this simulation, entropy is represented by energy that becomes unusable over time due to inefficiencies in movement, decay, and reproduction.

### Key Mechanisms Modeling Entropy Increase

#### 1. Passive Energy Decay
Each agent loses energy every step:

```python
energy_loss_per_step_predator = 0.15
energy_loss_per_step_prey = 0.05
```

#### 2. Movement Cost
Energy is consumed when an agent moves, based on distance:

```python
move_cost = distance * move_energy_cost_factor * current_energy
```

#### 3. Reproduction Inefficiency
Reproducing agents give energy to offspring but lose more than they transfer:

```python
agent_energies[parent] -= initial_energy_offspring
agent_energies[offspring] = initial_energy_offspring * reproduction_efficiency
```

#### 4. Starvation and Death
Agents that run out of energy die, and their energy is removed from the system unless consumed beforehand.

---

## Conceptual Entropy Reservoir

Although not explicitly modeled in the simulation, one can conceptualize an "entropy reservoir" that accumulates all lost or dissipated energy, including:

- Energy lost to decay over time
- Movement energy costs
- Reproduction losses
- Energy from agents that died without being consumed

Tracking total system energy and unrecoverable losses can be useful for measuring the thermodynamic behavior of the simulation.

---

## Implications for Evolution

This environment shows how life must constantly fight entropy by seeking energy through movement, hunting, and reproduction:

- Ecosystems need a constant external energy source to avoid collapse.
- All usable energy originates from the sun via grass regeneration.
- When grass is consumed by prey, its energy is **reset**, creating a **local entropy gradient** and opening up space for competition.
- Energy flows from grass to prey to predator, with losses at each stage.
- Food chains are short because energy diminishes significantly at each level.
- Energy cannot be recycled like matter, so organisms must continuously consume food to survive.
- Agents that efficiently capture and convert energy can survive and reproduce.
- Over time, selection may favor more energy-efficient strategies.
- However, local order (structured behavior, population growth) always comes with global disorder (net loss of usable energy).
- The second law of thermodynamics is reflected in energy decay, movement costs, reproduction inefficiencies, and starvation.


This mirrors the behavior of real-world ecosystems, where evolution creates complex organisms, but energy degradation is always ongoing.

---

# Energy Flow and Emergence in the Predator-Prey-Grass Ecosystem

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/display-2.jpg" alt="Display 2: The direction of energy flows and behavior" width="600" />
  <figcaption><strong>Display 2:</strong> The direction of energy flows and behavior</figcaption>
</figure>


This diagram captures the key thermodynamic and behavioral dynamics within the Predator-Prey-Grass multi-agent simulation. It illustrates how **energy is sourced, transferred, lost, and redirected** across the agents and environment, and how **reward-driven reproduction behaviors emerge** in alignment with physical and biological principles.

## Energy Loss & Thermodynamics

- All agents suffer:
  - **Baseline energy decay**
  - **Movement energy costs**
  - **Inefficiencies in consumption and reproduction**
- This ensures that **no perpetual energy cycles exist**, satisfying the **second law of thermodynamics**.
- Energy eventually degrades into unusable forms unless new input (sunlight) is absorbed.


## Entropy and Structure

- Local **order (low entropy)** is maintained in predator and prey populations by exploiting external gradients (grass energy).
- Without energy input or efficient strategies, **populations collapse** and entropy increases.
- This reinforces the ecological and physical realism of the simulation.

## References
- [Bailey, Regina. (2025, April 22). Laws of Thermodynamics as Related to Biology.]https://www.thoughtco.com/laws-of-thermodynamics-373307)
