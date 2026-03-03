<script lang="ts">
	import ScrollAnimation from '$lib/ScrollAnimation.svelte';
	import ParticleNetwork from '$lib/ParticleNetwork.svelte';
	import Scrollytelling from '$lib/Scrollytelling.svelte';
	import AnimatedCounter from '$lib/AnimatedCounter.svelte';
	import AuroraBackground from '$lib/AuroraBackground.svelte';
	import TiltCard from '$lib/TiltCard.svelte';
	import MagneticButton from '$lib/MagneticButton.svelte';
	import PriceTicker from '$lib/PriceTicker.svelte';
	import CandlestickChart from '$lib/CandlestickChart.svelte';
	import TerminalSection from '$lib/TerminalSection.svelte';
	import TokenShowcase from '$lib/TokenShowcase.svelte';

	// Hero text reveal — word by word
	const heroWords1 = 'Trade on the Edge of'.split(' ');
	const heroWords2 = 'Decentralization';
</script>

<svelte:head>
	<title>Ergo Frontier Exchange — Decentralized Trading on Ergo</title>
	<meta name="description" content="Trade on the edge of decentralization. Ergo Frontier Exchange is a non-custodial, peer-to-peer DEX built on the Ergo blockchain with on-chain settlement." />
	<meta name="theme-color" content="#080808" />
	<meta property="og:title" content="Ergo Frontier Exchange" />
	<meta property="og:description" content="Trade on the Edge of Decentralization" />
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<!-- ============================================ -->
<!-- PRICE TICKER                                 -->
<!-- ============================================ -->
<PriceTicker />

