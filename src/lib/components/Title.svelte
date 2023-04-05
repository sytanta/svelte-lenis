<script lang="ts">
	import cn from 'clsx';

	import { introOutStore } from '$lib/stores/introOut';

	import Lns from './LNS.svelte';
	import Ei from './EI.svelte';

	let className = '';

	export { className as class };
</script>

<div class={className}>
	<Lns fill="var(--pink)" />
	<Ei fill="var(--pink)" class={cn($introOutStore && 'translate', 'mobile')} />
</div>

<style lang="scss">
	@import '../styles/_functions';

	$intro-out: 1500ms;

	:global(.translate) {
		@include desktop {
			transform: translate3d(0, -100%, 0);
			transition: transform $intro-out var(--ease-out-expo);
		}
	}

	:global(.mobile) {
		@include mobile {
			transform: translate3d(0, -105%, 0);
		}
	}
</style>
