<script lang="ts">
	import cn from 'clsx';

	import { introOutStore } from '$lib/stores/introOut';
</script>

<div class={cn('hide-text', $introOutStore && 'show-text')}>
	<slot />
</div>

<style lang="scss">
	@import '../styles/_functions';

	$delay-intro-top: 450ms;
	$intro-duration: 2050ms;

	.hide-text {
		overflow: hidden;

		@include desktop {
			> * {
				transform: translate3d(0, 200%, 0);
			}
		}
	}

	.show-text {
		@include desktop {
			> * {
				transform: translate3d(0, 0, 0);
				transition: transform $intro-duration var(--ease-out-expo);
				transition-delay: $delay-intro-top;
			}
		}
	}
</style>
