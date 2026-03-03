<script lang="ts">
	// Aurora/Gradient Mesh background — pure CSS animated blobs
	// Layered on top of Three.js particles for maximum depth
</script>

<div class="aurora-container">
	<div class="aurora-blob blob-1"></div>
	<div class="aurora-blob blob-2"></div>
	<div class="aurora-blob blob-3"></div>
	<div class="aurora-blob blob-4"></div>
</div>

<style>
	.aurora-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 1;
	}

	.aurora-blob {
		position: absolute;
		border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
		filter: blur(80px);
		will-change: transform, border-radius;
	}

	.blob-1 {
		width: 600px;
		height: 600px;
		top: -15%;
		right: -5%;
		background: rgba(255, 109, 58, 0.15);
		animation: auroraMove1 25s ease-in-out infinite, auroraMorph1 20s ease-in-out infinite;
	}

	.blob-2 {
		width: 500px;
		height: 500px;
		bottom: -10%;
		left: -10%;
		background: rgba(251, 191, 36, 0.10);
		animation: auroraMove2 30s ease-in-out infinite, auroraMorph2 22s ease-in-out infinite;
	}

	.blob-3 {
		width: 450px;
		height: 450px;
		top: 30%;
		left: 20%;
		background: rgba(220, 38, 38, 0.08);
		animation: auroraMove3 28s ease-in-out infinite, auroraMorph3 24s ease-in-out infinite;
	}

	.blob-4 {
		width: 350px;
		height: 350px;
		top: 10%;
		right: 25%;
		background: rgba(255, 109, 58, 0.08);
		animation: auroraMove4 22s ease-in-out infinite, auroraMorph2 26s ease-in-out infinite;
	}

	@keyframes auroraMove1 {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(-60px, 40px); }
		50% { transform: translate(-30px, 80px); }
		75% { transform: translate(40px, 30px); }
	}

	@keyframes auroraMove2 {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(50px, -30px); }
		50% { transform: translate(80px, -60px); }
		75% { transform: translate(20px, -20px); }
	}

	@keyframes auroraMove3 {
		0%, 100% { transform: translate(0, 0); }
		33% { transform: translate(-40px, -50px); }
		66% { transform: translate(50px, 30px); }
	}

	@keyframes auroraMove4 {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(30px, 50px); }
		50% { transform: translate(-20px, 70px); }
		75% { transform: translate(-50px, 20px); }
	}

	@keyframes auroraMorph1 {
		0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
		25% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%; }
		50% { border-radius: 30% 70% 50% 50% / 60% 30% 70% 40%; }
		75% { border-radius: 50% 50% 40% 60% / 30% 70% 50% 50%; }
	}

	@keyframes auroraMorph2 {
		0%, 100% { border-radius: 50% 50% 30% 70% / 60% 40% 60% 40%; }
		33% { border-radius: 70% 30% 50% 50% / 40% 60% 30% 70%; }
		66% { border-radius: 30% 70% 60% 40% / 50% 50% 50% 50%; }
	}

	@keyframes auroraMorph3 {
		0%, 100% { border-radius: 60% 40% 50% 50% / 50% 50% 40% 60%; }
		50% { border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; }
	}

	@media (prefers-reduced-motion: reduce) {
		.aurora-blob {
			animation: none !important;
		}
	}

	@media (max-width: 768px) {
		.blob-1 { width: 350px; height: 350px; }
		.blob-2 { width: 300px; height: 300px; }
		.blob-3 { width: 250px; height: 250px; }
		.blob-4 { display: none; }
	}
</style>
