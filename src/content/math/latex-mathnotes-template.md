---
title: 数理笔记 LaTeX 模板 MathNotes 使用指南
description: 一份可直接编译的中文数理笔记模板——physics 物理记号、siunitx 规范单位、八种定理环境与彩色提示框；本页同时是站点公式渲染能力的现场演示
pubDate: 2026-09-18
tags: [LaTeX, 数学排版, 模板]
math: true
pdfUrl: /files/mathnotes-template.pdf
---

这是一份面向中文数理笔记的 XeLaTeX 模板：导言区按功能分区并附中文注释，正文各节即为用法演示。本页将模板的核心内容搬上网页——你看到的每一个公式，都是站内构建时 KaTeX 渲染的真实效果；排版细节（页面布局、TikZ 插图、交叉引用编号）请配合[下载 PDF 原版](/files/mathnotes-template.pdf)对照。

## 模板功能速览

- 中文支持：`ctexart` 文档类，XeLaTeX 编译，自动处理中西文间距与断行；
- 数学：`amsmath` 全家桶 + `physics` 物理记号（`\dv`、`\pdv`、`\bra`、`\ket`、`\ev` 等）；
- 定理环境 8 种（定理/引理/推论/命题/定义/例/习题/注），其中定理至例六种共用编号；
- 重点框 `keybox` 与便签框 `notebox`（网页版对应下方的提示框）；
- 规范单位 `siunitx`：$g = \qty{9.81}{m/s^2}$，$e = \qty{1.602e-19}{C}$；
- 智能交叉引用 `cleveref`、页眉含当前章节名、公式编号按（节.序号）分层。

:::note{title="欧拉恒等式"}
数学中最优美的公式之一：

$$\mathrm{e}^{\mathrm{i}\pi} + 1 = 0.$$
:::

:::note
**便签框**用于提醒、易错点、待办等随手记录；网页版中对应你现在看到的这个样式。
:::

## 数学排版示例

### 行内与行间公式

行内公式用 `$...$`：质能关系 $E = mc^2$ 与欧拉公式 $\mathrm{e}^{\mathrm{i}\theta} = \cos\theta + \mathrm{i}\sin\theta$。重要的行间公式用 `equation` 环境并加 `\label` 以便引用：

$$\int_{-\infty}^{\infty} \mathrm{e}^{-x^{2}} \dd{x} = \sqrt{\pi}$$

### 多行推导（align）

一元二次方程求根公式的配方法推导（注意 `&` 对齐、`\notag` 取消本行编号）：

$$
\begin{aligned}
a x^{2} + b x + c &= 0, \quad a \ne 0,\\
x^{2} + \frac{b}{a} x &= -\frac{c}{a},\\
\left( x + \frac{b}{2a} \right)^{2} &= \frac{b^{2} - 4ac}{4a^{2}},\\
\boxed{\, x = \frac{-b \pm \sqrt{b^{2} - 4ac}}{2a} \,}
\end{aligned}
$$

### 矩阵与分段函数

泡利矩阵（`pmatrix` 环境）与符号函数（`cases` 环境）：

$$
\sigma_x = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad
\sigma_y = \begin{pmatrix} 0 & -\mathrm{i} \\ \mathrm{i} & 0 \end{pmatrix}, \quad
\sigma_z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
$$

$$
\operatorname{sgn}(x) =
\begin{cases}
1, & x > 0, \\
0, & x = 0, \\
-1, & x < 0.
\end{cases}
$$

一般矩阵配合省略号（`\cdots` `\vdots` `\ddots`）：

$$
A = \begin{pmatrix}
a_{11} & \cdots & a_{1n} \\
\vdots & \ddots & \vdots \\
a_{m1} & \cdots & a_{mn}
\end{pmatrix} \in \mathbb{R}^{m \times n}
$$

### 微积分记号（physics 宏包）

$$
\dv{f}{x}, \quad
\pdv{f}{x}, \quad
\dd{f} = \pdv{f}{x} \dd{x} + \pdv{f}{y} \dd{y}.
$$

二阶导数在 LaTeX 源里写作 `\dv[2]{y}{x}`；网页宏库未实现可选阶数参数，等价写法为 $\dfrac{\mathrm{d}^{2} y}{\mathrm{d} x^{2}}$。

（本站已将这些 physics 记号定义为全局宏，写作时可直接使用。）

## 物理排版示例

### 单位（siunitx）

- 真空光速 $c = \qty{299792458}{m/s}$；
- 普朗克常量 $h = \qty{6.626e-34}{J.s}$；
- 玻尔兹曼常量 $k_B = \qty{1.38e-23}{J/K}$。

### 麦克斯韦方程组（微分形式，SI 单位制）

