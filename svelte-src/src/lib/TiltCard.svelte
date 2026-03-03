<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	let card: HTMLDivElement;
	let isMobile = $state(true);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let highlightX = $state(50);
	let highlightY = $state(50);
	let isHovering = $state(false);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (prefersReducedMotion || isTouch) return;
		isMobile = false;
	});

	function handleMouseMove(e: MouseEvent) {
		if (isMobile || !card) return;
		const rect = card.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		tiltY = (mouseX / (rect.width / 2)) * 8;
		tiltX = -(mouseY / (rect.height / 2)) * 8;

		highlightX = ((e.clientX - rect.left) / rect.width) * 100;
		highlightY = ((e.clientY - rect.top) / rect.height) * 100;
		isHovering = true;
	}

	function handleMouseLeave() {
		tiltX = 0;
		tiltY = 0;
		isHovering = false;
	}
</script>

<div
	bind:this={card}
	class="tilt-wrapper {className}"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	role="presentation"
	style="perspective: 1000px;"
>
	<div
		class="tilt-inner"
		style="transform: rotateX({tiltX}deg) rotateY({tiltY}deg);"
		class:hovering={isHovering}
	>
		{@render children?.()}
		{#if isHovering && !isMobile}
			<div
				class="specular-highlight"
				style="background: radial-gradient(circle at {highlightX}% {highlightY}%, rgba(255, 200, 150, 0.08) 0%, transparent 60%);"
			></div>
		{/if}
	</div>
</div>

<style>
	.tilt-wrapper {
		width: 100%;
	}

	.tilt-inner {
		transition: transform 0.15s ease-out;
		position: relative;
		transform-style: preserve-3d;
	}

	.tilt-inner:not(.hovering) {
		transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.specular-highlight {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-lg, 16px);
		pointer-events: none;
		z-index: 10;
	}
</style>
