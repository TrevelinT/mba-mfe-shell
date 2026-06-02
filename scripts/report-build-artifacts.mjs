import {
	appendFileSync,
	existsSync,
	readdirSync,
	readFileSync,
	statSync,
} from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const distDir = "dist";

function formatBytes(bytes) {
	if (bytes < 1024) {
		return `${bytes} B`;
	}

	if (bytes < 1024 * 1024) {
		return `${(bytes / 1024).toFixed(1)} KB`;
	}

	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function collectFiles(dir, baseDir = dir) {
	const entries = readdirSync(dir, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			files.push(...collectFiles(fullPath, baseDir));
			continue;
		}

		if (!entry.isFile()) {
			continue;
		}

		const content = readFileSync(fullPath);
		files.push({
			relativePath: path.relative(baseDir, fullPath).replace(/\\/g, "/"),
			uncompressedBytes: statSync(fullPath).size,
			gzipBytes: gzipSync(content).length,
		});
	}

	return files;
}

function buildMarkdown(files) {
	const totalUncompressed = files.reduce(
		(sum, file) => sum + file.uncompressedBytes,
		0,
	);
	const totalGzip = files.reduce((sum, file) => sum + file.gzipBytes, 0);

	const rows = files
		.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
		.map(
			(file) =>
				`| ${file.relativePath} | ${formatBytes(file.uncompressedBytes)} | ${formatBytes(file.gzipBytes)} |`,
		);

	rows.push(
		`| **Total (${files.length} files)** | **${formatBytes(totalUncompressed)}** | **${formatBytes(totalGzip)}** |`,
	);

	return [
		"## Shell build artifacts",
		"",
		"| File | Uncompressed | Gzip |",
		"|------|--------------|------|",
		...rows,
		"",
		"Uploaded artifact: **shell-dist** (downloadable from the Actions run page).",
		"",
	].join("\n");
}

if (!existsSync(distDir)) {
	throw new Error(
		`Missing build output: ${distDir}. Run "npm run build" first.`,
	);
}

const files = collectFiles(distDir);

if (files.length === 0) {
	throw new Error(`No files found in ${distDir}. Run "npm run build" first.`);
}

const markdown = buildMarkdown(files);
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

if (summaryPath) {
	appendFileSync(summaryPath, markdown);
} else {
	console.log(markdown);
}
