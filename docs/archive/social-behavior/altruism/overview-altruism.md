---
id: overview-altruism
title: Altruism
---

# Altruism

Altruism is a form of social behavior where an individual incurs a cost to benefit another. It appears in biological systems (e.g., kin selection, reciprocal altruism) and in human societies through norms, institutions, and moral frameworks.

- Biological roots: kin selection (Hamilton’s rule), reciprocal altruism (Trivers), group-beneficial norms.
- Mechanisms in multi-agent systems: reward shaping for prosocial outcomes, shared value functions, communication and reputation.
- Trade-offs: vulnerability to free-riding, need for enforcement or reputation systems.

Future pages will include examples, simple models, and experiments connecting altruistic behavior to cooperation and coordination in multi-agent environments.

## Reference implementation

This page summarizes and links to a working, vectorized Python implementation of an evolutionary altruism model from the SocialBehavior repository:

- Repository: https://github.com/doesburg11/SocialBehavior/tree/main/altruism
- Core simulation: `altruism_model.py`
- Interactive UI: `altruism_pygame_ui.py`
- Plots and analysis: heatmaps, 3D surfaces, and CSV grid search outputs

### Model at a glance
- Patch-based grid world: each cell is empty, selfish, or altruist
- Dynamics: cost of altruism, benefit to neighbors, fitness, and generational update via a genetic lottery
- Performance: fully vectorized NumPy implementation
- Visualization: Pygame UI for live interaction, Matplotlib for population plots

### Quick start

Run the command-line simulation:

```bash
python altruism_model.py --steps 200 --width 101 --height 101 --seed 42
```

Launch the interactive UI:

```bash
python altruism_pygame_ui.py
```

Controls:
- SPACE: Start/Stop
- R: Reset
- S: Step
- P: Plot population history

Import as a module:

```python
from altruism_model import AltruismModel, Params
model = AltruismModel(Params(width=51, height=51))
```

### Requirements
- Python 3.8+
- numpy
- pygame (UI)
- matplotlib (plots)

Install dependencies:

```bash
pip install numpy pygame matplotlib
```

System dependency for Pygame visualization (example):

```bash
conda install -y -c conda-forge gcc=14.2.0
```

### Model parameters (examples)
- `altruistic_probability`: initial chance a patch is altruist
- `selfish_probability`: initial chance a patch is selfish
- `benefit_from_altruism`: benefit received from altruists
- `cost_of_altruism`: cost paid by altruists
- `disease`, `harshness`: optional environment effects

### Conceptual summary
The model simulates a genetic lottery in plus-shaped neighborhoods. Each patch contributes a weighted “seed” to determine which trait (altruist vs. selfish) occupies a cell next generation. Under non-harsh conditions, selfishness tends to dominate; under harsher conditions, altruism can persist or prevail.

### Learn more / Source files
- README: https://github.com/doesburg11/SocialBehavior/blob/main/altruism/README.md
- Code folder: https://github.com/doesburg11/SocialBehavior/tree/main/altruism
- Core model: https://github.com/doesburg11/SocialBehavior/blob/main/altruism/altruism_model.py
- UI: https://github.com/doesburg11/SocialBehavior/blob/main/altruism/altruism_pygame_ui.py

References in the upstream README include the original NetLogo model and BEAGLE/EACH curriculum materials.

### Snippet: Parameters and model setup
Below is a minimal excerpt illustrating how parameters and the model class are defined in the SocialBehavior implementation. For the full, up-to-date source, see the repository links above.

```python
from dataclasses import dataclass
import numpy as np

BLACK, GREEN, PINK = 0, 1, 2  # empty, selfish, altruist

@dataclass
class Params:
	width: int = 51
	height: int = 51
	torus: bool = True
	altruistic_probability: float = 0.33
	selfish_probability: float = 0.33
	benefit_from_altruism: float = 0.5
	cost_of_altruism: float = 0.2
	disease: float = 0.0
	harshness: float = 0.0
	seed: int | None = None

class AltruismModel:
	def __init__(self, p: Params):
		self.p = p
		if self.p.seed is not None:
			np.random.seed(self.p.seed)
		# initialize state arrays and set up the world...
```

> Attribution: Code adapted from SocialBehavior/altruism (`altruism_model.py`). Please refer to the repository for the authoritative version.

### Try locally
- Clone: https://github.com/doesburg11/SocialBehavior
- Navigate: `altruism/`
- Run CLI or UI with the commands shown above.
