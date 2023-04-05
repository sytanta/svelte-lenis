const imports: Record<string, Promise<any>> = {};

export async function dynamicImport(module: string, promise: Promise<any>) {
	imports[module] = promise;
	return (await promise).default;
}

export async function waitForImports(modules: string[]) {
	console.log('zzzzzzzz', Object.keys(imports));
	return await Promise.all(modules.map((mod) => imports[mod]).filter(Boolean));
}
