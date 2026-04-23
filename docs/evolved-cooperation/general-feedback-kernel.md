---
id: feedback-kernel-model
title: Feedback Kernel Model (Proposal)
sidebar_position: 5
slug: /evolved-cooperation/feedback-kernel-model
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Proposal.</strong> This page describes a proposed next evolved-cooperation module. It is not yet an implemented canonical case study in the <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.
  </p>
</div>

## Why A New Module

Retained Benefit is already the site's most abstract current evolved-cooperation model. It isolates one clean question: when does cooperation spread if the decisive issue is how much of the value created by cooperation is routed back toward cooperators or copies of the cooperative rule rather than being lost through evolutionary leakage?

That abstraction is useful precisely because it is narrow.

- one continuous cooperation trait evolves
- one lineage label acts as a protected return channel
- one scalar retained-benefit fraction determines how much cooperative value avoids leakage

The next step up should not be a larger Retained Benefit model with many ad hoc extensions. It should be a **new module** that treats Retained Benefit as one special case of a more general return structure.

So the proposed question becomes:

> what general forms of feedback are sufficient to let cooperation emerge, persist, or break down?

## Core Idea

The proposed module replaces the single retained fraction with a general **feedback kernel**.

Instead of assuming that cooperative value is split only into open versus same-lineage retained components, the model asks how value created by one site eventually returns to another through a more flexible set of channels.

Those channels may depend on:

- relatedness or lineage similarity
- spatial proximity
- delay through time
- repeated interaction history
- reputation or social memory
- partner choice
- institutional enforcement
- ecological overlap or shared fate

Under that framing, many classical cooperation theories become special parameterizations of one general return operator. The name <strong>Feedback Kernel Model</strong> is meant to signal that the core object is the kernel itself rather than any one specific retained-benefit channel.

## What "Kernel" Means Here

In this context, a **kernel** is not an operating-system kernel or a GPU
compute kernel. It is the rule that maps value produced by one cooperative
agent to the agents that receive that value.

Put more simply, if agent or site $j$ creates cooperative benefit, the kernel
answers:

> who receives that benefit, when do they receive it, and with what weight?

A compact way to write this is:

$$
R_i(t) = \sum_j \sum_{\tau \ge 0} K_{j \to i}(\tau, X_t) \, B_j(t-\tau)
$$

where:

- $R_i(t)$ is the total returned benefit received by site $i$ at time $t$
- $B_j(t-\tau)$ is benefit produced earlier by site $j$
- $K_{j \to i}(\tau, X_t)$ is the kernel weight from producer $j$ to recipient $i$
- $\tau$ is the time delay between production and return
- $X_t$ is the current world state, including spatial structure, lineage labels, memory, reputation, or ecological context

For Retained Benefit, the kernel has one simple shape: nearby sites receive an
open share, and same-lineage nearby sites receive an additional protected
retained share. A more general Feedback Kernel Model would let that return
operator take other forms as well, such as relatedness weighting, spatial
distance weighting, delayed reciprocity, reputation-gated return, or
institutional exclusion of free-riders.

## Proposed General Equation

At time $t$, let site or agent $j$ create cooperative value $B_j(t)$ and let site or agent $i$ pay cost $C_i(t)$ for its current cooperation level.

The proposed fitness or reproduction score is:

$$
W_i(t) = w_0 - C_i(t) + \sum_j \sum_{\tau \ge 0} K_{j \to i}(\tau, X_t) \, B_j(t-\tau)
$$

where:

- $W_i(t)$ is the selection-relevant score for site $i$
- $w_0$ is baseline fitness or baseline replacement weight
- $C_i(t)$ is the private cost of cooperation paid by $i$
- $B_j(t-\tau)$ is cooperative value previously created by site $j$
- $K_{j \to i}(\tau, X_t)$ is the feedback kernel specifying how much of that value returns to $i$ after delay $\tau$ in world state $X_t$

The cooperation condition then becomes more general:

$$
\text{cooperation is favored when feedback-weighted marginal return exceeds marginal cost}
$$

or, locally,

$$
\frac{\partial \mathbb{E}[\text{return to actor or copies}]}{\partial h_i}
>
\frac{\partial C_i}{\partial h_i}
$$

This does not commit the model to one particular mechanism. It asks only whether the return structure is strong enough to overcome private cost.

## Minimal State Variables

The module should stay abstract enough to compare many mechanisms without becoming a kitchen-sink ecology.

Minimal state:

- site index or agent index $i$
- cooperation trait $h_i \in [0, 1]$
- lineage or rule label $\ell_i$
- optional internal social state $s_i$ for memory, reputation, or learned partner choice
- world state $X_t$ capturing spatial structure, current population distribution, and any institutional or ecological context

Derived quantities:

