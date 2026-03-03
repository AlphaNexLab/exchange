<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		text: string;
		label: string;
	}

	let { text, label }: Props = $props();

	let element: HTMLDivElement;
	let displayed = $state('');
	let hasAnimated = $state(false);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			displayed = text;
			hasAnimated = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						hasAnimated = true;
						observer.unobserve(entry.target);
						typewriterEffect();
					}
				});
			},
			{ threshold: 0.5 }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});

	function typewriterEffect() {
		let i = 0;
		const interval = setInterval(() => {
			if (i <= text.length) {
				displayed = text.slice(0, i);
				i++;
			} else {
				clearInterval(interval);
			}
		}, 80);
	}
</script>

<div bind:this={element} class="animated-counter" class:visible={hasAnimated}>
	<span class="counter-value">
		{displayed}<span class="cursor-blink" class:done={displayed === text}>|</span>
	</span>
	<span class="counter-label">{label}</span>
</div>

<style>
	.animated-counter {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.counter-value {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--text-primary);
	}

	.cursor-blink {
		display: inline-block;
		color: var(--orange-400);
		animation: blink 0.6s step-end infinite;
	}

	.cursor-blink.done {
		animation: blink 0.6s step-end 3;
		animation-fill-mode: forwards;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.counter-label {
		font-size: 0.8rem;
		color: var(--text-muted);
	}
</style>
