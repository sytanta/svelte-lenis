<script lang="ts">
	let className = '';

	export { className as class };
	export let href = '';
	export let scroll = false;
	export let shallow = false;

	const SHALLOW_URLS = ['?demo=true'];

	const needsShallow = !!SHALLOW_URLS.find((url) => href?.includes(url));

	const isProtocol = href?.startsWith('mailto:') || href?.startsWith('tel:');
	const isAnchor = href?.startsWith('#');
	const isExternal = href?.startsWith('http');
</script>

{#if typeof href !== 'string'}
	<button class={className}><slot /></button>
{:else if isProtocol || isExternal}
	<a class={className} {href} target="_blank" rel="noopener noreferrer">
		<slot />
	</a>
{:else}
	<a class={className} {href}>
		<slot />
	</a>
{/if}
