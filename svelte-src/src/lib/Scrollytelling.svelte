<script lang="ts">
	import { onMount } from 'svelte';

	let section: HTMLElement;
	let progress = $state(0);
	let currentStep = $derived(Math.min(Math.floor(progress * 3), 2));
	let prefersReducedMotion = $state(false);

	const steps = [
		{
			title: 'You initiate a trade',
			desc: 'Connect your Nautilus wallet and select your trading pair. Submit your order — no intermediary, no sign-up, no KYC.',
			icon: 'initiate'
		},
		{
			title: 'Smart contract locks funds in eUTXO',
			desc: 'Your funds are locked into an ErgoScript smart contract using the extended UTXO model. Every condition is transparent and verifiable on-chain.',
			icon: 'lock'
		},
		{
			title: 'Atomic swap executes on-chain',
			desc: 'The trade resolves atomically — both parties receive their assets simultaneously, or the transaction is reverted. Zero counterparty risk.',
			icon: 'swap'
		}
	];

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const onScroll = () => {
			if (!section) return;
			const rect = section.getBoundingClientRect();
			const sectionHeight = section.offsetHeight;
			const viewportHeight = window.innerHeight;
			const rawProgress = -rect.top / (sectionHeight - viewportHeight);
			progress = Math.max(0, Math.min(1, rawProgress));
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section bind:this={section} class="scrollytelling" class:reduced={prefersReducedMotion}>
	<div class="sticky-container">
		<div class="journey-header">
			<span class="section-label">The Trade Flow</span>
			<h2 class="section-title">How Your Trade Settles</h2>
		</div>

		<!-- Progress bar -->
		<div class="progress-track">
			{#each steps as step, i}
				<div class="progress-dot" class:active={i <= currentStep} class:current={i === currentStep}>
					<span class="dot-inner"></span>
				</div>
				{#if i < steps.length - 1}
					<div class="progress-line">
						<div
							class="progress-fill"
							style="transform: scaleX({i < currentStep ? 1 : i === currentStep ? Math.max(0, (progress * 3 - i) % 1) : 0})"
						></div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Step content -->
		<div class="steps-viewport">
			{#each steps as step, i}
				<div class="step-panel" class:active={i === currentStep} class:past={i < currentStep} class:future={i > currentStep}>
					<div class="step-visual">
						{#if step.icon === 'initiate'}
							<div class="icon-container initiate-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									<path d="M9 12l2 2 4-4" />
								</svg>
								<div class="pulse-ring"></div>
								<div class="pulse-ring delay"></div>
							</div>
						{:else if step.icon === 'lock'}
							<div class="icon-container lock-visual">
								<div class="utxo-box">
									<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
										<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
										<path d="M7 11V7a5 5 0 0110 0v4" />
									</svg>
									<div class="lock-glow"></div>
								</div>
							</div>
						{:else if step.icon === 'swap'}
							<div class="icon-container swap-visual">
								<div class="swap-arrows">
									<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
										<path d="M7 16V4m0 0L3 8m4-4l4 4" />
										<path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
									</svg>
								</div>
								{#if currentStep === 2}
									<div class="success-particles">
										{#each Array(8) as _, ci}
											<div class="s-particle" style="--ci: {ci}; --cx: {Math.random() * 160 - 80}px; --cy: {Math.random() * -120 - 40}px; --cr: {Math.random() * 540}deg;"></div>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>
					<div class="step-text">
						<span class="step-counter">Step {i + 1} of 3</span>
						<h3>{step.title}</h3>
						<p>{step.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.scrollytelling {
		position: relative;
		height: 300vh;
		background: #050505;
	}

	.scrollytelling.reduced {
		height: auto;
	}

	.scrollytelling.reduced .sticky-container {
		position: relative;
	}

	.sticky-container {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 80px 24px 40px;
		overflow: hidden;
	}

	.journey-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.journey-header h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		color: var(--text-primary);
		letter-spacing: -0.02em;
		line-height: 1.15;
	}

	/* Progress track */
	.progress-track {
		display: flex;
		align-items: center;
		gap: 0;
		margin-bottom: 3rem;
		width: 100%;
		max-width: 320px;
	}

	.progress-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.4s ease;
		flex-shrink: 0;
	}

	.progress-dot.active {
		border-color: var(--orange-400);
	}

	.progress-dot.current {
		border-color: var(--orange-400);
		box-shadow: 0 0 12px rgba(255, 109, 58, 0.4);
	}

	.dot-inner {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: transparent;
		transition: background 0.3s;
	}

	.progress-dot.active .dot-inner {
		background: var(--orange-400);
	}

	.progress-line {
		flex: 1;
		height: 2px;
		background: rgba(255, 255, 255, 0.08);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--orange-400);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	/* Steps */
	.steps-viewport {
		position: relative;
		width: 100%;
		max-width: 600px;
		height: 300px;
	}

	.step-panel {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.5rem;
		opacity: 0;
		transform: translateY(30px) scale(0.95);
		transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		pointer-events: none;
	}

	.step-panel.active {
		opacity: 1;
		transform: translateY(0) scale(1);
		pointer-events: auto;
	}

	.step-panel.past {
		opacity: 0;
		transform: translateY(-30px) scale(0.95);
	}

	.step-visual {
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-container {
		position: relative;
	}

	/* Initiate icon */
	.initiate-visual {
		color: var(--orange-400);
		animation: floatIcon 3s ease-in-out infinite;
	}

	.pulse-ring {
		position: absolute;
		inset: -8px;
		border-radius: 50%;
		border: 2px solid rgba(255, 109, 58, 0.3);
		animation: pulseRing 2s ease-out infinite;
	}

	.pulse-ring.delay {
		animation-delay: 1s;
	}

	@keyframes pulseRing {
		0% { transform: scale(1); opacity: 0.6; }
		100% { transform: scale(1.6); opacity: 0; }
	}

	/* Lock icon */
	.lock-visual {
		color: var(--amber-400);
	}

	.utxo-box {
		position: relative;
		animation: floatIcon 2.5s ease-in-out infinite;
	}

	.lock-glow {
		position: absolute;
		inset: -10px;
		border-radius: 12px;
		background: radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%);
		animation: lockPulse 2s ease-in-out infinite;
	}

	@keyframes lockPulse {
		0%, 100% { opacity: 0.5; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.1); }
	}

	/* Swap icon */
	.swap-visual {
		color: var(--orange-400);
	}

	.swap-arrows {
		animation: floatIcon 2s ease-in-out infinite;
	}

	.success-particles {
		position: absolute;
		inset: -20px;
		pointer-events: none;
	}

	.s-particle {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 6px;
		height: 6px;
		border-radius: 2px;
		animation: confettiBurst 1.5s ease-out infinite;
		animation-delay: calc(var(--ci) * 0.1s);
	}

	.s-particle:nth-child(odd) { background: var(--orange-400); }
	.s-particle:nth-child(even) { background: var(--amber-400); }

	@keyframes confettiBurst {
		0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
		100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)); opacity: 0; }
	}

	@keyframes floatIcon {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}

	/* Step text */
	.step-counter {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--orange-400);
		opacity: 0.7;
	}

	.step-text h3 {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.step-text p {
		color: var(--text-secondary);
		font-size: 1.05rem;
		max-width: 450px;
		line-height: 1.7;
	}

	/* Reduced motion: show all steps stacked */
	.scrollytelling.reduced .steps-viewport {
		height: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.scrollytelling.reduced .step-panel {
		position: relative;
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}

	@media (max-width: 768px) {
		.sticky-container {
			padding: 60px 16px 30px;
		}

		.steps-viewport {
			height: 280px;
		}
	}
</style>
