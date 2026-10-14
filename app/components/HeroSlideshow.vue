<script setup lang="ts">
	type Slide = {
		project: string
		sector: string
		gc: string
		type: 'split' | 'single' | 'duo' | 'coming-soon'
		comingSoonName?: string
		exterior?: string
		exteriorFocus?: string
		image?: string
		focus?: string
		left?: string
		leftFocus?: string
		right?: string
		rightFocus?: string
	}

	const slides: Slide[] = [
		{
			project: 'Tampa International Airport—MTC Blue Side and CIP',
			sector: 'Aviation',
			gc: 'Hensel Phelps',
			type: 'split',
			exterior: '/hero/tpa-blue-express-ext.jpg',
			exteriorFocus: '86% 50%',
			image: '/hero/tpa-elevators.jpg',
			focus: 'center 80%'
		},
		{
			project: 'Tampa International Airport—MTC Blue Side and CIP',
			sector: 'Aviation',
			gc: 'Hensel Phelps',
			type: 'single',
			image: '/hero/tpa-cup.jpg',
			focus: 'center 70%'
		},
		{
			project: 'Tampa International Airport—Airside D',
			sector: 'Aviation',
			gc: 'Hensel Phelps',
			type: 'coming-soon',
			comingSoonName: 'TIA Airside D',
			left: '/hero/tia-airside-d-rendering.jpg',
			leftFocus: '30% 50%',
			right: '/hero/tia-airside-d-aerial.jpg',
			rightFocus: 'center 55%'
		},
		{
			project: 'Jule F. Sumner High School',
			sector: 'K–12 Education',
			gc: 'CORE Construction and HORUS',
			type: 'split',
			exterior: '/hero/sumner-exterior.jpg',
			exteriorFocus: '38% 50%',
			image: '/hero/sumner-library.jpg',
			focus: 'center 70%'
		},
		{
			project: 'Jule F. Sumner High School',
			sector: 'K–12 Education',
			gc: 'CORE Construction and HORUS',
			type: 'single',
			image: '/hero/sumner-cafeteria.jpg',
			focus: 'center 85%'
		},
		{
			project: 'Moffitt Speros',
			sector: 'Healthcare',
			gc: 'Whiting-Turner and Foresight',
			type: 'split',
			exterior: '/hero/moffitt-exterior.jpg',
			exteriorFocus: '30% 45%',
			image: '/hero/moffitt-speros-office.jpg',
			focus: 'center 55%'
		},
		{
			project: 'Moffitt Speros',
			sector: 'Healthcare',
			gc: 'Whiting-Turner and Foresight',
			type: 'single',
			image: '/hero/moffitt-transition.jpg',
			focus: 'center 62%'
		},
		{
			project: 'BayCare Carrollwood',
			sector: 'Healthcare',
			gc: 'DeAngelis Diamond',
			type: 'split',
			exterior: '/hero/baycare-exterior-clean.jpg',
			exteriorFocus: 'center 60%',
			image: '/hero/baycare-imaging.jpg',
			focus: 'center 62%'
		},
		{
			project: 'BayCare Carrollwood',
			sector: 'Healthcare',
			gc: 'DeAngelis Diamond',
			type: 'duo',
			left: '/hero/baycare-tile-wall.jpg',
			leftFocus: 'center 42%',
			right: '/hero/baycare-hallway.jpg',
			rightFocus: 'center 55%'
		},
		{
			project: 'Heron Tampa at Water Street',
			sector: 'Multi-Family',
			gc: 'Coastal',
			type: 'split',
			exterior: '/hero/heron-exterior.jpg',
			exteriorFocus: 'center 60%',
			image: '/hero/heron-unit.jpg',
			focus: 'center 60%'
		},
		{
			project: 'Heron Tampa at Water Street',
			sector: 'Multi-Family',
			gc: 'Coastal',
			type: 'single',
			image: '/hero/heron.jpg',
			focus: 'center 82%'
		},
		{
			project: 'Cora at Water Street',
			sector: 'Multi-Family',
			gc: 'Moss',
			type: 'single',
			image: '/hero/cora.jpg',
			focus: 'center 100%'
		},
		{
			project: 'Cora at Water Street',
			sector: 'Multi-Family',
			gc: 'Moss',
			type: 'single',
			image: '/hero/cora-bedroom.jpg',
			focus: 'center 100%'
		},
		{
			project: 'USF Indoor Performance Facility',
			sector: 'Higher Education',
			gc: 'RR Simmons',
			type: 'single',
			image: '/hero/usf-ipf.jpg',
			focus: 'center 50%'
		},
		{
			project: 'USF Indoor Performance Facility',
			sector: 'Higher Education',
			gc: 'RR Simmons',
			type: 'single',
			image: '/hero/usf-pressroom-2.jpg',
			focus: 'center 62%'
		},
		{
			project: 'USF Stadium',
			sector: 'Higher Education',
			gc: 'Manhattan, H.J. Russell and DuCon',
			type: 'coming-soon',
			comingSoonName: 'USF Stadium',
			image: '/hero/usf-stadium-rendering.jpg',
			focus: 'center 45%'
		}
	]

	const active = ref(0)
	// Only load a slide's photos once it is shown or about to be shown
	const loaded = ref(new Set([0, 1]))
	let timer: ReturnType<typeof setTimeout> | undefined

	function schedule() {
		clearTimeout(timer)
		const ms = slides[active.value].type === 'split' ? 6000 : 5000
		timer = setTimeout(() => go(active.value + 1), ms)
	}

	function go(i: number) {
		active.value = (i + slides.length) % slides.length
		loaded.value.add(active.value)
		loaded.value.add((active.value + 1) % slides.length)
		schedule()
	}

	onMounted(schedule)
	onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
	<section
		class="hero-slideshow"
		aria-roledescription="carousel"
		aria-label="Focus Flooring projects"
	>
		<div
			v-for="(slide, i) in slides"
			:key="i"
			class="slide"
			:class="{ 'is-active': i === active }"
			role="group"
			aria-roledescription="slide"
			:aria-label="`${i + 1} of ${slides.length}: ${slide.project}`"
			:aria-hidden="i !== active"
		>
			<template v-if="loaded.has(i)">
				<template v-if="slide.exterior">
					<NuxtImg
						class="panel panel-exterior"
						:src="slide.exterior"
						:style="{ objectPosition: slide.exteriorFocus }"
						format="webp"
						alt=""
					/>
					<NuxtImg
						class="panel panel-interior panel-main"
						:src="slide.image"
						:style="{ objectPosition: slide.focus }"
						format="webp"
						alt=""
					/>
				</template>
				<template v-else-if="slide.left">
					<NuxtImg
						class="panel panel-left"
						:src="slide.left"
						:style="{ objectPosition: slide.leftFocus }"
						format="webp"
						alt=""
					/>
					<NuxtImg
						class="panel panel-right panel-main"
						:src="slide.right"
						:style="{ objectPosition: slide.rightFocus }"
						format="webp"
						alt=""
					/>
				</template>
				<NuxtImg
					v-else
					class="panel panel-main"
					:src="slide.image"
					:style="{ objectPosition: slide.focus }"
					format="webp"
					alt=""
				/>
			</template>

			<template v-if="slide.type === 'coming-soon'">
				<div class="coming-soon-shade" />
				<div class="coming-soon">
					<p class="coming-soon-eyebrow">
						<span class="coming-soon-bar" />Upcoming project
					</p>
					<p class="coming-soon-title">Coming soon</p>
					<p class="coming-soon-name">{{ slide.comingSoonName }}</p>
				</div>
			</template>

			<div class="caption">
				<span class="caption-sector">{{ slide.sector }}</span>
				<span class="caption-project">{{ slide.project }}</span>
				<span class="caption-gc">GC · {{ slide.gc }}</span>
			</div>
		</div>

		<div class="legibility" />

		<button
			class="arrow arrow-prev"
			aria-label="Previous slide"
			@click="go(active - 1)"
		>
			‹
		</button>
		<button
			class="arrow arrow-next"
			aria-label="Next slide"
			@click="go(active + 1)"
		>
			›
		</button>

		<div class="dashes">
			<button
				v-for="(slide, i) in slides"
				:key="i"
				class="dash"
				:class="{ 'is-active': i === active }"
				:aria-label="`Go to slide ${i + 1}`"
				:aria-current="i === active"
				@click="go(i)"
			>
				<span />
			</button>
		</div>
	</section>
