<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		let destroyed = false;

		Promise.all([
			import('three/src/scenes/Scene.js'),
			import('three/src/cameras/PerspectiveCamera.js'),
			import('three/src/renderers/WebGLRenderer.js'),
			import('three/src/core/BufferGeometry.js'),
			import('three/src/core/BufferAttribute.js'),
			import('three/src/materials/PointsMaterial.js'),
			import('three/src/objects/Points.js'),
			import('three/src/materials/LineBasicMaterial.js'),
			import('three/src/objects/LineSegments.js')
		]).then(([
			{ Scene },
			{ PerspectiveCamera },
			{ WebGLRenderer },
			{ BufferGeometry },
			{ BufferAttribute, Float32BufferAttribute },
			{ PointsMaterial },
			{ Points },
			{ LineBasicMaterial },
			{ LineSegments }
		]) => {
			if (destroyed) return;

			const scene = new Scene();
			const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
			camera.position.z = 50;

			const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x000000, 0);

			// Particles — orange/amber color scheme for Ergo Frontier
			const particleCount = 140;
			const positions = new Float32Array(particleCount * 3);
			const colors = new Float32Array(particleCount * 3);
			const velocities = new Float32Array(particleCount * 3);
			const spread = 80;

			const orange = { r: 255 / 255, g: 109 / 255, b: 58 / 255 };
			const amber = { r: 251 / 255, g: 191 / 255, b: 36 / 255 };

			for (let i = 0; i < particleCount; i++) {
				const i3 = i * 3;
				positions[i3] = (Math.random() - 0.5) * spread;
				positions[i3 + 1] = (Math.random() - 0.5) * spread;
				positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;

				velocities[i3] = (Math.random() - 0.5) * 0.012;
				velocities[i3 + 1] = (Math.random() - 0.5) * 0.012;
				velocities[i3 + 2] = (Math.random() - 0.5) * 0.006;

				// Mix orange and amber
				const t = Math.random();
				colors[i3] = orange.r + (amber.r - orange.r) * t;
				colors[i3 + 1] = orange.g + (amber.g - orange.g) * t;
				colors[i3 + 2] = orange.b + (amber.b - orange.b) * t;
			}

			const particleGeometry = new BufferGeometry();
			particleGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
			particleGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

			const particleMaterial = new PointsMaterial({
				size: 0.7,
				vertexColors: true,
				transparent: true,
				opacity: 0.8,
				sizeAttenuation: true
			});

			const particles = new Points(particleGeometry, particleMaterial);
			scene.add(particles);

			// Lines (connections between nearby particles)
			const maxConnections = particleCount * 6;
			const linePositions = new Float32Array(maxConnections * 6);
			const lineColors = new Float32Array(maxConnections * 6);
			const lineGeometry = new BufferGeometry();
			lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3));
			lineGeometry.setAttribute('color', new BufferAttribute(lineColors, 3));

			const lineMaterial = new LineBasicMaterial({
				vertexColors: true,
				transparent: true,
				opacity: 0.2
			});

			const lines = new LineSegments(lineGeometry, lineMaterial);
			scene.add(lines);

			const connectionDistance = 14;

			let mouseX = 0, mouseY = 0;
			const onMouseMove = (e: MouseEvent) => {
				mouseX = (e.clientX / window.innerWidth) * 2 - 1;
				mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
			};
			window.addEventListener('mousemove', onMouseMove, { passive: true });

			const onResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};
			window.addEventListener('resize', onResize, { passive: true });

			let animationId: number;
			const animate = () => {
				if (destroyed) return;
				animationId = requestAnimationFrame(animate);

				const posArr = particleGeometry.attributes.position.array as Float32Array;

				for (let i = 0; i < particleCount; i++) {
					const i3 = i * 3;
					posArr[i3] += velocities[i3];
					posArr[i3 + 1] += velocities[i3 + 1];
					posArr[i3 + 2] += velocities[i3 + 2];

					const halfSpread = spread / 2;
					if (posArr[i3] > halfSpread) posArr[i3] = -halfSpread;
					if (posArr[i3] < -halfSpread) posArr[i3] = halfSpread;
					if (posArr[i3 + 1] > halfSpread) posArr[i3 + 1] = -halfSpread;
					if (posArr[i3 + 1] < -halfSpread) posArr[i3 + 1] = halfSpread;
					if (posArr[i3 + 2] > halfSpread * 0.5) posArr[i3 + 2] = -halfSpread * 0.5;
					if (posArr[i3 + 2] < -halfSpread * 0.5) posArr[i3 + 2] = halfSpread * 0.5;
				}

				particleGeometry.attributes.position.needsUpdate = true;

				// Update connection lines
				let lineIndex = 0;
				const lp = lineGeometry.attributes.position.array as Float32Array;
				const lc = lineGeometry.attributes.color.array as Float32Array;

				for (let i = 0; i < particleCount; i++) {
					const i3 = i * 3;
					for (let j = i + 1; j < particleCount; j++) {
						if (lineIndex >= maxConnections) break;
						const j3 = j * 3;
						const dx = posArr[i3] - posArr[j3];
						const dy = posArr[i3 + 1] - posArr[j3 + 1];
						const dz = posArr[i3 + 2] - posArr[j3 + 2];
						const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

						if (dist < connectionDistance) {
							const alpha = 1 - dist / connectionDistance;
							const li = lineIndex * 6;

							lp[li] = posArr[i3];
							lp[li + 1] = posArr[i3 + 1];
							lp[li + 2] = posArr[i3 + 2];
							lp[li + 3] = posArr[j3];
							lp[li + 4] = posArr[j3 + 1];
							lp[li + 5] = posArr[j3 + 2];

							// Orange-tinted connection lines
							const r = (255 / 255) * alpha;
							const g = (109 / 255) * alpha;
							const b = (58 / 255) * alpha;
							lc[li] = r; lc[li + 1] = g; lc[li + 2] = b;
							lc[li + 3] = r; lc[li + 4] = g; lc[li + 5] = b;

							lineIndex++;
						}
					}
				}

				for (let i = lineIndex * 6; i < lp.length; i++) {
					lp[i] = 0;
					lc[i] = 0;
				}

				lineGeometry.attributes.position.needsUpdate = true;
				lineGeometry.attributes.color.needsUpdate = true;
				lineGeometry.setDrawRange(0, lineIndex * 2);

				// Subtle camera follow mouse
				camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
				camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
				camera.lookAt(0, 0, 0);

				renderer.render(scene, camera);
			};

			animate();

			return () => {
				destroyed = true;
				cancelAnimationFrame(animationId);
				window.removeEventListener('mousemove', onMouseMove);
				window.removeEventListener('resize', onResize);
				renderer.dispose();
				particleGeometry.dispose();
				particleMaterial.dispose();
				lineGeometry.dispose();
				lineMaterial.dispose();
			};
		});

		return () => { destroyed = true; };
	});
</script>

<canvas bind:this={canvas} class="particle-canvas"></canvas>

<style>
	.particle-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
</style>
