---
title: 数理常用 LaTeX 代码速查手册（1.0）
description: 希腊字母、运算符、箭头、字体、微积分、线性代数、概率统计与物理专题的公式效果与代码对照——每个符号都是站内 KaTeX 实时构建渲染
pubDate: 2026-09-18
updatedDate: ''
tags:
  - LaTeX
  - 速查表
  - 数学排版
math: true
githubUrl: ''
pdfUrl: /files/latex-cheatsheet.pdf
draft: false
---

配套 [MathNotes 模板](/math/latex-mathnotes-template/) 的数理常用 LaTeX 代码速查手册网页版：每个条目左侧为**渲染效果**（站内 KaTeX 构建时渲染）、右侧为**源代码**，复制代码即可复现公式。PDF 版（适合打印）见[这里](/files/latex-cheatsheet.pdf)。

## 公式排版基础

三种基本写法：行内公式 $E = mc^2$ 用 `$...$`；无编号行间公式用 `\[ ... \]` 或 `equation*` 环境；需引用的公式用 `equation` 环境配合 `\label` 与 `\eqref`（模板中 `\cref` 还会自动带上"式"字）。

**实用技巧**：

- 公式内排文字：`\text{(准静态)}`；公式加框：`\boxed{...}`；
- 上下花括号：`\overbrace{a+b}^{n \text{ 项}}` 得 $\overbrace{a+b}^{n \text{ 项}}$，`\underbrace{a+b+\cdots}_{\text{部分和}}` 得 $\underbrace{a+b+\cdots}_{\text{部分和}}$；
- 定义等号：`a \coloneqq b` 得 $a \coloneqq b$；
- 分数三兄弟：`\frac` $\frac{1}{2}$、`\dfrac`（行内大分数）、`\tfrac`（行间小分数）；连分数用 `\cfrac`：$\cfrac{1}{1+\cfrac{1}{1+\cdots}}$；
- 多行上下标：`\sum_{\substack{i=1\ i\ne j}}^{n}` 得 $\sum_{\substack{i=1\ i\ne j}}^{n} a_{ij}$。

## 希腊字母

小写（左为效果，右为代码）：