- produced cooperative value $B_i(t)$
- private cost $C_i(t)$
- returned value $R_i(t)$
- selection score or fitness $W_i(t)$

## Parameter Families

The aim is to vary a few interpretable parameter families rather than add one-off switches for every theory.

### 1. Contribution Rule

How much value is created as cooperation rises?

- linear benefit
- saturating benefit
- threshold synergy
- nonlinear group amplification

### 2. Cost Rule

How costly is cooperation to the producer?

- linear cost
- convex cost
- context-dependent cost

### 3. Kernel Structure

What determines how value returns?

- local distance weighting
- lineage similarity weighting
- temporal delay weighting
- reputation weighting
- reciprocity weighting from past interactions
- partner-choice gating
- institutional transfer or punishment terms

### 4. Selection Rule

How does returned value change persistence?

- local replacement lottery
- reproductive competition
- survival threshold
- bounded carrying-capacity competition

### 5. Variation Rule

How do new traits enter the system?

- mutation in cooperation level
- mutation in kernel sensitivity parameters
- mutation in memory or reciprocity traits

## Why This Is Distinct From Retained Benefit

Retained Benefit should remain a clean benchmark.

It can be written as a special case of the general kernel model where:

- the kernel is mostly local
- the decisive protected channel is same-lineage routing
- return is effectively immediate rather than heavily delayed
- the open versus retained split is controlled by one scalar parameter

So the proposed new module is not a replacement for Retained Benefit. It is the more universal parent model within which Retained Benefit becomes one interpretable special case.

## Important Special Cases

One reason to build this as a separate module is that many classical theories then become explicit kernel choices.

### Retained Benefit

- immediate local kernel
- same-lineage protection
- open leakage outside the protected channel

### Kin Selection

- kernel weights return by relatedness
- cooperation spreads when the inclusive-fitness return is large enough

### Direct Reciprocity

- kernel weights future return by repeated interaction history
- delayed return matters as much as immediate return

### Indirect Reciprocity

- kernel depends on reputation or social image
- return comes from third parties, not only direct recipients

### Spatial Assortment

- kernel depends mainly on local clustering and repeated local encounters
- return is structural rather than explicitly cognitive

### Parental Investment

- offspring may be immediate non-contributors
- but delayed lineage return can still be strong through inclusive fitness

## Proposed Python Module Layout

The canonical implementation should live as a new top-level module in the sibling <code>EvolvedCooperation</code> repository.

```text
feedback_kernel_model/
  __init__.py
  README.md
  feedback_kernel_model.py
  kernel.py
  state.py
  selection.py
  metrics.py
  tests/
    test_kernel_normalization.py
    test_retained_equivalent_regression.py
    test_delay_buffer.py
  config/
    feedback_kernel_default_config.py
    retained_equivalent_config.py
    kin_local_config.py
    delayed_reciprocity_config.py
  utils/
    export_github_pages_demo.py
    plot_phase_diagrams.py
  experiments/
    sweep_kernel_coupling.py
    sweep_delay_vs_cost.py
    compare_special_cases.py
```

Core responsibilities:

- <code>feedback_kernel_model.py</code>: simulation loop, state update, mutation, and reproduction logic
- <code>kernel.py</code>: return operator definitions and composable kernel terms
- <code>state.py</code>: data structures for agent traits, lineage labels, optional social state, and environment state
- <code>selection.py</code>: local replacement or survival competition rules
- <code>metrics.py</code>: mean cooperation, assortment, kernel-weighted return, lineage persistence, and breakdown thresholds

## Canonical Repo Task Breakdown

The breakdown below is the concrete handoff plan for the sibling <code>EvolvedCooperation</code> repository.

### Phase 0: Module Skeleton And Retained-Equivalent Baseline

Tasks:

1. Create the <code>feedback_kernel_model/</code> module folder and default config layout.
2. Implement the minimal simulation loop with continuous cooperation trait, lineage label, mutation, and local replacement.
3. Add <code>retained_equivalent_config.py</code> that reproduces Retained Benefit as a kernel special case.
4. Add summary metrics for mean cooperation, local assortment, dominant-lineage share, and mean returned value.

Exit criterion:

- the retained-equivalent configuration reproduces the expected qualitative Retained Benefit behavior and exports the same headline metrics.

### Phase 1: Kernel Abstractions

Tasks:

1. Implement a composable <code>FeedbackKernel</code> interface.
2. Support immediate local weighting, lineage weighting, and optional delay weighting.
3. Add normalization or boundedness checks so kernel mass remains interpretable.
4. Add tests for non-negativity, normalization, and deterministic behavior under fixed seeds.

Exit criterion:

- kernel terms can be combined without breaking score bounds or producing unstable return weights.

