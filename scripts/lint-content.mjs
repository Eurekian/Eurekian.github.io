// 内容自检：拦截后台富文本编辑器对 Markdown/LaTeX 的典型破坏。
// 规则来自两次真实事故（e9e6f72 物理篇、961a626 速查表）的特征，
// 并已验证：对历史事故 100% 命中，对现有内容零误报。
// 由 npm run build 在 astro build 之前执行；发现问题即退出非零 → CI 红灯 → 不部署。
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_ROOT = 'src/content';

const RULES = [
	{
		name: '转义反引号（\\`）',
		// 单个反斜杠+反引号；用负向后顾排除合法的代码 span `\\`（LaTeX 换行）
		re: /(?<!\\)\\`/g,
		hint: '后台富文本保存时会把表格代码单元格里插入转义反引号，应恢复为普通反引号',
	},
	{
		name: '连续两个逗号（,,）',
		re: /,,/g,
		hint: '疑似 \\,（数学负空格）被富文本吃成普通逗号，如 (S,\\, S) 变 (S,, S)',
	},
	{
		name: 'TeX 命令紧跟感叹号（如 \\exp!）',
		re: /\\[a-zA-Z]+!/g,
		hint: '疑似 \\!（负空格）被吃掉反斜杠，如 \\exp\\! 变 \\exp!',
	},
];

// readdirSync 递归版（不引入额外依赖）
function walkDir(dir) {
	const entries = readdirSync(dir, { withFileTypes: true });
	const files = [];
	for (const e of entries) {
		if (e.isDirectory()) files.push(...walkDir(join(dir, e.name)));
		else if (e.name.endsWith('.md')) files.push(join(dir, e.name));
	}
	return files;
}

const issues = [];
for (const file of walkDir(CONTENT_ROOT)) {
	const lines = readFileSync(file, 'utf8').split('\n');
	lines.forEach((line, i) => {
		for (const rule of RULES) {
			rule.re.lastIndex = 0;
			if (rule.re.test(line)) {
				issues.push({
					file,
					lineNo: i + 1,
					rule: rule.name,
					hint: rule.hint,
					snippet: line.trim().slice(0, 90),
				});
			}
		}
	});
}

if (issues.length > 0) {
	console.error(`\n[内容自检] 发现 ${issues.length} 处疑似富文本损坏：\n`);
	for (const it of issues) {
		console.error(`  ✗ ${it.file}:${it.lineNo}  [${it.rule}]`);
		console.error(`    ${it.snippet}`);
		console.error(`    → ${it.hint}\n`);
	}
	console.error('修复后重新保存/推送才会部署。若确认是误报，调整 scripts/lint-content.mjs 的规则。');
	process.exit(1);
}

console.log('[内容自检] 通过：未发现富文本损坏特征。');
