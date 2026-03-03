<script lang="ts">
	import ScrollAnimation from './ScrollAnimation.svelte';

	const methods = [
		{
			name: 'Revolut',
			icon: '🔄',
			color: '#3b82f6',
			description: 'Instant transfers across 30+ countries. The most popular option for ERG trades.'
		},
		{
			name: 'Wise',
			icon: '🌍',
			color: '#10b981',
			description: 'Low-fee international transfers. Great for cross-border P2P trades.'
		},
		{
			name: 'PayPal',
			icon: '💳',
			color: '#f59e0b',
			description: 'The classic. Available worldwide with buyer and seller protection.'
		}
	];
</script>

<section class="payment-section">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Fiat On/Off Ramp</span>
			<h2 class="section-title">Supported Payment Methods</h2>
			<p class="section-subtitle">Pay with what you already use. Sellers choose which methods they accept.</p>
		</ScrollAnimation>

		<div class="payment-grid">
			{#each methods as method, i}
				<ScrollAnimation delay={i * 150} animation="slide-up">
					<div class="payment-card" style="--method-color: {method.color};">
						<div class="payment-icon">{method.icon}</div>
						<h3 class="payment-name">{method.name}</h3>
						<p class="payment-desc">{method.description}</p>
					</div>
				</ScrollAnimation>
			{/each}
		</div>

		<ScrollAnimation delay={500}>
			<p class="payment-note">More payment methods coming soon. Community-driven expansion.</p>
		</ScrollAnimation>
	</div>
</section>

<style>
	.payment-section {
		padding: var(--section-padding);
		background: #0a0e1a;
		position: relative;
	}

	.payment-section > .container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.payment-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		width: 100%;
		max-width: 900px;
		margin-top: 3rem;
	}

	.payment-card {
		background: rgba(15, 22, 41, 0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid var(--border-card);
		border-radius: var(--radius-lg);
		padding: 40px 28px;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		position: relative;
		overflow: hidden;
	}

	.payment-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--method-color);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.payment-card:hover {
		background: rgba(20, 28, 53, 0.85);
		border-color: var(--method-color);
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
	}

	.payment-card:hover::before {
		opacity: 1;
	}

	.payment-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		filter: grayscale(0.2);
	}

	.payment-name {
		font-family: var(--font-mono);
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	.payment-desc {
		font-size: 0.92rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.payment-note {
		margin-top: 2.5rem;
		font-size: 0.9rem;
		color: var(--text-muted);
		font-style: italic;
	}

	@media (max-width: 768px) {
		.payment-grid {
			grid-template-columns: 1fr;
			max-width: 400px;
		}
	}
</style>
