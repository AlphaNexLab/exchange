<script lang="ts">
	// Live price ticker bar — Bloomberg-style scrolling marquee
	// Static/fake data, styled like a real terminal

	const tokens = [
		{ symbol: 'ERG', price: '$1.24', change: '+2.3%', positive: true },
		{ symbol: 'SigUSD', price: '$1.00', change: '0.0%', neutral: true },
		{ symbol: 'SigRSV', price: '$0.87', change: '-1.2%', positive: false },
		{ symbol: 'NETA', price: '$0.043', change: '+5.7%', positive: true },
		{ symbol: 'SPF', price: '$0.12', change: '+1.8%', positive: true },
		{ symbol: 'Comet', price: '$0.0021', change: '+12.4%', positive: true },
		{ symbol: 'BOBER', price: '$0.0008', change: '-3.1%', positive: false },
		{ symbol: 'ergopad', price: '$0.006', change: '+0.9%', positive: true },
	];
</script>

<div class="ticker-bar">
	<div class="ticker-track">
		{#each [0, 1] as _set}
			<div class="ticker-content" aria-hidden={_set === 1}>
				{#each tokens as token}
					<span class="ticker-item">
						<span class="ticker-symbol">{token.symbol}</span>
						<span class="ticker-price">{token.price}</span>
						<span
							class="ticker-change"
							class:positive={token.positive}
							class:negative={!token.positive && !token.neutral}
							class:neutral={token.neutral}
						>
							{#if token.positive}↑{:else if token.neutral}→{:else}↓{/if}{token.change}
						</span>
					</span>
					<span class="ticker-separator">·</span>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.ticker-bar {
		background: rgba(5, 5, 5, 0.95);
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		overflow: hidden;
		padding: 10px 0;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		position: relative;
		z-index: 50;
	}

	.ticker-track {
		display: flex;
		width: max-content;
		animation: tickerScroll 40s linear infinite;
	}

	.ticker-content {
		display: flex;
		align-items: center;
		gap: 0;
		flex-shrink: 0;
		padding-right: 0;
	}

	.ticker-item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		white-space: nowrap;
		padding: 0 4px;
	}

	.ticker-symbol {
		color: var(--text-primary);
		font-weight: 600;
	}

	.ticker-price {
		color: var(--text-secondary);
		font-weight: 400;
	}

	.ticker-change {
		font-weight: 500;
	}

	.ticker-change.positive {
		color: #4ade80;
	}

	.ticker-change.negative {
		color: #f87171;
	}

	.ticker-change.neutral {
		color: var(--text-muted);
	}

	.ticker-separator {
		color: rgba(255, 255, 255, 0.12);
		margin: 0 12px;
		font-size: 0.6rem;
	}

	@keyframes tickerScroll {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	@media (prefers-reduced-motion: reduce) {
		.ticker-track {
			animation: none !important;
		}
	}
</style>
