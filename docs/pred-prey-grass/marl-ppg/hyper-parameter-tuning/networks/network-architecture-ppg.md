---
id: network-architecture-ppg
title: Network architecture
---
# Predator–Prey–Grass: Network Architecture

## 🏞️ Short recap of the Environment

The **PredPreyGrass** environment is a grid world where three species interact:

- **Predators** hunt prey to survive.  
- **Prey** eat grass patches for energy while avoiding predators.  
- **Grass** regrows over time, fueling the bottom of the food chain.

### Key configurable parameters

- **Observation ranges** (`predator_obs_range`, `prey_obs_range`):  
  - Predators see a local square patch (default 7×7).  
  - Prey see a larger patch (default 9×9) to simulate early-warning advantage.  
- **Action ranges** (`type_1_action_range = 3`, `type_2_action_range = 5`):  
  - Type-1 agents have 3×3 = 9 discrete moves.  
  - Type-2 agents have 5×5 = 25 discrete moves.  
- **Energy dynamics**:  
  - Energy decays per step and per movement distance.  
  - Eating grass or prey replenishes energy.  
  - Agents reproduce when thresholds are reached, producing offspring.

This setup creates oscillatory predator–prey–grass dynamics reminiscent of **Lotka–Volterra systems**, but with richer evolutionary possibilities.

---

## 👁️ What Agents See

Each agent receives a **tensor-shaped local observation window** centered on itself:


- **C = channels = 4**
  - `0`: In-bounds mask  
  - `1`: Predator energy layer  
  - `2`: Prey energy layer  
  - `3`: Grass energy layer  

- **H, W = height and width of the square observation patch**
  - Predator: `7×7`  
  - Prey: `9×9`  


So a predator receives a `(4, 7, 7)` tensor; a prey receives a `(4, 9, 9)` tensor.

---

## 🧠 The Policy Network

We use a **convolutional neural network (CNN) → fully connected layers (MLP)** design, because:

- The observation is spatial (grid patch).  
- Translation invariance is important (a prey two cells left vs two cells right should be recognized similarly).  
- CNNs can capture local-to-global patterns in a compact way.

### Step 1. Convolutions

Each conv layer is **3×3, stride=1**, with ReLU activation.  

The critical concept is the **receptive field (RF)**: the size of the input patch that a top-level feature depends on.

- Formula:  
*RF* = 1 + 2*L*

where *L* is the number of 3×3 conv layers.

- **Predator (7×7 view):**  
- L=3 conv layers → RF=7 → exactly covers the whole window.  
- **Prey (9×9 view):**  
- L=4 conv layers → RF=9 → exactly covers the whole window.  

This ensures **all cells in the observation window are fused together in the conv stack** before flattening.

**Channel schedule:**

- First conv: 16 filters  
- Second conv: 32 filters  
- Third conv: 64 filters  
- If a 4th layer is needed (for prey): 64 filters again  

**Example (prey with 9×9 view):**

```yaml
Conv1: 16 filters, 3x3, stride=1
Conv2: 32 filters, 3x3, stride=1
Conv3: 64 filters, 3x3, stride=1
Conv4: 64 filters, 3x3, stride=1   # only for larger obs windows
```

### Step 2. Flatten + Fully Connected

After convolution, the feature map is flattened and passed through two dense layers:

- `[256, 256]` units for standard 9-action policies.  
- `[384, 256]` units for large 25-action policies (so the network has more capacity to rank many moves).  

Activation: **ReLU**.

### Step 3. Output Heads

RLlib’s default PPO module attaches two heads:

- **Policy head** → logits over discrete actions (e.g., 9 or 25).  
- **Value head** → scalar value estimate for PPO critic.

---

## 🔑 Why Dynamic Architecture?

- **Predators (7×7 view):**  
  3 conv layers suffice (RF=7). Lightweight, efficient.  
- **Prey (9×9 view):**  
  Needs 4 conv layers (RF=9). Otherwise, the outer ring of vision is only combined in the dense layers, weakening long-range threat detection.  

This dynamic adjustment ensures each policy network’s conv stack matches its observation window — no wasted capacity, no underfitting.

---

## 🚀 Expected Benefits

- **Prey learns faster** to avoid predators appearing at the edge of vision.  
- **Value loss is smoother** because the conv stack resolves contradictions earlier.  
- **Training is more stable**, with fewer PPO KL/entropy spikes.  
- **Compute cost increase is negligible**, since inputs are tiny (≤9×9).  

---

## 📈 Summary

- **Environment parameters** define the *problem* (obs ranges, energy rules, agent counts).  
- **Model hyperparameters** define the *solution capacity* (conv depth, FC width).  
- By linking conv depth (*L*) to observation range (*H*), the Predator–Prey–Grass network architecture is **ecologically grounded and computationally efficient**.  

This design lets predators and prey both make the best use of their perception, and leads to richer emergent dynamics during training.

