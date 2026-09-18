// 把 Sveltia CMS 运行时从 node_modules 复制到 public/admin/lib/（自托管，避免第三方 CDN）。
// 由 package.json 的 prebuild/predev 钩子调用；lib/ 已被 .gitignore 排除，CI 上重新生成。
import { cpSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';

rmSync('public/admin/lib', { recursive: true, force: true });
mkdirSync('public/admin/lib', { recursive: true });

// ESM 版：动态 chunk（react-dom）按相对路径解析，随 lib/ 一起部署
copyFileSync('node_modules/@sveltia/cms/dist/sveltia-cms.mjs', 'public/admin/lib/sveltia-cms.mjs');
cpSync('node_modules/@sveltia/cms/dist/chunks', 'public/admin/lib/chunks', {
	recursive: true,
	filter: (src) => !src.endsWith('.map'),
});

console.log('sveltia cms runtime copied to public/admin/lib/');
