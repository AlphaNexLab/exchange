<script lang="ts">
	import { onMount } from 'svelte';

	const tokens = [
		{
			symbol: 'ERG', name: 'Ergo', color: '#FF6D3A',
			sparkline: 'M0,20 L5,18 L10,22 L15,16 L20,19 L25,14 L30,17 L35,12 L40,15 L45,10 L50,8'
		},
		{
			symbol: 'SigUSD', name: 'SigmaUSD', color: '#4ade80',
			sparkline: 'M0,14 L5,15 L10,14 L15,15 L20,14 L25,15 L30,14 L35,14 L40,15 L45,14 L50,14'
		},
		{
			symbol: 'SigRSV', name: 'SigmaRSV', color: '#fbbf24',
			sparkline: 'M0,10 L5,12 L10,14 L15,11 L20,16 L25,14 L30,18 L35,15 L40,20 L45,17 L50,19'
		},
		{
			symbol: 'NETA', name: 'NETA', color: '#818cf8',
			sparkline: 'M0,22 L5,18 L10,20 L15,14 L20,16 L25,10 L30,12 L35,8 L40,11 L45,6 L50,5'
		},
		{
			symbol: 'SPF', name: 'Spectrum', color: '#f472b6',
			sparkline: 'M0,15 L5,14 L10,16 L15,12 L20,14 L25,10 L30,13 L35,11 L40,9 L45,12 L50,8'
		},
		{
			symbol: 'Comet', name: 'Comet', color: '#38bdf8',
			sparkline: 'M0,20 L5,16 L10,18 L15,12 L20,15 L25,8 L30,11 L35,6 L40,10 L45,4 L50,3'
		},
		{
			symbol: 'BOBER', name: 'Bober', color: '#fb923c',
			sparkline: 'M0,8 L5,10 L10,12 L15,14 L20,11 L25,16 L30,14 L35,18 L40,16 L45,20 L50,18'
		},
		{
			symbol: 'ergopad', name: 'ErgoPad', color: '#a78bfa',
			sparkline: 'M0,18 L5,15 L10,17 L15,12 L20,14 L25,10 L30,12 L35,8 L40,10 L45,7 L50,9'
		},
	];

	let scrollContainer: HTMLDivElement;
	let translateX = $state(0);
	let sectionEl: HTMLElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

		if (prefersReducedMotion || isTouch) return;

		const onScroll = () => {
			if (!sectionEl) return;
			const rect = sectionEl.getBoundingClientRect();
			const vh = window.innerHeight;
			const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
			// Translate from 100px to -600px
			translateX = 100 - progress * 700;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section bind:this={sectionEl} id="assets" class="token-showcase-section" style="scroll-margin-top: 80px;">
	<div class="container">
		<span class="section-label">Token Support</span>
		<h2 class="section-title">Supported Assets</h2>
		<p class="section-subtitle">Trade the core Ergo ecosystem tokens with more coming soon.</p>
	</div>

	<div class="showcase-track-wrapper">
		<div
			bind:this={scrollContainer}
			class="showcase-track"
			style="transform: translateX({translateX}px);"
		>
			{#each tokens as token}
				<div class="showcase-card">
					<div class="showcase-icon" style="background: {token.color}20; border-color: {token.color}40;">
						<span class="showcase-symbol" style="color: {token.color};">{token.symbol.charAt(0)}</span>
					</div>
					<h3 class="showcase-name">{token.name}</h3>
					<span class="showcase-ticker">{token.symbol}</span>
					<svg class="showcase-sparkline" viewBox="0 0 50 24" preserveAspectRatio="none">
						<path d={token.sparkline} fill="none" stroke={token.color} stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
					</svg>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.token-showcase-section {
		padding: 120px 24px 120px;
		overflow: hidden;
		position: relative;
		background: #080808;
	}

	.token-showcase-section > .container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: var(--max-width);
		margin: 0 auto;
		margin-bottom: 3rem;
	}

	.showcase-track-wrapper {
		overflow: hidden;
		width: 100%;
		padding: 20px 0;
	}

	.showcase-track {
		display: flex;
		gap: 24px;
		padding: 0 48px;
		transition: transform 0.1s linear;
		will-change: transform;
	}

	.showcase-card {
		flex-shrink: 0;
		width: 200px;
		background: rgba(18, 18, 18, 0.7);
		backdrop-filter: blur(12px);
		border: 1px solid var(--border-card);
		border-radius: var(--radius-lg);
		padding: 28px 20px;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.showcase-card:hover {
		background: rgba(24, 24, 24, 0.85);
		border-color: rgba(255, 109, 58, 0.2);
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
	}

	.showcase-icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 12px;
		border: 2px solid;
	}

	.showcase-symbol {
		font-family: var(--font-mono);
		font-size: 1.3rem;
		font-weight: 700;
	}

	.showcase-name {
		font-family: var(--font-mono);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.showcase-ticker {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-muted);
		display: block;
		margin-bottom: 12px;
	}

	.showcase-sparkline {
		width: 100%;
		height: 24px;
	}

	@media (max-width: 768px) {
		.token-showcase-section {
			padding: 80px 16px;
		}

		.showcase-track {
			padding: 0 16px;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			scroll-snap-type: x mandatory;
		}

		.showcase-card {
			width: 170px;
			scroll-snap-align: start;
		}
	}
</style>
