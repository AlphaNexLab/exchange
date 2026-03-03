<script lang="ts">
	import { onMount } from 'svelte';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let visible = $state(false);
	let isMobile = $state(true);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (prefersReducedMotion || isTouch) return;
		isMobile = false;

		let targetX = 0, targetY = 0;

		const onMouseMove = (e: MouseEvent) => {
			targetX = e.clientX;
			targetY = e.clientY;
			if (!visible) visible = true;
		};

		const onMouseLeave = () => { visible = false; };
		const onMouseEnter = () => { visible = true; };

		document.addEventListener('mousemove', onMouseMove, { passive: true });
		document.addEventListener('mouseleave', onMouseLeave);
		document.addEventListener('mouseenter', onMouseEnter);

		let animId: number;
		const lerp = () => {
			cursorX += (targetX - cursorX) * 0.15;
			cursorY += (targetY - cursorY) * 0.15;
			animId = requestAnimationFrame(lerp);
		};
		lerp();

		return () => {
			cancelAnimationFrame(animId);
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseleave', onMouseLeave);
			document.removeEventListener('mouseenter', onMouseEnter);
		};
	});
</script>

{#if !isMobile}
	<div
		class="custom-cursor"
		class:visible
		style="transform: translate({cursorX}px, {cursorY}px)"
	></div>
{/if}

<style>
	.custom-cursor {
		position: fixed;
		top: -12px;
		left: -12px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 109, 58, 0.5) 0%, rgba(255, 87, 34, 0.15) 50%, transparent 70%);
		pointer-events: none;
		z-index: 9999;
		opacity: 0;
		transition: opacity 0.3s;
		mix-blend-mode: screen;
		will-change: transform;
	}

	.custom-cursor.visible {
		opacity: 1;
	}
</style>
