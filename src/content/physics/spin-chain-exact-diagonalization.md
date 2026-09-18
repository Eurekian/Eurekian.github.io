---
title: 三格点开链Heisenberg模型
description: 用 numpy 的 kron 直积构建开链海森堡模型哈密顿量并严格对角化——全部本征值与简并度、基态能量与基态总自旋的数值求解，附 11 项单元测试与解析值逐项对照
pubDate: 2026-09-16
updatedDate: ''
tags:
  - 计算物理
  - 严格对角化
  - Python
  - 量子力学
math: true
githubUrl: ''
pdfUrl: ''
draft: false
---

## 问题

对三站点自旋-1/2 开链的最近邻海森堡模型（$J=1$，$\hbar=1$）：

$$
H = \mathbf{S}_1\cdot\mathbf{S}_2 + \mathbf{S}_2\cdot\mathbf{S}_3 ,
$$

用 **numpy**（`np.kron` 构建算符 + `np.linalg.eigh` 对角化）求解：

1. （a）全部本征值及简并度；
2. （b）基态能量及简并度；
3. （c）基态的 $\ev{S_{\mathrm{tot}}^{2}}$。

## 方法

### 基矢与直积顺序约定

多体基矢 $\ket{s_1 s_2 \cdots s_n}$ 中格点 1 在最左（kron 链第一个因子）；复合指标 $\mathrm{row} = s_1 2^{n-1} + s_2 2^{n-2} + \cdots + s_n$，其中 $s_k \in {0,1}$ 分别对应 $\ket{\uparrow}$（$S^z=+1/2$）与 $\ket{\downarrow}$。单点算符按下式嵌入直积空间：

$$
O^{(k)} = \underbrace{I \otimes \cdots \otimes I}_{k-1} \otimes, O ,\otimes \underbrace{I \otimes \cdots \otimes I}_{n-k}.
$$

### 核心实现（节选）

单点自旋算符（Pauli 矩阵的一半，模块级缓存、幂等）：

```python
_PAULI_MATRICES: dict[str, np.ndarray] = {
    "x": np.array([[0.0, 1.0], [1.0, 0.0]], dtype=complex),
    "y": np.array([[0.0, -1.0j], [1.0j, 0.0]], dtype=complex),
    "z": np.array([[1.0, 0.0], [0.0, -1.0]], dtype=complex),
}

def single_site_spin_operator(axis: str) -> np.ndarray:
    """返回指定轴的单点自旋-1/2 算符（2x2 complex 矩阵，hbar=1）。

    "x"/"y"/"z" 返回 S^alpha = sigma^alpha / 2；
    "+"/"-" 返回升降算符 S^pm = S^x ± i S^y。
    结果被模块级缓存：重复调用返回同一对象。
    """
    if axis in _SINGLE_SITE_OPERATOR_CACHE:
        return _SINGLE_SITE_OPERATOR_CACHE[axis]
    if axis in _PAULI_MATRICES:
        operator = 0.5 * _PAULI_MATRICES[axis]
    elif axis == "+":
        operator = 0.5 * (_PAULI_MATRICES["x"] + 1.0j * _PAULI_MATRICES["y"])
    elif axis == "-":
        operator = 0.5 * (_PAULI_MATRICES["x"] - 1.0j * _PAULI_MATRICES["y"])
    else:
        raise ValueError(f"axis 必须是 'x'/'y'/'z'/'+'/'-' 之一，收到 {axis!r}")
    _SINGLE_SITE_OPERATOR_CACHE[axis] = operator
    return operator
```

站点算符嵌入——从 $1\times1$ 单位元出发的单循环累积 kron，从左到右逐因子拼接一次生成：

```python
def embed_site_operator(single_site_operator: np.ndarray,
                        site_index: int, num_sites: int) -> np.ndarray:
    """把 2x2 单点算符嵌入到 num_sites 站点的直积空间。

    约定：site_index 从 0 计数，0 号站点 = kron 链最左端因子：
        embed(O, 0, 3) = O (x) I (x) I
        embed(O, 1, 3) = I (x) O (x) I
    """
    embedded = np.ones((1, 1), dtype=complex)
    for site in range(num_sites):
        factor = single_site_operator if site == site_index else np.eye(2)
        embedded = np.kron(embedded, factor)
    return embedded
```

哈密顿量通过 $H = \sum_{\langle i,j\rangle} \mathbf{S}_i \cdot \mathbf{S}_j$ 逐键累加构建，`OpenSpinChain` 类惰性构建 $H$ 与 $S_{\mathrm{tot}}^{2}$ 并用 `np.linalg.eigh` 对角化；本征值按 $10^{-10}$ 容差分组得到简并度（$O(n)$ 单遍扫描），简并子空间内的期望值取各基矢期望的算术平均。