### Phase 2: Delayed-Return Case

Tasks:

1. Add a time buffer for previously created cooperative value.
2. Implement at least one delayed-return configuration.
3. Record metrics for return lag, persistence, and cooperation breakdown threshold under delay.
4. Add a smoke test confirming the delayed-return config runs end-to-end.

Exit criterion:

- one delayed-return case runs stably and produces interpretable history traces.

### Phase 3: Non-Lineage Feedback Case

Tasks:

1. Implement one non-lineage channel such as reciprocity-weighted or reputation-weighted return.
2. Add the required agent social state for that mechanism.
3. Compare its emergence boundary with the retained-equivalent baseline under a shared metric set.
4. Confirm that cooperation can be sustained through that channel even when pure same-lineage routing is absent or weak.

Exit criterion:

- at least one non-lineage mechanism sustains cooperation in a way that is clearly distinct from the retained-equivalent case.

### Phase 4: Sweep And Comparison Layer

Tasks:

1. Add parameter sweeps over cost, delay, coupling strength, and locality.
2. Produce phase diagrams for emergence versus breakdown boundaries.
3. Add <code>compare_special_cases.py</code> to compare retained-equivalent, kin-local, and delayed-return regimes.
4. Define one common comparison table used by docs and plots.

Exit criterion:

- the module can generate a clean cross-case comparison showing which return structures sustain cooperation under which conditions.

### Phase 5: Export And Website Integration

Tasks:

1. Add a frozen website-demo config.
2. Export sampled replay data and summary metrics for one chosen canonical case.
3. Add the figure and replay bundle needed for the website page.
4. Write a repo README that states clearly which theoretical cases are already implemented versus still planned.

Exit criterion:

- the sibling repo has one canonical demo case that can be documented on the site without claiming more implementation coverage than actually exists.

## Suggested Issue List

If this work is tracked as issues in the canonical repo, the first issue set should be:

1. Scaffold <code>feedback_kernel_model/</code> and retained-equivalent baseline.
2. Implement composable kernel terms plus normalization tests.
3. Add delayed-return buffer and delayed feedback config.
4. Add one non-lineage return mechanism.
5. Build comparison sweeps and shared metrics.
6. Export a website demo and write README/docs.

## Recommended Test Strategy

The first implementation should be disciplined about regression checks.

- unit tests for kernel boundedness and normalization
- regression tests for the retained-equivalent baseline under a fixed seed
- smoke tests for every config in <code>config/</code>
- metric invariants such as valid probability weights, bounded cooperation trait values, and nonnegative returned-value tallies where appropriate

## Suggested Internal API

A disciplined first implementation could expose the following abstractions.

- <code>ContributionRule</code>: maps cooperation level to produced value
- <code>CostRule</code>: maps cooperation level to private cost
- <code>FeedbackKernel</code>: maps sender, recipient, delay, and world state to a return weight
- <code>SelectionRule</code>: maps scores to persistence or reproductive success
- <code>MutationRule</code>: perturbs cooperation and optional kernel-sensitivity traits

That keeps the model extensible without hardcoding one mechanism after another.

## Minimal Implementation Milestones

The first version should stay narrow enough to test the abstraction rather than immediately chase every mechanism.

1. Reproduce Retained Benefit as a kernel special case.
2. Add one delayed-return case to test time-lagged feedback.
3. Add one non-lineage case, such as reputation-weighted or reciprocity-weighted return.
4. Compare emergence and breakdown boundaries across those cases with shared metrics.

Only after that should the module add richer institutional or ecological channels.

## Why This Matters

If this module works, it would let the site express a deeper claim than Retained Benefit alone.

Retained Benefit says:

> cooperation rises when enough of its return is protected from leakage

The Feedback Kernel Model proposal would say:

> cooperation rises when the total feedback-weighted return to cooperators or copies of the cooperative rule exceeds the private cost, regardless of whether that return is carried by kinship, spatial structure, reciprocity, reputation, institutions, or delayed ecological coupling

That would make it a stronger candidate for a genuinely general cooperation law.

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1-16. https://doi.org/10.1016/0022-5193(64)90038-4
- Trivers, R. L. (1971). *The evolution of reciprocal altruism*. *The Quarterly Review of Biology*, 46(1), 35-57. https://doi.org/10.1086/406755
- Axelrod, R., & Hamilton, W. D. (1981). *The evolution of cooperation*. *Science*, 211(4489), 1390-1396. https://doi.org/10.1126/science.7466396
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560-1563. https://doi.org/10.1126/science.1133755
- West, S. A., Griffin, A. S., & Gardner, A. (2007). *Evolutionary explanations for cooperation*. *Current Biology*, 17(16), R661-R672. https://doi.org/10.1016/j.cub.2007.06.004
