<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		href?: string;
		class?: string;
		target?: string;
		rel?: string;
		children?: import('svelte').Snippet;
	}

	let { href = '#', class: className = '', target = '', rel = '', children }: Props = $props();

	let btn: HTMLAnchorElement;
	let isMobile = $state(true);
	let translateX = $state(0);
	let translateY = $state(0);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (prefersReducedMotion || isTouch) return;
		isMobile = false;
	});

	function handleMouseMove(e: MouseEvent) {
		if (isMobile || !btn) return;
		const rect = btn.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const distX = e.clientX - centerX;
		const distY = e.clientY - centerY;

		// Max 8px displacement
		translateX = distX * 0.15;
		translateY = distY * 0.15;
		if (Math.abs(translateX) > 8) translateX = 8 * Math.sign(translateX);
		if (Math.abs(translateY) > 8) translateY = 8 * Math.sign(translateY);
	}

	function handleMouseLeave() {
		translateX = 0;
		translateY = 0;
	}
</script>

<a
	bind:this={btn}
	{href}
	class={className}
	target={target || undefined}
	rel={rel || undefined}
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	style="transform: translate({translateX}px, {translateY}px); transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);"
>
	{@render children?.()}
</a>
