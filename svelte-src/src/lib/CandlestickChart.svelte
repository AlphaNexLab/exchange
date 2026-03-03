<script lang="ts">
	// Animated SVG candlestick chart — decorative hero accent
	// 10 candles with a moving price line overlay

	const candles = [
		{ open: 65, close: 80, high: 88, low: 60, green: true },
		{ open: 80, close: 72, high: 85, low: 68, green: false },
		{ open: 72, close: 78, high: 82, low: 65, green: true },
		{ open: 78, close: 70, high: 83, low: 66, green: false },
		{ open: 70, close: 85, high: 90, low: 68, green: true },
		{ open: 85, close: 82, high: 92, low: 78, green: false },
		{ open: 82, close: 95, high: 98, low: 80, green: true },
		{ open: 95, close: 88, high: 100, low: 85, green: false },
		{ open: 88, close: 105, high: 110, low: 86, green: true },
		{ open: 105, close: 102, high: 112, low: 98, green: false },
	];

	// Map values: input range ~55-115, output to SVG coords (y inverted)
	// SVG viewbox: 0 0 280 160. Top=10, Bottom=150
	function mapY(val: number): number {
		return 150 - ((val - 55) / 60) * 140 + 10;
	}

	// Price line follows the close values
	const priceLinePath = candles
		.map((c, i) => {
			const x = 14 + i * 28;
			const y = mapY(c.close);
			return `${i === 0 ? 'M' : 'L'}${x},${y}`;
		})
		.join(' ');
</script>

<div class="candlestick-container">
	<svg viewBox="0 0 280 160" class="candlestick-svg" xmlns="http://www.w3.org/2000/svg">
		<!-- Glow filter -->
		<defs>
			<filter id="priceGlow" x="-20%" y="-20%" width="140%" height="140%">
				<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
			<linearGradient id="priceLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="var(--orange-400)" />
				<stop offset="100%" stop-color="var(--amber-400)" />
			</linearGradient>
		</defs>

		<!-- Grid lines (subtle) -->
		{#each [40, 70, 100, 130] as y}
			<line x1="0" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.03)" stroke-width="0.5" />
		{/each}

		<!-- Candles -->
		{#each candles as candle, i}
			{@const x = 14 + i * 28}
			{@const bodyTop = mapY(Math.max(candle.open, candle.close))}
			{@const bodyBottom = mapY(Math.min(candle.open, candle.close))}
			{@const bodyHeight = Math.max(bodyBottom - bodyTop, 2)}
			{@const wickTop = mapY(candle.high)}
			{@const wickBottom = mapY(candle.low)}

			<g class="candle" style="--delay: {i * 0.1}s">
				<!-- Wick -->
				<line
					x1={x} y1={wickTop} x2={x} y2={wickBottom}
					stroke={candle.green ? '#4ade80' : '#f87171'}
					stroke-width="1"
					opacity="0.6"
					class="candle-element"
				/>
				<!-- Body -->
				<rect
					x={x - 5}
					y={bodyTop}
					width="10"
					height={bodyHeight}
					fill={candle.green ? '#4ade80' : '#f87171'}
					rx="1"
					opacity="0.85"
					class="candle-element"
				/>
			</g>
		{/each}

		<!-- Price line -->
		<path
			d={priceLinePath}
			fill="none"
			stroke="url(#priceLineGrad)"
			stroke-width="2"
			filter="url(#priceGlow)"
			class="price-line"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</div>

<style>
	.candlestick-container {
		width: 280px;
		height: 160px;
		flex-shrink: 0;
		opacity: 0.75;
	}

	.candlestick-svg {
		width: 100%;
		height: 100%;
	}

	.candle-element {
		animation: candleGrow 0.6s ease-out both;
		animation-delay: var(--delay);
		transform-origin: bottom center;
	}

	@keyframes candleGrow {
		0% {
			opacity: 0;
			transform: scaleY(0);
		}
		100% {
			opacity: 1;
			transform: scaleY(1);
		}
	}

	.price-line {
		stroke-dasharray: 500;
		stroke-dashoffset: 500;
		animation: drawLine 2s ease-out 0.8s forwards;
	}

	@keyframes drawLine {
		to { stroke-dashoffset: 0; }
	}

	@media (max-width: 768px) {
		.candlestick-container {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.candle-element {
			animation: none !important;
			opacity: 1;
			transform: none;
		}
		.price-line {
			animation: none !important;
			stroke-dashoffset: 0;
		}
	}
</style>
