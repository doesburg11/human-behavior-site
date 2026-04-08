---
id: overview-marl
title: Multi Agent Reinforcement Learning
sidebar_position: 1
---
### Multi Agent Reinforcement Learning (MARL) as a tool for modeling human behavior

Multi Agent Reinforcement Learning (MARL) is fundamentally different from other traditional Machine Learning (ML) paradigms. The main three traditional paradigms in ML are: Supervised Learning, Unsupervised Learning and Reinforcement Learning. Most applications in ML or (more general) Artificial Intelligence (AI), like for instance Large Language Models (LLM) are largely derived from (a mixture) of those paradigms. 

<figure style={{ textAlign: 'center' }}>
  <img src="/img/archive/pred-prey-grass/marl/overview-marl/display-1.png" alt="Display 1: Three main paradigms in Machine Learbing" width="800" />
  <figcaption><strong>Display 1:</strong> Three main paradigms in Machine Learning</figcaption>
</figure>

RL in a way distinguishes itself from Supervised and Unsupervised Learning, which is in a certain way nothing more than an advanced form of curve fitting of prefabriced data. RL, on the other hand, learns through sequential interaction with an environment, driven by rewards or penalties, rather than from a static dataset. In Display 2 are highlights some distinctions between the different approaches.



<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '22%' }} />
      <col style={{ width: '26%' }} />
      <col style={{ width: '26%' }} />
      <col style={{ width: '26%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Aspect</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Supervised Learning</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Unsupervised Learning</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Reinforcement Learning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Feedback signal</strong></td>
        <td>Correct output labels</td>
        <td>No labels</td>
        <td>Rewards from environment</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td><strong>Learning type</strong></td>
        <td>Passive (from examples)</td>
        <td>Passive (find structure)</td>
        <td>Active (trial-and-error interaction)</td>
      </tr>
      <tr>
        <td><strong>Goal</strong></td>
        <td>Minimize error</td>
        <td>Find structure or compression</td>
        <td>Maximize reward over time</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td><strong>Example task</strong></td>
        <td>Image classification</td>
        <td>Customer segmentation</td>
        <td>Game playing, robot navigation</td>
      </tr>
      <tr>
        <td><strong>Data type</strong></td>
        <td>Labeled</td>
        <td>Unlabeled</td>
        <td>Dynamic experience</td>
      </tr>
    </tbody>
  </table>
</div>
<figure style={{ textAlign: 'center' }}>
  <figcaption><strong>Display 2:</strong> Distinctions between the three main Machine Learning paradigms</figcaption>
</figure>

In our endeavor of modeling human behavior we have decided to follow the **descriptive agenda of Multi Agent Reinforcement Learning**. The descriptive agenda uses MARL to study the behaviors of natural agents, such as humans and animals, when learning in a population.This agenda typically begins by proposing a certain MARL algorithm which is designed to mimic how humans or animals adapt their actions based on past interactions. Methods from social sciences and behavioral economics can be used to test how closely a MARL algorithm matches the behavior of a natural agent, such as via controlled experimentation in a laboratory setting. This is then followed by analyzing whether a population of such natural agents converges to a certain kind of equilibrium solution if all agents use the proposed MARL algorithm.

To choose for this  descriptive approach is an important but inevitably also an ambiguous choice. We try to find which (minimal) fundamental features humans need to posses in order to display emergent behaviors like **cooperationa and competition**. However, almost by definition we need to deploy a priori subjective restrictions and opportunities in the simulation, because otherwise exploring emergent human behavior similar to the current human behavior observed in the real world is too much of a long shot. Evolution and learning is subject to too much randomness to come up with a simple singular evolutionary simulation. It is in our view very unlikely if evolution started all over again from the big bang, we would come up with the same outcome. Perhaps dinosaurs ruled the world after all, instead of humans, or whatever. Therefore, it is pointless (and most likely also impossible) to simulate and apply reinforcement learning of human behavior by starting from scratch because it will lead very likely to absurd varying outcomes of human life and human behavior. (if humans were to appear at all). Therefore it is inevitable and necessary to a priori endow characteristics of humans into simulation models, making modeling of course subjective unfortunately. It is nevertheless the challenge to identify universal emergent behavior out of human group dynamics with multi agent reinforcement learning, with making as few presumptions as possible.

### The increasing complexity of Multi Agent Reinforcement Learning
Building and observing interactions between artificial agents could help us to gain better understanding about human behavior. MARL can be sub divided into three categories: 
- Competitive setting
- Cooperative setting
- Mixed setting (both competitive and cooperative)

Multi agent reinforcement learning (MARL) is an interesting avenue to investigate human behavior and emergent group phenomena. Although recent years have brought advances in this field, significant results are still scarce. Single Agent Reinforcement Learnings has already established wide recognition and practical implementations. However, Multi Agent Reinforcement Learning is still in its infancy. For instance, because of the extra complexity, multi-goal behavior and the fact that learning agents for other agents are part of an (anticpating) environment. Especially the latter is able to induce a continuos needed changing adaptation between agents. Consequently, the environment *de facto* anticipates the actions of agents, and a continuous vicious cycle of anticipating agents can emerge. This can be described with autocurricula; a reinforcement learning concept that is a typical characteristic in multi agent learning. As agents improve their performance, they change their environment; this change in the environment affects themselves and the other agents. The feedback loop results in several distinct phases of learning, each depending on the previous one. The stacked layers of learning are called an autocurriculum. Autocurricula are especially apparent in adversarial settings, where each group of agents is racing to counter the current strategy of the opposing group.



<figure style={{ textAlign: 'center' }}>
  <img src="/img/archive/pred-prey-grass/marl/overview-marl/display-2.jpg" alt="Display 2: Single Agent Reinforcement learning" width="400" />
  <figcaption><strong>Display 2:</strong> Single Agent Reinforcement Learning</figcaption>
</figure>
<figure style={{ textAlign: 'center' }}>
  <img src="/img/archive/pred-prey-grass/marl/overview-marl/display-3.jpg" alt="Display 3: Multi Agent Reinforcement learning" width="400" />
  <figcaption><strong>Display 3:</strong> Multi Agent Reinforcement Learning</figcaption>
</figure>




  


