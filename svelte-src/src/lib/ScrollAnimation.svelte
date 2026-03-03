<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
		delay?: number;
		duration?: number;
		threshold?: number;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		animation = 'slide-up',
		delay = 0,
		duration = 600,
		threshold = 0.15,
		class: className = '',
		children
	}: Props = $props();

	let element: HTMLDivElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class="scroll-animation {animation} {className}"
	class:visible
	style="transition-delay: {delay}ms; transition-duration: {duration}ms;"
>
	{@render children?.()}
</div>

<style>
	.scroll-animation {
		transition-property: opacity, transform;
		transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
		will-change: opacity, transform;
		width: 100%;
	}

	.scroll-animation.fade {
		opacity: 0;
	}
	.scroll-animation.fade.visible {
		opacity: 1;
	}

	.scroll-animation.slide-up {
		opacity: 0;
		transform: translateY(40px);
	}
	.scroll-animation.slide-up.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.scroll-animation.slide-left {
		opacity: 0;
		transform: translateX(-40px);
	}
	.scroll-animation.slide-left.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.scroll-animation.slide-right {
		opacity: 0;
		transform: translateX(40px);
	}
	.scroll-animation.slide-right.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.scroll-animation.scale {
		opacity: 0;
		transform: scale(0.9);
	}
	.scroll-animation.scale.visible {
		opacity: 1;
		transform: scale(1);
	}
</style>