<!-- ============================================ -->
<!-- HERO SECTION                                 -->
<!-- ============================================ -->
<section class="hero">
	<ParticleNetwork />
	<AuroraBackground />
	<div class="hero-glow"></div>
	<div class="hero-glow-secondary"></div>
	<div class="hero-content container">
		<div class="hero-main">
			<div class="hero-text-side">
				<div class="hero-badge">
					<span class="badge-dot"></span>
					Built on Ergo Blockchain
				</div>
				<h1 class="hero-title-reveal">
					{#each heroWords1 as word, i}
						<span class="word-wrap"><span class="word-inner" style="animation-delay: {i * 80}ms">{word}</span></span>
						{' '}
					{/each}
					<br />
					<span class="word-wrap"><span class="word-inner gradient-text" style="animation-delay: {heroWords1.length * 80}ms">{heroWords2}</span></span>
				</h1>
				<p class="hero-description">
					Ergo Frontier Exchange is a non-custodial, peer-to-peer decentralized exchange.
					Trade directly from your wallet with atomic on-chain settlement — no intermediaries,
					no KYC, no compromises.
				</p>
				<div class="hero-actions">
					<MagneticButton href="#trade" class="btn btn-primary magnetic-btn">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
						Start Trading
					</MagneticButton>
					<MagneticButton href="#how-it-works" class="btn btn-secondary magnetic-btn">
						Learn More
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
					</MagneticButton>
				</div>
			</div>
			<div class="hero-chart-side">
				<CandlestickChart />
			</div>
		</div>
	</div>
</section>

<!-- ============================================ -->
<!-- STATS BAR                                    -->
<!-- ============================================ -->
<section class="stats-bar">
	<div class="container stats-container">
		<AnimatedCounter text="ERG Pairs" label="Trading Markets" />
		<div class="stat-divider"></div>
		<AnimatedCounter text="Non-Custodial" label="Your Keys, Your Coins" />
		<div class="stat-divider"></div>
		<AnimatedCounter text="On-Chain" label="Settlement" />
		<div class="stat-divider"></div>
		<AnimatedCounter text="Open Source" label="Fully Transparent" />
	</div>
</section>

<div class="section-divider"></div>

<!-- ============================================ -->
<!-- HOW IT WORKS                                 -->
<!-- ============================================ -->
<section id="how-it-works" class="section" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Simple & Powerful</span>
			<h2 class="section-title">How It Works</h2>
			<p class="section-subtitle">Three steps. No sign-up. No middlemen. Just you and the blockchain.</p>
		</ScrollAnimation>

		<div class="steps-grid">
			<ScrollAnimation delay={0} animation="slide-up">
				<TiltCard>
					<div class="card step-card gradient-border-card">
						<div class="step-number">1</div>
						<div class="step-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="2" y="6" width="20" height="14" rx="2" />
								<path d="M2 10h20" />
								<path d="M6 14h4" />
							</svg>
						</div>
						<h3>Connect Wallet</h3>
						<p>Link your Nautilus wallet in one click. Your keys stay with you — always.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>

			<ScrollAnimation delay={150} animation="slide-up">
				<TiltCard>
					<div class="card step-card gradient-border-card">
						<div class="step-number">2</div>
						<div class="step-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<circle cx="9" cy="12" r="4" />
								<circle cx="15" cy="12" r="4" />
								<path d="M12 8v8" opacity="0.5" />
							</svg>
						</div>
						<h3>Select Pair</h3>
						<p>Choose from ERG, SigUSD, SigRSV and other Ergo tokens. Set your price.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>

			<ScrollAnimation delay={300} animation="slide-up">
				<TiltCard>
					<div class="card step-card gradient-border-card">
						<div class="step-number">3</div>
						<div class="step-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
								<polyline points="22 4 12 14.01 9 11.01" />
							</svg>
						</div>
						<h3>Execute Trade</h3>
						<p>Confirm and your trade settles on-chain. Atomic, trustless, final.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>
		</div>

		<ScrollAnimation delay={200}>
			<div class="steps-connector">
				<div class="connector-line"></div>
				<div class="connector-dot"></div>
				<div class="connector-dot"></div>
				<div class="connector-dot"></div>
			</div>
		</ScrollAnimation>
	</div>
</section>

<div class="section-divider"></div>

<!-- ============================================ -->
<!-- WHY ERGO FRONTIER                            -->
<!-- ============================================ -->
<section id="features" class="section" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Why Ergo Frontier</span>
			<h2 class="section-title">Built Different</h2>
			<p class="section-subtitle">Every design decision serves one goal: give you sovereign control of your trades.</p>
		</ScrollAnimation>

		<div class="features-grid">
			<ScrollAnimation delay={0}>
				<TiltCard>
					<div class="card feature-card gradient-border-card">
						<div class="feature-icon">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
							</svg>
						</div>
						<h3>Non-Custodial</h3>
						<p>Your assets never leave your wallet until settlement. No trust required.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>

			<ScrollAnimation delay={100}>
				<TiltCard>
					<div class="card feature-card gradient-border-card">
						<div class="feature-icon amber">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="2" y="2" width="8" height="8" rx="1" />
								<rect x="14" y="2" width="8" height="8" rx="1" />
								<rect x="2" y="14" width="8" height="8" rx="1" />
								<rect x="14" y="14" width="8" height="8" rx="1" />
								<line x1="10" y1="6" x2="14" y2="6" />
								<line x1="6" y1="10" x2="6" y2="14" />
								<line x1="18" y1="10" x2="18" y2="14" />
								<line x1="10" y1="18" x2="14" y2="18" />
							</svg>
						</div>
						<h3>eUTXO Model</h3>
						<p>Leverages Ergo's extended UTXO for parallel processing and deterministic transactions.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>

			<ScrollAnimation delay={200}>
				<TiltCard>
					<div class="card feature-card gradient-border-card">
						<div class="feature-icon">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M23 21v-2a4 4 0 00-3-3.87" />
								<path d="M16 3.13a4 4 0 010 7.75" />
							</svg>
						</div>
						<h3>No KYC</h3>
						<p>Trade freely without identity verification. Your privacy is non-negotiable.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>

			<ScrollAnimation delay={100}>
				<TiltCard>
					<div class="card feature-card gradient-border-card">
						<div class="feature-icon amber">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
							</svg>
						</div>
						<h3>Open Source</h3>
						<p>Every line of code is public. Audit it, fork it, improve it.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>

			<ScrollAnimation delay={200}>
				<TiltCard>
					<div class="card feature-card gradient-border-card">
						<div class="feature-icon">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
							</svg>
						</div>
						<h3>Low Fees</h3>
						<p>Ergo's efficient PoW chain keeps transaction costs minimal. More value for you.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>

			<ScrollAnimation delay={300}>
				<TiltCard>
					<div class="card feature-card gradient-border-card">
						<div class="feature-icon amber">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="2" y="6" width="20" height="14" rx="2" />
								<path d="M2 10h20" />
								<circle cx="12" cy="16" r="2" />
							</svg>
						</div>
						<h3>Nautilus Support</h3>
						<p>Native integration with Nautilus — the most popular Ergo wallet.</p>
					</div>
				</TiltCard>
			</ScrollAnimation>
		</div>
	</div>
</section>

<div class="section-divider"></div>

<!-- ============================================ -->
<!-- SCROLLYTELLING                               -->
<!-- ============================================ -->
<Scrollytelling />

<div class="section-divider"></div>

<!-- ============================================ -->
<!-- TOKEN SHOWCASE (Horizontal Scroll)           -->
<!-- ============================================ -->
<TokenShowcase />

<div class="section-divider"></div>

<!-- ============================================ -->
<!-- TERMINAL STATS SECTION                       -->
<!-- ============================================ -->
<TerminalSection />

<div class="section-divider"></div>

<!-- ============================================ -->
<!-- CTA SECTION                                  -->
<!-- ============================================ -->
<section id="trade" class="section cta-section" style="scroll-margin-top: 80px;">
	<div class="container cta-container">
		<ScrollAnimation animation="scale">
			<div class="cta-glow"></div>
			<h2 class="cta-title">Ready to <span class="gradient-text">Trade</span>?</h2>
			<p class="cta-subtitle">Join the frontier of decentralized finance on Ergo.</p>
			<MagneticButton href="https://github.com/ergo-frontier/exchange" class="btn btn-cta magnetic-btn" target="_blank" rel="noopener">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
				Launch Exchange
			</MagneticButton>
		</ScrollAnimation>
	</div>
</section>

<!-- ============================================ -->
<!-- FOOTER                                       -->
<!-- ============================================ -->
<footer class="footer">
	<div class="container footer-inner">
		<div class="footer-brand">
			<span class="footer-logo">⚡ Ergo Frontier</span>
			<p class="footer-tagline">Decentralized exchange on Ergo</p>
		</div>
		<div class="footer-links">
			<a href="https://github.com/ergo-frontier/exchange" target="_blank" rel="noopener">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
				GitHub
			</a>
			<a href="https://ergoplatform.org" target="_blank" rel="noopener">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
				Ergo Platform
			</a>
		</div>
		<div class="footer-bottom">
			<p>Built with 🦞 on the Ergo blockchain</p>
		</div>
	</div>
</footer>

<style>
	/* ===== HERO ===== */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: #080808;
	}

	.hero-glow {
		position: absolute;
		top: -20%;
		right: -10%;
		width: 60%;
		height: 80%;
		background: radial-gradient(ellipse, rgba(255, 87, 34, 0.08) 0%, transparent 70%);
		pointer-events: none;
		z-index: 1;
	}

	.hero-glow-secondary {
		position: absolute;
		bottom: -10%;
		left: -10%;
		width: 50%;
		height: 60%;
		background: radial-gradient(ellipse, rgba(251, 191, 36, 0.04) 0%, transparent 70%);
		pointer-events: none;
		z-index: 1;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		padding: 120px 24px 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero-main {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 60px;
		width: 100%;
	}

	.hero-text-side {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		flex: 1;
		max-width: 650px;
	}

	.hero-chart-side {
		flex-shrink: 0;
		display: flex;
		align-items: center;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--orange-400);
		padding: 6px 16px;
		border: 1px solid rgba(255, 87, 34, 0.2);
		border-radius: 100px;
		background: rgba(255, 87, 34, 0.06);
		margin-bottom: 2rem;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--orange-400);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(0.8); }
	}

	/* ===== HERO TEXT REVEAL ===== */
	.hero-title-reveal {
		margin-bottom: 1.5rem;
		max-width: 800px;
	}

	.word-wrap {
		display: inline-block;
		overflow: hidden;
		vertical-align: bottom;
	}

	.word-inner {
		display: inline-block;
		animation: wordReveal 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
	}

	@keyframes wordReveal {
		0% {
			transform: translateY(110%);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.hero-description {
		max-width: 600px;
		font-size: 1.15rem;
		margin-bottom: 2.5rem;
		line-height: 1.8;
	}

	.hero-actions {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	/* ===== STATS BAR ===== */
	.stats-bar {
		background: #0a0a0a;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
		padding: 40px 24px;
	}

	.stats-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 48px;
		flex-wrap: wrap;
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: rgba(255, 255, 255, 0.08);
	}

	/* ===== HOW IT WORKS ===== */
	.steps-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		width: 100%;
		margin-top: 3rem;
	}

	.step-card {
		text-align: center;
		padding: 40px 28px;
		position: relative;
	}

	.step-number {
		position: absolute;
		top: 16px;
		right: 20px;
		font-family: var(--font-mono);
		font-size: 3rem;
		font-weight: 700;
		color: rgba(255, 109, 58, 0.08);
		line-height: 1;
	}

	.step-icon {
		color: var(--orange-400);
		margin-bottom: 1.5rem;
		display: flex;
		justify-content: center;
	}

	.step-card h3 {
		font-family: var(--font-mono);
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.step-card p {
		font-size: 0.95rem;
	}

	.steps-connector {
		display: none;
	}

	/* ===== ANIMATED GRADIENT BORDERS ===== */
	.gradient-border-card {
		position: relative;
	}

	.gradient-border-card::after {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: var(--radius-lg);
		padding: 1px;
		background: conic-gradient(from var(--border-angle, 0deg), transparent 40%, var(--orange-400) 50%, var(--amber-400) 55%, transparent 60%);
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s;
	}

	.gradient-border-card:hover::after {
		opacity: 1;
		animation: borderSpin 3s linear infinite;
	}

	@keyframes borderSpin {
		to { --border-angle: 360deg; }
	}

	/* Register CSS custom property for animation */
	@property --border-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	/* ===== FEATURES ===== */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		width: 100%;
		margin-top: 3rem;
	}

	.feature-card {
		padding: 32px;
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background: rgba(255, 87, 34, 0.1);
		border: 1px solid rgba(255, 87, 34, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
		color: var(--orange-400);
		transition: all 0.3s;
	}

	.feature-icon.amber {
		background: rgba(251, 191, 36, 0.1);
		border-color: rgba(251, 191, 36, 0.15);
		color: var(--amber-400);
	}

	.feature-card:hover .feature-icon {
		box-shadow: 0 0 20px rgba(255, 87, 34, 0.2);
		transform: scale(1.05);
	}

	.feature-card:hover .feature-icon.amber {
		box-shadow: 0 0 20px rgba(251, 191, 36, 0.2);
	}

	.feature-card h3 {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 600;
	}

	.feature-card p {
		font-size: 0.92rem;
	}

	/* ===== CTA ===== */
	.cta-section {
		padding: 160px 24px;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.cta-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 2;
	}

	.cta-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(255, 87, 34, 0.08) 0%, rgba(251, 191, 36, 0.04) 40%, transparent 70%);
		pointer-events: none;
		z-index: 0;
	}

	.cta-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin-bottom: 1rem;
		position: relative;
		z-index: 1;
	}

	.cta-subtitle {
		font-size: 1.15rem;
		margin-bottom: 2.5rem;
		position: relative;
		z-index: 1;
	}

	/* btn-cta styles applied via global + magnetic wrapper */
	:global(.btn-cta) {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 18px 40px;
		border-radius: 12px;
		font-size: 1.1rem;
		font-weight: 700;
		font-family: var(--font-sans);
		cursor: pointer;
		border: none;
		background: linear-gradient(135deg, var(--orange-500), var(--amber-500));
		color: #000;
		text-decoration: none;
		box-shadow: 0 0 40px rgba(255, 87, 34, 0.3), 0 0 80px rgba(255, 87, 34, 0.1);
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		position: relative;
		z-index: 1;
	}

	:global(.btn-cta:hover) {
		box-shadow: 0 0 50px rgba(255, 87, 34, 0.4), 0 0 100px rgba(255, 87, 34, 0.15);
		color: #000;
	}

	/* ===== FOOTER ===== */
	.footer {
		background: #050505;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		padding: 60px 24px 40px;
	}

	.footer-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.footer-brand {
		text-align: center;
	}

	.footer-logo {
		font-family: var(--font-mono);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.footer-tagline {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 4px;
	}

	.footer-links {
		display: flex;
		gap: 32px;
	}

	.footer-links a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: var(--orange-400);
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		padding-top: 20px;
		width: 100%;
		text-align: center;
	}

	.footer-bottom p {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.hero-chart-side {
			display: none;
		}

		.hero-text-side {
			align-items: center;
			text-align: center;
		}

		.hero-actions {
			justify-content: center;
		}
	}

	@media (max-width: 768px) {
		.hero-content {
			padding: 100px 16px 60px;
		}

		.hero-title-reveal {
			font-size: clamp(2rem, 8vw, 3rem);
		}

		.hero-description {
			font-size: 1rem;
		}

		.stats-container {
			gap: 24px;
		}

		.stat-divider {
			display: none;
		}

		.steps-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.cta-section {
			padding: 100px 16px;
		}

		:global(.btn-cta) {
			padding: 16px 32px;
			font-size: 1rem;
		}

		.footer-links {
			gap: 20px;
		}
	}

	@media (max-width: 480px) {
		.hero-actions {
			flex-direction: column;
			width: 100%;
		}

		:global(.hero-actions .magnetic-btn) {
			width: 100%;
			justify-content: center;
		}
	}

	/* ===== REDUCED MOTION ===== */
	@media (prefers-reduced-motion: reduce) {
		.word-inner {
			animation: none !important;
			transform: none;
			opacity: 1;
		}

		.gradient-border-card::after {
			animation: none !important;
		}
	}
</style>
