// 把 KaTeX 的样式与字体从 node_modules 复制到 public/katex/（自托管，避免第三方 CDN）。
// 由 package.json 的 prebuild/predev 钩子调用，保证与安装的 katex 版本一致。
import { cpSync, mkdirSync, rmSync } from 'node:fs';

rmSync('public/katex', { recursive: true, force: true });
mkdirSync('public/katex', { recursive: true });
cpSync('node_modules/katex/dist/katex.min.css', 'public/katex/katex.min.css');
cpSync('node_modules/katex/dist/fonts', 'public/katex/fonts', { recursive: true });
console.log('katex assets copied to public/katex/');
