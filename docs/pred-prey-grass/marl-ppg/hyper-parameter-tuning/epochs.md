---
id: epochs-ppg
title: Epochs variation
---
The number of epochs in the configuration has a strong impact on the wall time of iterations. The ```num_epochs``` determines how many times PPO will re-use the same batch of collected experiences for gradient updates before sampling a new batch of fresh data. Essentially, the ```num_epochs``` is a knob that trades off data efficiency vs. stability. Increasing  ```num_epochs``` increases stability of training but on the other hand takes more compute time.

In Display 1 we depict the wall time for the default PPO configuration (with ```num_epochs=30```), alongside training results for ```num_epochs=20,10,5```. This shows that long term stability of training when ```num_epochs``` decreases.

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/display-1.png" alt="Display 1: Training results (iterations): ```num_epochs=30,20,10,5```" width="1200" />
  <figcaption><strong>Display 1:</strong> Training results (iterations): ```num_epochs=30,20,10,5```</figcaption>
</figure>

On the other hand however, Display 2 which depicts the same training but now in wall time on the x-axis, shows that the lower ```num_epochs```, the faster learnings occurs. Especially at the beginning. But on the other hand, training is less sustainable and stable. 

<figure style={{ textAlign: 'center' }}>
  <img src="/img/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/display-2-a.png" alt="Display 1: Training results (iterations): ```num_epochs=30,20,10,5```" width="1200" />
  <img src="/img/pred-prey-grass/marl-ppg/hyper-parameter-tuning/epochs/display-2-b.png" alt="Display 1: Training results (iterations): ```num_epochs=30,20,10,5```" width="1200" />
  <figcaption><strong>Display 1:</strong> Training results (iterations): ```num_epochs=30,20,10,5```</figcaption>
</figure>

This exactly shows the trade off between stability and speed when choosing the ```num_epochs``` in PPO training. An intersting future follow-up might be to increase ```num_eppochs``` during training.