| 效果 | 代码 | 效果 | 代码 | 效果 | 代码 |
| --- | --- | --- | --- | --- | --- |
| $\alpha$ | `\alpha` | $\beta$ | `\beta` | $\gamma$ | `\gamma` |
| $\delta$ | `\delta` | $\epsilon$ | `\epsilon` | $\zeta$ | `\zeta` |
| $\eta$ | `\eta` | $\theta$ | `\theta` | $\iota$ | `\iota` |
| $\kappa$ | `\kappa` | $\lambda$ | `\lambda` | $\mu$ | `\mu` |
| $\nu$ | \`\nu\` | $\xi$ | `\xi` | $\pi$ | `\pi` |
| $\rho$ | `\rho` | $\sigma$ | `\sigma` | $\tau$ | `\tau` |
| $\upsilon$ | `\upsilon` | $\phi$ | `\phi` | $\chi$ | `\chi` |
| $\psi$ | `\psi` | $\omega$ | `\omega` | $o$ | （无命令，用拉丁 o） |
| $\varepsilon$ | `\varepsilon` | $\vartheta$ | `\vartheta` | $\varkappa$ | `\varkappa` |
| $\varpi$ | `\varpi` | $\varrho$ | `\varrho` | $\varsigma$ | `\varsigma` |

常用大写（与拉丁字母同形者直接用拉丁字母，如 A、B、E）：

| 效果 | 代码 | 效果 | 代码 | 效果 | 代码 |
| --- | --- | --- | --- | --- | --- |
| $\Gamma$ | `\Gamma` | $\Delta$ | `\Delta` | $\Theta$ | `\Theta` |
| $\Lambda$ | `\Lambda` | $\Xi$ | `\Xi` | $\Pi$ | `\Pi` |
| $\Sigma$ | `\Sigma` | $\Upsilon$ | `\Upsilon` | $\Phi$ | `\Phi` |
| $\Psi$ | `\Psi` | $\Omega$ | `\Omega` | $\hbar$ | `\hbar` |

注：$\hbar$ 并非希腊大写字母，因物理中常用而顺带列于表中。

## 运算符、集合与杂项符号

| 效果 | 代码 | 效果 | 代码 | 效果 | 代码 |
| --- | --- | --- | --- | --- | --- |
| $\pm$ | `\pm` | $\mp$ | `\mp` | $\times$ | `\times` |
| $\div$ | `\div` | $\cdot$ | `\cdot` | $\ast$ | `\ast` |
| $\star$ | `\star` | $\circ$ | `\circ` | $\bullet$ | `\bullet` |
| $\oplus$ | `\oplus` | $\otimes$ | `\otimes` | $\odot$ | `\odot` |
| $\cup$ | `\cup` | $\cap$ | `\cap` | $\setminus$ | `\setminus` |
| $\subset$ | `\subset` | $\subseteq$ | `\subseteq` | $\supset$ | `\supset` |
| $\in$ | `\in` | $\notin$ | \`\notin\` | $\ni$ | \`\ni\` |
| $\emptyset$ | `\emptyset` | $\varnothing$ | `\varnothing` | $\infty$ | `\infty` |
| $\forall$ | `\forall` | $\exists$ | `\exists` | $\nexists$ | \`\nexists\` |
| $\partial$ | `\partial` | $\nabla$ | \`\nabla\` | $\propto$ | `\propto` |
| $\ell$ | `\ell` | $\sum$ | `\sum` | $\angle$ | `\angle` |
| $\lfloor x\rfloor$ | `\lfloor x\rfloor` | $\lceil x\rceil$ | `\lceil x\rceil` | $\langle x\rangle$ | `\langle x\rangle` |
| $\binom{n}{k}$ | `\binom{n}{k}` | $\sqrt[n]{x}$ | `\sqrt[n]{x}` | $\prod$ | `\prod` |

角度用 siunitx：`\ang{90}` 得 $90^\circ$。

## 关系符号、逻辑与箭头

| 效果 | 代码 | 效果 | 代码 | 效果 | 代码 |
| --- | --- | --- | --- | --- | --- |
| $\le$ | `\le` | $\ge$ | `\ge` | $\ne$ | \`\ne\` |
| $\approx$ | `\approx` | $\equiv$ | `\equiv` | $\sim$ | `\sim` |
| $\simeq$ | `\simeq` | $\cong$ | `\cong` | $\ll$ | `\ll` |
| $\gg$ | `\gg` | $\mid$ | `\mid` | $\nmid$ | \`\nmid\` |
| $\parallel$ | `\parallel` | $\perp$ | `\perp` | $\triangle$ | `\triangle` |
| $\because$ | `\because` | $\therefore$ | `\therefore` | $\square$ | `\square` |
| $\wedge$ | `\wedge` | $\vee$ | `\vee` | $\neg$ | \`\neg\` |
| $\vdash$ | `\vdash` | $\models$ | `\models` | $\top$ / $\bot$ | `\top` `\bot` |
| $\to$ | `\to` | $\longrightarrow$ | `\longrightarrow` | $\mapsto$ | `\mapsto` |
| $\Rightarrow$ | `\Rightarrow` | $\Leftrightarrow$ | `\Leftrightarrow` | $\iff$ | `\iff` |
| $\leftrightarrow$ | `\leftrightarrow` | $\uparrow$ | `\uparrow` | $\downarrow$ | `\downarrow` |
| $\rightleftharpoons$ | `\rightleftharpoons` | $\xrightarrow{\text{加热}}$ | `\xrightarrow{...}` | $\overrightarrow{AB}$ | `\overrightarrow{AB}` |

## 修饰符号与数学字体

| 效果 | 代码 | 效果 | 代码 | 效果 | 代码 |
| --- | --- | --- | --- | --- | --- |
| $\hat{x}$ | `\hat{x}` | $\widehat{xy}$ | `\widehat{xy}` | $\check{x}$ | `\check{x}` |
| $\tilde{x}$ | `\tilde{x}` | $\widetilde{xy}$ | `\widetilde{xy}` | $\breve{x}$ | `\breve{x}` |
| $\bar{x}$ | `\bar{x}` | $\vec{x}$ | `\vec{x}` | $\overline{xy}$ | `\overline{xy}` |
| $\dot{x}$ | `\dot{x}` | $\ddot{x}$ | `\ddot{x}` | $\mathring{x}$ | `\mathring{x}` |
| $\mathbb{R}$ | `\mathbb{R}` | $\mathcal{F}$ | `\mathcal{F}` | $\mathscr{L}$ | `\mathscr{L}` |
| $\mathbf{v}$ | `\mathbf{v}` | $\bm{v}$ / $\bm{\sigma}$ | `\bm{v}` | $\mathrm{d}$ | `\mathrm{d}` |
| $\mathsf{A}$ | `\mathsf{A}` | $\mathfrak{g}$ | `\mathfrak{g}` | $\underline{x}$ | `\underline{x}` |

注：$\mathbf{v}$ 为直立粗体（多用于矩阵），$\bm{v}$ 为粗斜体（多用于矢量/张量，对希腊字母同样有效）。

## 微积分与级数

**极限与导数**（physics 宏包记号）：

$$
\lim_{n \to \infty} \left( 1 + \frac{1}{n} \right)^{n} = \mathrm{e},
\qquad
\dv{f}{x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h},
\qquad
\pdv{f}{x}, \quad \pdv{f}{x}{y}.
$$

```latex
\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^{n} = \ee
\dv{f}{x} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
\dv[2]{y}{x}      % 二阶导数
\pdv{f}{x}        % 偏导
\pdv{f}{x}{y}     % 混合偏导
\dd{f} = \pdv{f}{x} \dd{x} + \pdv{f}{y} \dd{y}   % 全微分
```

**求导法则**：

$$
\dv{y}{x} = \dv{y}{u} \dv{u}{x}, \qquad
(uv)' = u'v + uv', \qquad
\left( \frac{u}{v} \right)' = \frac{u'v - uv'}{v^{2}} .
$$

**积分**：

$$
\int_a^b f'(x) \dd{x} = f(b) - f(a), \qquad
\int u \dd{v} = uv - \int v \dd{u},
$$

$$
\oint_{\partial S} \mathbf{F} \cdot \dd{\mathbf{l}}, \qquad
\iint_{D} f \dd{A}, \qquad
\iiint_{V} \rho \dd{V},
$$

**变限积分求导**（莱布尼茨法则）：

$$
\dvop{x} \int_{a(x)}^{b(x)} f \dd{t}
= f!\left(b(x)\right) b'(x) - f!\left(a(x)\right) a'(x)

+ \int_{a(x)}^{b(x)} \pdv{f}{x} \dd{t}.
$$

**三大积分定理**（记号 $\dd{\mathbf{A}} = \hat{\mathbf{n}} \dd{A}$）：

$$
\begin{aligned}
\oint_{\partial D} \left( L \dd{x} + M \dd{y} \right)
  &= \iint_{D} \left( \pdv{M}{x} - \pdv{L}{y} \right) \dd{A} && \text{格林公式},\
\oint_{\partial S} \mathbf{F} \cdot \dd{\mathbf{l}}
  &= \iint_{S} (\curl \mathbf{F}) \cdot \dd{\mathbf{A}} && \text{斯托克斯公式},\
\iint_{\partial V} \mathbf{F} \cdot \dd{\mathbf{A}}
  &= \iiint_{V} \divergence \mathbf{F} \dd{V} && \text{高斯散度定理}.
\end{aligned}
$$

**常用级数与展开**（均在收敛域内）：

$$
\mathrm{e}^{x} = \sum_{n=0}^{\infty} \frac{x^{n}}{n!}, \qquad
\frac{1}{1-x} = \sum_{n=0}^{\infty} x^{n} \ (|x|<1), \qquad
(1+x)^{\alpha} = \sum_{n=0}^{\infty} \binom{\alpha}{n} x^{n}.
$$

$$
\sin x = \sum_{n=0}^{\infty} \frac{(-1)^{n} x^{2n+1}}{(2n+1)!}, \qquad
\cos x = \sum_{n=0}^{\infty} \frac{(-1)^{n} x^{2n}}{(2n)!}, \qquad
\ln (1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1} x^{n}}{n}.
$$

**泰勒公式**（$\xi$ 介于 $a$ 与 $x$ 之间）：

$$
f(x) = \sum_{n=0}^{N} \frac{f^{(n)}(a)}{n!} (x-a)^{n}

+ \frac{f^{(N+1)}(\xi)}{(N+1)!} (x-a)^{N+1}.
$$

**几类重要积分**：

$$
\int_{-\infty}^{\infty} \mathrm{e}^{-x^{2}} \dd{x} = \sqrt{\pi}, \qquad
\Gamma(z) = \int_0^{\infty} t^{z-1} \mathrm{e}^{-t} \dd{t} \ (\operatorname{Re} z > 0),
$$

$$
\Gamma(z+1) = z \Gamma(z), \qquad
\Gamma(n+1) = n!, \qquad
\Gamma!\left( \tfrac{1}{2} \right) = \sqrt{\pi}.
$$

**斯特林公式**（物理中常用 $\ln N! \approx N \ln N - N$）：

$$
\ln N! = N \ln N - N + O(\ln N).
$$

**傅里叶变换**（对称约定）与帕塞瓦尔恒等式：

$$
\hat{f}(\omega) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} f(t) \mathrm{e}^{-\mathrm{i}\omega t} \dd{t},
\qquad
f(t) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} \hat{f}(\omega) \mathrm{e}^{\mathrm{i}\omega t} \dd{\omega},
$$

$$
\int_{-\infty}^{\infty} \abs{f(t)}^{2} \dd{t} = \int_{-\infty}^{\infty} \abs{\hat{f}(\omega)}^{2} \dd{\omega}.
$$

**渐近记号**：$f = O(g)$（同阶或更小），$f = o(g)$（高阶小），$f \sim g$（等价），例如 $1 - \cos x \sim \dfrac{x^{2}}{2}\ (x \to 0)$。

## 线性代数

**矩阵环境**（定界符不同）：

$$
\begin{pmatrix} a & b \ c & d \end{pmatrix} \quad
\begin{bmatrix} a & b \ c & d \end{bmatrix} \quad
\begin{vmatrix} a & b \ c & d \end{vmatrix} = ad - bc \quad
\begin{Bmatrix} a & b \ c & d \end{Bmatrix}
$$

```latex
\begin{pmatrix} a & b \ c & d \end{pmatrix}   % 圆括号
\begin{bmatrix} a & b \ c & d \end{bmatrix}   % 方括号
\begin{vmatrix} a & b \ c & d \end{vmatrix}   % 竖线(行列式)
\begin{Bmatrix} a & b \ c & d \end{Bmatrix}   % 花括号
行间省略号: \cdots  \vdots  \ddots ;  行内小矩阵: smallmatrix 环境
```

含省略号的一般矩阵与增广矩阵（`array` 环境自己画竖线）：

$$
A = \begin{pmatrix}
a_{11} & \cdots & a_{1n} \
\vdots & \ddots & \vdots \
a_{m1} & \cdots & a_{mn}
\end{pmatrix},
\qquad
\left[\begin{array}{cc|c}
1 & 2 & 3 \ 4 & 5 & 6
\end{array}\right].
$$

**常用记号**：

$$
A^{\mathsf T} \ (\text{转置}), \quad
A^{\dagger} \ (\text{共轭转置}), \quad
A^{-1} \ (\text{逆}), \quad
\det A, \quad
\operatorname{tr} A = \sum_i a_{ii}, \quad
\norm{\mathbf{v}}_2, \ \norm{A}_F .
$$

**特征值与对角化**：

$$
A \mathbf{v} = \lambda \mathbf{v}, \qquad
\det(\lambda I - A) = 0, \qquad
A = P D P^{-1}, \qquad
A_{\text{对称}} = Q \Lambda Q^{\mathsf T}, \qquad
\operatorname{rank} A + \dim \ker A = n .
$$

**复数记号**：$z = a + b,\mathrm{i}$，$\abs{z}^{2} = z \bar{z}$，$\mathrm{e}^{\mathrm{i}\theta} = \cos\theta + \mathrm{i} \sin\theta$，欧拉公式逆用得 $\cos\theta = \dfrac{\mathrm{e}^{\mathrm{i}\theta} + \mathrm{e}^{-\mathrm{i}\theta}}{2}$。

**张量与指标记号**（爱因斯坦求和约定，重复指标求和）：

$$
\delta_{ij} =
\begin{cases} 1, & i = j \ 0, & i \ne j \end{cases}
\qquad
\epsilon_{123} = 1 \ (\text{全反对称}), \qquad
\epsilon_{ijk} \epsilon_{lmk} = \delta_{il} \delta_{jm} - \delta_{im} \delta_{jl},
$$

$$
T = T_{ij} , \mathbf{e}_i \otimes \mathbf{e}_j, \qquad
(\mathbf{a} \times \mathbf{b})_i = \epsilon_{ijk} a_j b_k .
$$

## 概率统计

**基本公式**：

$$
P(A \mid B) = \frac{P(AB)}{P(B)}, \qquad
P(B) = \sum_i P(B \mid A_i) P(A_i), \qquad
P(A_i \mid B) = \frac{P(B \mid A_i) P(A_i)}{\sum_j P(B \mid A_j) P(A_j)} .
$$

（末式为贝叶斯公式；`\mid` 竖线两侧间距正确，优于直接打 `|`。）

**数字特征**：期望 $\ev{X} = \sum_x x p(x)$；

$$
\mathrm{Var}(X) = \ev{X^{2}} - \ev{X}^{2}, \qquad
\mathrm{Cov}(X, Y) = \ev{XY} - \ev{X}\ev{Y}, \qquad
\rho_{XY} = \frac{\mathrm{Cov}(X,Y)}{\sigma_X \sigma_Y}.
$$

$X \perp Y$（独立）时 $P(AB) = P(A)P(B)$，且 $\mathrm{Cov}(X,Y) = 0$（反之不成立）。

**常用分布**：

$$
\begin{aligned}
\text{二项 } B(n,p)\text{:}\quad & P(X=k) = \binom{n}{k} p^{k} (1-p)^{n-k},
\quad \ev{X} = np, \ \mathrm{Var} = np(1-p); \
\text{泊松 } \mathrm{Pois}(\lambda)\text{:}\quad & P(X=k) = \frac{\lambda^{k} \mathrm{e}^{-\lambda}}{k!},
\quad \ev{X} = \mathrm{Var}(X) = \lambda; \
\text{指数}\text{:}\quad & f(x) = \lambda \mathrm{e}^{-\lambda x} \ (x \ge 0),
\quad \ev{X} = \frac{1}{\lambda}, \ \mathrm{Var} = \frac{1}{\lambda^{2}}; \
\text{正态 } N(\mu, \sigma^{2})\text{:}\quad & f(x) = \frac{1}{\sigma \sqrt{2\pi}}
\exp!\left[ -\frac{(x-\mu)^{2}}{2\sigma^{2}} \right],
\quad Z = \frac{X - \mu}{\sigma} \sim N(0,1).
\end{aligned}
$$

**极限定理**：

$$
\lim_{n \to \infty} P!\left( \abs{\bar{X}_n - \mu} > \varepsilon \right) = 0
\ \text{(弱大数定律)}, \qquad
\frac{\sqrt{n}, (\bar{X}_n - \mu)}{\sigma} \xrightarrow{\ d\ } N(0,1)
\ \text{(中心极限定理)} .
$$

**切比雪夫不等式**：$P( \abs{X - \ev{X}} \ge k \sigma ) \le \dfrac{1}{k^{2}}$。

## 物理专题

**矢量与场算子**：

$$
\mathbf{F} = q \left( \mathbf{E} + \mathbf{v} \times \mathbf{B} \right), \qquad
\grad \psi = \nabla \psi, \qquad
\laplacian \phi = -\frac{\rho}{\varepsilon_0} \ \text{(泊松方程)} .
$$

```latex
\vb{E}        % 粗体矢量(无箭头)   \va{E}  % 箭头矢量
\vu{n}        % 单位向量(帽)       \vdot \cross   % 点乘 叉乘
\grad \psi    % 梯度   \div \vb{E}    % 散度   \curl \vb{B}   % 旋度
\laplacian    % 拉普拉斯算子 (nabla 的平方)
```

（网页版中 `\vb{E}` 对应 `\mathbf{E}`，`\vu{n}` 对应 `\hat{\mathbf{n}}`。）

**麦克斯韦方程组**（微分形式，SI 制）：

$$
\begin{aligned}
\divergence \mathbf{E} &= \frac{\rho}{\varepsilon_0}, & \divergence \mathbf{B} &= 0,\
\curl \mathbf{E} &= - \pdv{\mathbf{B}}{t}, & \curl \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \pdv{\mathbf{E}}{t}.
\end{aligned}
$$

积分形式（对应地）：$\iint_{\partial V} \mathbf{E} \cdot \dd{\mathbf{A}} = Q_{\text{enc}} / \varepsilon_0$，$\oint_{\partial S} \mathbf{E} \cdot \dd{\mathbf{l}} = - \dvop{t} \iint_S \mathbf{B} \cdot \dd{\mathbf{A}}$ 等，结合前文三大积分定理即可互推。

**量子力学**：

$$
\mathrm{i} \hbar \pdv{\Psi}{t} = \hat{H} \Psi, \qquad
\hat{H} \psi = E \psi, \qquad
\comm{\hat{x}}{\hat{p}} = \mathrm{i} \hbar, \qquad
\sigma_x \sigma_p \ge \frac{\hbar}{2},
$$

$$
E_n = \frac{n^{2} \pi^{2} \hbar^{2}}{2 m L^{2}} \ \text{(无限深势阱)}, \qquad
E_n = \left( n + \tfrac{1}{2} \right) \hbar \omega \ \text{(谐振子)},
$$

$$
\ev{\hat{H}} = \mel{\psi}{\hat{H}}{\psi}.
$$

```latex
\comm{\hat{x}}{\hat{p}}                  % 对易子 [x,p] (physics 提供)
\acomm{A}{B}                             % 反对易子 {A,B}
\bra{\phi} \ket{\psi} \braket{\phi|\psi} % 狄拉克符号
\mel{a}{A}{b}                            % 矩阵元 <a|A|b>
\ev{\hat{H}} 或 \ev{\hat{H}}{\psi}       % 期望值
\fdv{F[f]}{f(x)}                         % 泛函导数
```

**分析力学**：

$$
\pdv{L}{q} - \dvop{t} \pdv{L}{\dot{q}} = 0 \ \text{(欧拉--拉格朗日方程)}, \qquad
H = \sum_i p_i \dot{q}_i - L, \qquad
\dot{q}_i = \pdv{H}{p_i}, \quad \dot{p}_i = -\pdv{H}{q_i} .
$$

**狭义相对论**（$\beta = v/c$）：

$$
\gamma = \frac{1}{\sqrt{1 - \beta^{2}}}, \qquad
\Delta t = \gamma \Delta \tau, \qquad
L = \frac{L_0}{\gamma}, \qquad
E = \gamma m c^{2}, \quad \mathbf{p} = \gamma m \mathbf{v}, \quad
E^{2} = (pc)^{2} + (m c^{2})^{2}.
$$

（无质量粒子 $m = 0$ 时 $E = pc$；$\Delta \tau$ 为固有时，$L_0$ 为固有长度。）

**热学与统计物理**：

$$
p V = N k_B T, \quad
\dd{U} = T \dd{S} - p \dd{V}, \quad
S = k_B \ln \Omega, \quad
Z = \sum_i g_i \mathrm{e}^{-E_i / k_B T}, \quad
F = -k_B T \ln Z ,
$$

其中 $\beta = 1 / k_B T$（$Z$ 为配分函数，$g_i$ 为能级简并度）。

$$
\dv{N}{v} = 4 \pi N \left( \frac{m}{2 \pi k_B T} \right)^{3/2}
v^{2} \exp!\left( - \frac{m v^{2}}{2 k_B T} \right)
\quad \text{(麦克斯韦速率分布)} .
$$

**单位与数值**（siunitx）：

- 数值+单位：`\qty{9.81}{m/s^2}` 得 $g = \qty{9.81}{m/s^2}$；
- 纯数值（自动千分位）与纯单位：`\num{299792458}` 得 299 792 458，`\unit{kg.m/s}` 得 kg·m/s；
- 角度：`\ang{90}` 得 $90^\circ$；
- 不确定度：`\qty{9.8 +- 0.1}{m/s^2}` 默认得紧凑式 $g = \qty{9.8 \pm 0.1}{m/s^2}$；加选项 `[separate-uncertainty=true]` 则显式用 $\pm$ 分隔。

## 多行公式环境速查

| 环境 | 用途 |
| --- | --- |
| `align` / `align*` | 多行对齐，`&` 指定对齐点，`\` 换行 |
| `gather` / `gather*` | 多行居中，无对齐点 |
| `split` | 长公式拆行（须外套 `equation`），整体单编号 |
| `multline` | 首行左对齐、末行右对齐的长公式 |
| `cases` | 分段函数 / 分类讨论 |
| `subequations` | 编号 (1a) (1b) 型子公式 |
| `aligned` / `gathered` | 行内/表格中嵌套的多行公式 |

align 完整示例（含编号控制）：

```latex
\begin{align}
  \int_0^\infty \mathrm{e}^{-x^2} \dd{x}
    &= \frac{1}{2} \int_0^\infty t^{-1/2} \mathrm{e}^{-t} \dd{t} \notag\
    &= \frac{1}{2} \Gamma\!\left(\frac{1}{2}\right) = \frac{\sqrt{\pi}}{2}
