---
title: 数理渲染管线测试
description: 验证 KaTeX 物理宏、mhchem、定理框与代码高亮的构建时渲染（内部测试页，不对外展示）
pubDate: 2026-09-18
tags: [测试]
math: true
draft: true
---

## 狄拉克记号与物理宏

态矢 $\ket{\psi}$ 的内积 $\braket{\psi}{\phi}$，哈密顿量矩阵元 $\mel{\psi}{\hat{H}}{\phi}$。

对易子 $\comm{\hat{x}}{\hat{p}} = i\hbar$，期望值 $\ev{\hat{H}}$，模长 $\norm{\psi}$ 与绝对值 $\abs{a-b}$。

## 微分与场量

$$\dv{E}{t} = \pdv{S}{t} + \grad \cdot \vec{J}$$

路径积分 $\int_0^1 \rho \dd r$；拉普拉斯算子 $\laplacian \phi$，旋度 $\curl \vec{E}$，散度 $\divergence \vec{B} = 0$。

单位：重力加速度 $g = \qty{9.8}{m/s^2}$。

## 多行对齐

$$
\begin{aligned}
i\hbar \dv{\Psi}{t} &= \hat{H}\Psi \\
\hat{H} &= -\frac{\hbar^2}{2m}\laplacian + V(\vec{r},t)
\end{aligned}
$$

## 定理框

:::theorem{title="谱分解"}
厄米算符 $\hat{A}$ 的本征态构成完备正交基，任意态可展开为 $\ket{\psi} = \sum_n c_n \ket{n}$。
:::

:::definition{title="厄米算符"}
满足 $\mel{\psi}{\hat{A}}{\phi} = \mel{\phi}{\hat{A}}{\psi}^*$ 的算符称为厄米算符。
:::

:::note
这是提示框测试。单位宏：$g = \qty{9.8}{m/s^2}$。
:::

## 代码高亮

```python
import numpy as np

def heisenberg_chain(n: int, j: float = 1.0) -> np.ndarray:
    """构造 n 格点海森堡自旋链的哈密顿量。"""
    spins = [np.array([[1, 0], [0, -1]]) for _ in range(n)]
    return j * sum(np.kron(spins[i], spins[i + 1]) for i in range(n - 1))
```

内联代码 `np.kron` 与行内公式 $e^{i\pi}+1=0$ 混排测试。
