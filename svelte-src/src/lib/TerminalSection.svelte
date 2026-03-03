<script lang="ts">
	import { onMount } from 'svelte';

	const lines = [
		{ text: '> connecting to nautilus wallet...', delay: 0 },
		{ text: '> wallet connected: 9f4a2b...c3d1', delay: 1200 },
		{ text: '> loading order book...', delay: 2200 },
		{ text: '> found 12 active sellers', delay: 3200 },
		{ text: '> best offer: 100 ERG @ 2.85 USD/ERG (Revolut)', delay: 4200 },
		{ text: '> initiating trade with seller: 9xK2m...7f9a', delay: 5400 },
		{ text: '> smart contract locking 100 ERG in escrow...', delay: 6600 },
		{ text: '> escrow confirmed: tx 4e8b2a...9c1d', delay: 7800 },
		{ text: '> send $285.00 via Revolut to seller', delay: 9000 },
		{ text: '> verifiers confirming payment... [3/5] ✓', delay: 10400 },
		{ text: '> payment verified. releasing ERG...', delay: 11800 },
		{ text: '> ✓ 100 ERG received in your wallet', delay: 13000, success: true },
	];

	let visibleLines = $state<Array<{ text: string; typed: string; success?: boolean }>>([]);
	let hasAnimated = $state(false);
	let element: HTMLElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			visibleLines = lines.map(l => ({ text: l.text, typed: l.text, success: l.success }));
			hasAnimated = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						hasAnimated = true;
						observer.unobserve(entry.target);
						startTyping();
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(element);
		return () => observer.disconnect();
	});

	function startTyping() {
		lines.forEach((line, lineIndex) => {
			setTimeout(() => {
				const entry = { text: line.text, typed: '', success: line.success };
				visibleLines = [...visibleLines, entry];

				let charIndex = 0;
				const typeInterval = setInterval(() => {
					if (charIndex <= line.text.length) {
						visibleLines = visibleLines.map((l, i) =>
							i === lineIndex ? { ...l, typed: line.text.slice(0, charIndex) } : l
						);
						charIndex++;
					} else {
						clearInterval(typeInterval);
					}
				}, 25);
			}, line.delay);
		});
	}
</script>

<section bind:this={element} class="terminal-section">
	<div class="container">
		<span class="section-label">Live Trading</span>
		<h2 class="section-title">Watch It <span class="gradient-text">Execute</span></h2>
		<p class="section-subtitle">Every trade flows through Ergo smart contracts — transparent, trustless, automatic.</p>

		<div class="terminal-window">
			<div class="terminal-header">
				<div class="terminal-dots">
					<span class="dot dot-red"></span>
					<span class="dot dot-yellow"></span>
					<span class="dot dot-green"></span>
				</div>
				<span class="terminal-title">ergo-frontier — trade.sh</span>
			</div>
			<div class="terminal-body">
				{#each visibleLines as line}
					<div class="terminal-line" class:success={line.success}>
						<span>{line.typed}</span>
						{#if line.typed.length < line.text.length}
							<span class="cursor-blink">█</span>
						{/if}
					</div>
				{/each}
				{#if !hasAnimated || visibleLines.length === 0}
					<div class="terminal-line">
						<span class="cursor-blink">█</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.terminal-section {
		padding: var(--section-padding);
		background: #060a16;
		position: relative;
	}

	.terminal-section > .container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.terminal-window {
		margin-top: 3rem;
		width: 100%;
		max-width: 680px;
		background: #080c18;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.03);
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.03);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.terminal-dots {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot-red { background: #ff5f57; }
	.dot-yellow { background: #febc2e; }
	.dot-green { background: #28c840; }

	.terminal-title {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--text-muted);
	}

	.terminal-body {
		padding: 20px 24px;
		min-height: 340px;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		line-height: 1.9;
	}

	.terminal-line {
		color: #4ade80;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.terminal-line.success {
		color: var(--emerald-400);
		font-weight: 600;
	}

	.cursor-blink {
		display: inline-block;
		color: #4ade80;
		animation: cursorBlink 0.8s step-end infinite;
	}

	@keyframes cursorBlink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 768px) {
		.terminal-body {
			font-size: 0.72rem;
			padding: 16px;
			min-height: 380px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor-blink {
			animation: none !important;
		}
	}
</style>