\end{align}
% \notag 或 \nonumber 取消本行编号; 整块不编号用 align*
```

## 定理环境与交叉引用

模板导言区已定义 8 种环境，正文直接使用：

```latex
\begin{theorem}[可选标题]\label{thm:xxx}
  ... 定理内容 ...
\end{theorem}
\begin{proof}
  ... 证明过程 ... (自动加证毕符号; 末行是公式时用 \qedhere)
\end{proof}
```

可用环境：`theorem` 定理、`lemma` 引理、`corollary` 推论、`proposition` 命题、`definition` 定义、`example` 例、`problem` 习题、`remark` 注（不编号），另有 `solution` 解（不编号）。前六种共用同一编号，习题单独编号，均按（节.序号）分层。

交叉引用：先 `\label{eq:xxx}`，再 `\cref{eq:xxx}`（自动带"式/定理"等前缀），或传统 `\eqref`/`\ref`；新增/删除公式后需再编译一遍更新编号。

## 已知冲突与排坑清单

1. **physics 与 siunitx 的 `\qty` 冲突**：两包都定义 `\qty`；同时加载时 siunitx 会主动让位。模板采用 siunitx 官方方案，在导言区加 `\AtBeginDocument{\RenewCommandCopy\qty\SI}` 恢复 `\qty{数}{单位}`；此时 physics 的 `\qty(...)` 自动定界语法不可用，请改用 `\left(...\right)`。
2. \*\*`\div` 被 physics 重定义为"散度"\*\*：原除号 ÷ 已在加载前保存为 `\divisionsign`。
3. **`\Re` 与 `\Im` 被 physics 重定义**为 $\Re(z)$、$\Im(z)$ 算符形式（原定义保存为 `\real` 与 `\imaginary`）。
4. **乘号与字母**：乘号 $\times$ 用 `\times`，不要打字母 x；点乘用 `\cdot`，叉乘用 `\cross` 或 `\times`。
5. **粗体**：`\mathbf{v}` 不作用于希腊字母且为直立体；矢量/张量建议用 `\bm{v}`、`\bm{\sigma}`。
6. **`\verb` 分隔符**：`\verb` 后的分隔字符不能出现在代码内，如 `\braket{\phi|\psi}` 含竖线，须换用 `!` 等作分隔符。
7. **编号与引用**：目录、公式编号、交叉引用需要**编译两遍**才稳定；latexmk 或 VS Code 的 LaTeX Workshop 会自动处理。
8. **中文排版**：中西文间距由 ctex 自动处理；公式内用半角标点，必要时以 `\,` 微调间距。

## 延伸资源

- 本机文档：终端运行 `texdoc ctex`、`texdoc physics`、`texdoc siunitx`、`texdoc lshort-zh-cn`（中文入门小册子）；
- 宏包仓库：[CTAN](https://ctan.org)（搜索宏包名）；
- 在线编辑：[Overleaf 文档](https://overleaf.com/learn)（LaTeX 与数学排版教程）。
