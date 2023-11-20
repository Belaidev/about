import fs from 'fs/promises';
import path from 'path';

async function createIndexForDirectory(directoryPath: string) {
	try {
		const files = await fs.readdir(directoryPath);
		const tsFiles = files.filter(
			(file) => (file.endsWith('.ts') || file.endsWith('.tsx')) && !file.startsWith('index.')
		);

		const importStatements = tsFiles
			.map((file) => {
				const moduleName = path.basename(file, path.extname(file));
				return `export * from './${moduleName}';`;
			})
			.join('\n');

		await fs.writeFile(path.join(directoryPath, 'index.ts'), importStatements);
		console.log(`index.ts created successfully in ${directoryPath}.`);
	} catch (err) {
		console.error(`Error processing directory ${directoryPath}:`, err);
	}
}

async function main() {
	const directoryPaths = process.argv.slice(2);

	if (directoryPaths.length === 0) {
		console.error('Please provide at least one directory path as an argument.');
		return;
	}

	for (const directoryPath of directoryPaths) {
		await createIndexForDirectory(directoryPath);
	}
}

main();
