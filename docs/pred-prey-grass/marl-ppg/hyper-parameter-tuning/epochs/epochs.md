---
id: epochs-ppg
title: Epochs Variation
---
The number of epochs in the configuration has a strong impact on the wall time of iterations. The ```num_epochs``` determines how many times PPO will re-use the same batch of collected experiences for gradient updates before sampling a new batch of fresh data. Essentially, the ```num_epochs``` is a knob that trades off data efficiency vs. stability. Increasing  ```num_epochs``` increases stability of training but on the other hand takes more compute time.

In Display 1 we depict the wall time for the default PPO configuration (with ```num_epochs=30```), alongside training results for ```num_epochs=20,10,5```. This shows that long term stability of training when ```num_epochs``` decreases.

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/display-1.png" alt="Display 1: Training results (iterations): ```num_epochs=30,20,10,5```" width="1200" />
  <figcaption><strong>Display 1:</strong> Training results (iterations): ```num_epochs=30,20,10,5```</figcaption>
</figure>

On the other hand however, Display 2 which depicts the same training but now in wall time on the x-axis, shows that the lower ```num_epochs```, the faster learnings occurs. Especially at the beginning. But on the other hand, training is less sustainable and stable. 

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/display-2-a.png" alt="Display 2: Training results (iterations): ```num_epochs=30,20,10,5```" width="1200" />
  <img src="/img/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/display-2-b.png" alt="Display 2: Training results (iterations): ```num_epochs=30,20,10,5```" width="1200" />
  <figcaption><strong>Display 2:</strong> Training results (wall time): ```num_epochs=30,20,10,5```</figcaption>
</figure>

This in particular shows the trade off between stability and speed when choosing the ```num_epochs``` in PPO training. An interesting follow-up might be to increase ```num_eppochs``` during training. Because ```num_epochs=5``` gives fast results at the first 100 iterations with the same reward output as the experiments with higher ```num_epochs```. However, after 100 iterations this configuration breaks down. So, starting off training with ```num_epochs=5``` and increasing it after 100 iterations might be result in a significant speed up of wall time, with roughly the same sustainability of training after 100 iterations.

**TODO**:
- ```num_epochs=5``` if ```iteration <= 100```.
- ```num_epochs=20``` if ```iteration > 100```.
- truncation at ```max_iters=500```.
- This might result in a full experiment wall time of 3-3.5 hours compared to the current 9.7 hours (for ```num_epochs=30``` and truncation at ```max_iters=1000```), with roughly the same quality of training.
- Another experiment might be to gradually increase ```num_epochs=5```
 after ```iteration > 100``` in some determinstic way.