## 结果（与解析值逐项对照）

| 量 | 数值结果 | 解析值 | 判定 |
| --- | --- | --- | --- |
| 本征值集合 | −1（2 重）、0（2 重）、+1/2（4 重） | 同左 | PASS |
| 维数核对 | 2+2+4 = 8 = 2³ | 8 | PASS |
| 基态能量 $E_0$ | −1.000000000000 | −1 | PASS |
| 基态简并度 | 2 | 2 | PASS |
| 基态 $\ev{S_{\mathrm{tot}}^2}$ | 0.750000000000（子空间平均）→ S = 1/2 | 3/4 | PASS |
| 厄米性 $\max\abs{H-H^\dagger}$ | 0.0（< 1e-12） | 0 | PASS |
| $\operatorname{Tr} H$ | 0.0（< 1e-12） | 0 | PASS |
| $\max\abs{[H, S_{\mathrm{tot}}^2]}$ | 0.0（< 1e-12） | 0 | PASS |
| 两格点极限 | −3/4（1 重）、+1/4（3 重） | 单重态/三重态 | PASS |

### 完整程序输出

```text
自检（Self-checks，三站点链）
--------------------------------------------------------------
  厄米性 max|H-H^dag|             = 0.000e+00   [PASS]
  迹 Tr H（解析值 0）                = +0.000e+00   [PASS]
  守恒量 max|[H,S_tot^2]|         = 0.000e+00   [PASS]
  谱 vs 解析 {(-1,2),(0,2),(1/2,4)} 得到 3 组   [PASS]
  自检小结： 全部通过

==============================================================
 自旋-1/2 开链谱分析报告（最近邻海森堡模型，hbar = 1）
==============================================================
 链长 n = 3，交换耦合 J = +1，Hilbert 空间维数 = 8

(a) 全部本征值及简并度（升序）：
        #        本征值 E            简并度 g
       1     -1.000000000000        2
       2     -0.000000000000        2
       3     +0.500000000000        4
    维数核对：sum(g) = 8 = 2^3 （一致）

(b) 基态能量 E0 = -1.000000000000，简并度 g0 = 2

(c) 基态 <S_tot^2> = 0.750000000000（简并基态子空间内 2 条基矢平均）
    由 S(S+1) = <S_tot^2> 推断总自旋量子数 S = 0.500000
```

注：`-0.000000000000` 是 eigh 求得 $E=0$ 能级时残留的 $\sim10^{-18}$ 量级杂散值（正常浮点舍入，容差内归组为同一能级）。

## 物理解读

基态是 $S = 1/2$ 的双重态。由

$$
H = \tfrac{1}{2}\left( S_{\mathrm{tot}}^{2} - S_{13}^{2} - \tfrac{3}{4} \right)
$$

（$S_{13}$ 为格点 1、3 组成的复合自旋）可按 $(S,, S_{13})$ 扇区完全分类：$S=1/2$ 且 $S_{13}=1$ 的扇区能量为 $-1$，即基态；$S = 3/2$ 四重态能量 $+1/2$ 为最高能级。总自旋守恒（$[H, S_{\mathrm{tot}}^{2}] = 0$ 数值验证为零）正是 $S_{\mathrm{tot}}$ 良好量子数的体现。

## 工程要点

- **依赖极简**：仅 numpy + 标准库（`dataclasses` 等），Python 3.14 / numpy 2.5，无 scipy；
- **11 项单元测试**全部通过（算符平方、对易关系、解析谱对照、两格点极限、缓存复用、链长输入校验等），零第三方测试框架可直跑；
- **自检三重门**：厄米性、迹为零、与 $S_{\mathrm{tot}}^{2}$ 对易，均为 $10^{-12}$ 级代数恒等式判据；
- 两格点极限的谱比对（单重态 $-3/4$ 一重 + 三重态 $+1/4$ 三重）作为模型通用性检查计入退出码。

```text
[PASS] test_cached_operators_are_reused        [PASS] test_single_site_operators_squared
[PASS] test_commutation_relations              [PASS] test_two_site_chain_analytic_spectrum
[PASS] test_eigenvalues_match_analytic         [PASS] test_invalid_num_sites_is_rejected
[PASS] test_embed_matches_explicit_kron        [PASS] test_ground_state_total_spin_squared
[PASS] test_hamiltonian_commutes_with_...      [PASS] test_hamiltonian_shape_and_hermiticity
[PASS] test_hamiltonian_trace_zero             Ran 11 tests — OK (all tests passed)
```