$$
\begin{aligned}
\divergence\mathbf{E} &= \frac{\rho}{\varepsilon_0}, &
\divergence\mathbf{B} &= 0,\\
\curl\mathbf{E} &= -\pdv{\mathbf{B}}{t}, &
\curl\mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \pdv{\mathbf{E}}{t}.
\end{aligned}
$$

### 量子力学记号

薛定谔方程、正则对易关系与期望值：

$$
\mathrm{i} \hbar \pdv{\Psi}{t} = \hat{H} \Psi, \qquad
\comm{\hat{x}}{\hat{p}} = \mathrm{i} \hbar, \qquad
\ev{\hat{H}} = \mel{\psi}{\hat{H}}{\psi}.
$$

狄拉克符号：`\braket{\phi|\psi}` 得到 $\braket{\phi}{\psi}$，`\mel{a}{A}{b}` 得到 $\mel{a}{A}{b}$。

### 波动方程

$$\frac{\partial^{2} u}{\partial t^{2}} = c^{2} \laplacian u$$

## 定理与证明环境

:::definition{title="欧氏内积"}
设 $u, v \in \mathbb{R}^{n}$，定义 $\langle u, v \rangle = \sum_{i=1}^{n} u_i v_i$。
:::

:::theorem{title="柯西–施瓦茨不等式"}
对任意 $u, v \in \mathbb{R}^{n}$，有

$$\abs{\langle u, v \rangle} \le \norm{u} \, \norm{v}.$$
:::

**证明.** 对任意 $\lambda \in \mathbb{R}$，恒有 $\norm{u - \lambda v}^{2} \ge 0$；按内积定义展开：

$$
\norm{u}^{2} - 2 \lambda \langle u, v \rangle
+ \lambda^{2} \norm{v}^{2} \ge 0 .
$$

设 $v \ne 0$，取 $\lambda = \langle u, v \rangle / \norm{v}^{2}$，整理即得 $\langle u, v \rangle^{2} \le \norm{u}^{2} \norm{v}^{2}$，开方即得结论；$v = 0$ 时两边同时为零，显然成立。$\blacksquare$

:::example
求 $\displaystyle\lim_{x \to 0} \frac{\sin x}{x}$。
:::

**解.** 由泰勒展开 $\sin x = x - \dfrac{x^{3}}{3!} + O(x^{5})$，得

$$
\lim_{x \to 0} \frac{\sin x}{x}
= \lim_{x \to 0} \left( 1 - \frac{x^{2}}{3!} + O(x^{4}) \right) = 1. \;
\blacksquare
$$

:::problem
证明 $\Gamma(n+1) = n!$（$n \in \mathbb{N}^{*}$），其中 $\Gamma(z) = \int_{0}^{\infty} t^{z-1} \mathrm{e}^{-t} \dd{t}$。
:::

:::remark
编号规则：定义、定理、引理、推论、命题、例共用同一编号序列；习题单独按节编号；解与注不编号。（网页版中定理框不编号，编号体系见 PDF 原版。）
:::

## 图表插入

模板中用 TikZ 直接绘制矢量图（无需外部文件）。下图为正弦函数 $y = \sin x$ 的图像（网页版由等效矢量图重现，PDF 原版为 TikZ 原图）：

![正弦函数 y = sin x 的图像](/media/sine-function.svg)

插入外部图片的写法（LaTeX 源内注释块）：

```latex
\begin{figure}[htbp]
  \centering
  \includegraphics[width=0.7\textwidth]{demo.pdf}  % 文件放 figures/ 文件夹
  \caption{外部图片示例。}
  \label{fig:external}
\end{figure}
```

表格采用三线表（`booktabs`）：

| 符号 | 名称 | 数值 | 单位 |
|------|------|------|------|
| $c$ | 真空光速 | 299 792 458 | m/s |
| $h$ | 普朗克常量 | 6.626 070 15×10⁻³⁴ | J·s |
| $e$ | 元电荷 | 1.602 176 634×10⁻¹⁹ | C |
| $k_B$ | 玻尔兹曼常量 | 1.380 649×10⁻²³ | J/K |
| $N_A$ | 阿伏伽德罗常量 | 6.022 140 76×10²³ | 1/mol |

（2019 年 SI 定义的精确值。）

## 获取与编译

```bash
# 编译两遍以生成目录与交叉引用
xelatex main.tex && xelatex main.tex
# 或用 latexmk 自动处理多遍
latexmk -xelatex main.tex
```

- [下载模板 PDF 原版](/files/mathnotes-template.pdf)（含 TikZ 插图、页眉与编号系统的完整效果）
- [配套速查手册网页版](/math/latex-cheatsheet-web/) · [速查手册 PDF](/files/latex-cheatsheet.pdf)

**参考文献**

1. Griffiths, D. J. *Introduction to Electrodynamics*. 4th ed. Cambridge University Press, 2017.
2. 同济大学数学系. 高等数学（第七版）. 北京：高等教育出版社, 2014.