</template>

<style scoped>
	.hero-slideshow {
		position: relative;
		width: 100%;
		height: clamp(480px, 52vw, 780px);
		background: var(--midnight);
		overflow: hidden;
	}

	.slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		pointer-events: none;
		transition: opacity 1.1s ease;
	}

	.slide.is-active {
		opacity: 1;
		pointer-events: auto;
	}

	.panel {
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
		left: 0;
		object-fit: cover;
	}

	.panel-exterior {
		width: 31%;
	}

	.panel-interior {
		left: calc(31% + 4px);
		width: calc(69% - 4px);
	}

	.panel-left {
		width: 40%;
	}

	.panel-right {
		left: auto;
		right: 0;
		width: 60%;
	}

	.legibility {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(
			180deg,
			rgba(23, 29, 26, 0.6) 0%,
			rgba(23, 29, 26, 0) 22%,
			rgba(23, 29, 26, 0) 70%,
			rgba(23, 29, 26, 0.35) 100%
		);
	}

	.coming-soon-shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(23, 29, 26, 0.9) 0%,
			rgba(23, 29, 26, 0.6) 35%,
			rgba(23, 29, 26, 0.15) 75%,
			rgba(23, 29, 26, 0) 100%
		);
	}

	.coming-soon {
		position: absolute;
		left: clamp(84px, 7vw, 128px);
		top: clamp(110px, 11vw, 160px);
		display: flex;
		flex-direction: column;
		gap: clamp(10px, 1.2vw, 18px);
	}

	.coming-soon-eyebrow {
		display: flex;
		align-items: center;
		gap: 14px;
		font-weight: 700;
		font-size: clamp(11px, 0.95vw, 15px);
		letter-spacing: 0.32em;
		color: var(--focus-yellow);
		white-space: nowrap;
	}

	.coming-soon-bar {
		display: block;
		width: 40px;
		height: 3px;
		background: var(--focus-yellow);
	}

	.coming-soon-title {
		font-weight: 900;
		font-size: clamp(40px, 5.2vw, 92px);
		line-height: 1;
		letter-spacing: -0.01em;
		color: #f1f1f1;
		white-space: nowrap;
	}

	.coming-soon-name {
		font-weight: 300;
		font-size: clamp(16px, 1.5vw, 24px);
		letter-spacing: 0.06em;
		color: #f1f1f1;
	}

	.caption {
		position: absolute;
		bottom: clamp(14px, 2.4vw, 34px);
		left: clamp(14px, 3vw, 48px);
		background: #414042;
		padding: 12px 16px;
		max-width: 360px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		z-index: 2;
	}

	.caption-sector {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--focus-yellow);
	}

	.caption-project {
		font-size: clamp(13px, 1.3vw, 17px);
		font-weight: 500;
		color: #f1f1f1;
		line-height: 1.25;
	}

	.caption-gc {
		font-size: 12px;
		color: #f1f1f1;
	}

	.arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 48px;
		height: 48px;
		border: 0;
		background: rgba(23, 29, 26, 0.5);
		color: #f1f1f1;
		font-size: 24px;
		line-height: 1;
		cursor: pointer;
		z-index: 3;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.arrow:hover {
		background: var(--focus-yellow);
		color: var(--midnight);
	}

	.arrow-prev {
		left: clamp(10px, 1.4vw, 20px);
	}

	.arrow-next {
		right: clamp(10px, 1.4vw, 20px);
	}

	.dashes {
		position: absolute;
		bottom: clamp(14px, 2.4vw, 34px);
		right: clamp(14px, 3vw, 48px);
		display: flex;
		gap: 6px;
		padding: 2px 10px;
		background: rgba(23, 29, 26, 0.55);
		z-index: 3;
	}

	.dash {
		width: 32px;
		height: 28px;
		border: 0;
		padding: 0;
		background: transparent;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.dash span {
		display: block;
		width: 100%;
		height: 4px;
		background: rgba(241, 241, 241, 0.75);
	}

	.dash.is-active span {
		background: var(--focus-yellow);
	}

	/* Phones: only the main interior photo, full-bleed */
	@media (max-width: 719.98px) {
		.panel-exterior,
		.panel-left {
			display: none;
		}

		.panel-main {
			left: 0;
			right: 0;
			width: 100%;
		}

		.coming-soon {
			left: 20px;
			top: 96px;
		}

		.caption {
			max-width: calc(100% - 28px);
			bottom: 56px;
		}

		.dashes {
			left: 14px;
			right: 14px;
			justify-content: center;
			gap: 2px;
			padding: 2px 6px;
		}

		.dash {
			width: auto;
			flex: 1 1 0;
		}
	}
</style>
