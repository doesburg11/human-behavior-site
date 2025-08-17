---
id: pbt-overview
title: Overview
---

# Overview Population Based Training (PBT)

Population-Based Training (PBT) is a technique for efficiently searching and adapting hyperparameters during reinforcement learning.

Instead of running a fixed hyperparameter search, PBT trains a population of models in parallel, each initialized with different random hyperparameters. Over time, the population evolves by exploiting information from the best-performing models and exploring new hyperparameter variations.

PBT is inspired by genetic algorithms:

- Exploit: Poorly performing models adopt the weights and hyperparameters of stronger performers.

- Explore: These cloned hyperparameters are then slightly perturbed to introduce variation.

This cycle of exploit → explore continues throughout training, allowing the population to adapt dynamically rather than relying on a fixed hyperparameter schedule. As the training of the population of neural networks progresses, this process of exploiting and exploring is performed periodically, ensuring that all the workers in the population have a good base level of performance and also consistently exploring new hyperparameters configurations. This means that PBT can quickly exploit good hyperparameters, dedicate more training time to promising models and, crucially, mutate the hyperparameter values throughout training, leading to learning the best adaptive hyperparameter schedules.

In practice, the population is the set of Tune trials running in parallel. Trial performance is evaluated using a user-specified metric such as ```episode_return_mean```. After a specified interval, trial performances are compared, better configurations replace worse ones, and the cycle repeats (see Display 1).

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/marl-ppg/hyper-parameter-tuning/pbt/display-1.png" alt="Display 1: PBT cloning top performers into bottom performers during training" width="1200" />
  <figcaption><strong>Display 1:</strong> PBT cloning top performers into bottom performers during training</figcaption>
</figure>


## References
- [Population based training of neural networks(blog, 2017)](https://deepmind.google/discover/blog/population-based-training-of-neural-networks/)

- [Population Based Training of Neural Networks(paper, 2017)](https://arxiv.org/abs/1711.09846)

- [Ray RLlib PBT API, 2025)](https://docs.ray.io/en/latest/tune/api/doc/ray.tune.schedulers.PopulationBasedTraining.html)

- [A Guide to Population Based Training with Tune, 2025](https://docs.ray.io/en/latest/tune/examples/pbt_guide.html)