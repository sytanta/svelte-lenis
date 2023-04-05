<script lang="ts">
</script>

<footer class="theme-light footer">
	<div class="layout-grid top hide-on-mobile">
		<p class="first-line h1">
			Lenis is <br />
			<span class="contrast">Open source</span>
		</p>
		<div class="shameless-plug">
			<p class="h4">Studio Freight</p>
			<p class="p-s">
				An independent creative <br /> studio built on principle
			</p>
		</div>
		<p class="last-line h1">
			& open to <span class="hide-on-desktop">&nbsp;</span> features,{' '}
			<br /> forks or prs &nbsp;
		</p>
		<!-- <Button
        class={s.cta}
        arrow
        icon={<GitHub />}
        href="https://github.com/studio-freight/lenis"
      >
        Let's build together
      </Button> -->
	</div>
	<div class="layout-block top hide-on-desktop">
		<div class="shameless-plug">
			<p class="h4">Studio Freight</p>
			<p class="p-s">
				An independent creative <br /> studio built on principle
			</p>
		</div>
		<p class="first-line h1">
			Lenis is <br />
			<span class="contrast">Open source</span>
			<br /> & open to <br /> features, forks or prs
		</p>
	</div>
	<div class="bottom">
		<div class="links">
			<a class="link p-xs" href="https://twitter.com/studiofreight">Twitter</a>
			<a class="link p-xs" href="https://github.com/studio-freight">GitHub</a>
			<a class="link p-xs" href="https://awwwards.com/studiofreight">Awwwards</a>
			<a class="link p-xs" href="https://studiofreight.com">Website</a>
			<a class="link p-xs" href="https://darkroom.studiofreight.com">Darkroom</a>
		</div>
		<p class="p-xs tm">
			<span>©</span>
			{new Date().getFullYear()} Studio Freight
		</p>
		<!-- <Button
        class={cn(s.cta, 'hide-on-desktop')}
        arrow
        icon={<GitHub />}
        href="https://github.com/studio-freight/lenis"
      >
        Let's build together
      </Button> -->
	</div>
</footer>

<style lang="scss">
	@import '../styles/_functions';

	.footer {
		// background-color: var(--theme-primary);
		color: var(--theme-secondary);
		padding: mobile-vw(20px) 0;
		height: calc(100 * var(--vh, 1vh));
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;

		@include desktop {
			height: 100vh;
			padding: desktop-vw(40px) 0;
		}

		.top {
			position: relative;
			height: 100%;
			width: 100%;
			padding-bottom: mobile-vw(20px);
			align-items: center;

			@include mobile {
				display: flex;
				flex-direction: column;
			}

			@include desktop {
				padding-bottom: desktop-vw(40px);
			}

			.first-line {
				margin: auto 0;

				@include desktop {
					margin: 0;
					align-self: start;
					grid-column: 1 / span 7;
				}
			}

			.shameless-plug {
				align-self: start;
				display: flex;
				flex-direction: column;

				@include desktop {
					text-align: end;
					grid-column: 9 / span 4;
				}

				p:first-child {
					margin-bottom: mobile-vw(8px);

					@include desktop {
						margin-bottom: desktop-vw(8px);
					}
				}
			}

			.cta {
				// this CTA is only rendered on desktop
				position: absolute;
				left: 0;
				bottom: desktop-vw(40px);
			}

			.last-line {
				// this line is only rendered on desktop
				text-align: end;
				align-self: end;
				grid-column: 2 / -1;
			}
		}

		.bottom {
			width: var(--layout-width);
			margin: 0 auto;

			@include mobile {
				display: grid;
				grid-template-columns: 1fr 1fr;
			}

			@include desktop {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.links {
				@include desktop {
					.link:not(:first-child) {
						margin: 0;
						margin-left: desktop-vw(32px);
					}
				}

				@include mobile {
					.link:not(:last-child) {
						display: block;
						margin-bottom: mobile-vw(16px);
					}
				}
			}

			.tm {
				@include mobile {
					text-align: end;
					align-self: end;
				}

				span {
					vertical-align: text-top;
				}
			}

			.cta {
				// this CTA is only rendered on mobile
				grid-column: 1 / -1;
				margin-top: mobile-vw(24px);
			}
		}
	}
</style>
