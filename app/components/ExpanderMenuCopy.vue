<script setup lang="ts">
	const accordion = ref(null)

	function useAccordion(e: Event) {
		const activePanel = (e.target as Element).closest('.accordion-panel')

		if (!activePanel) return
		toggleAccordion(activePanel)
	}

	function toggleAccordion(panalToActivate: Element) {
		const buttons =
			panalToActivate.parentElement?.querySelectorAll('.accordion-trigger')
		const links = panalToActivate.parentElement?.querySelectorAll('.alink')
		const contents =
			panalToActivate.parentElement?.querySelectorAll('.accordion-content')

		buttons?.forEach((button) => {
			button.setAttribute('aria-expanded', 'false')
		})
		links?.forEach((link) => {
			link.style.display = 'none'
			link.tabindex = -1
			link.setAttribute('disabled', 'true')
		})
		contents?.forEach((content) => {
			content.setAttribute('aria-hidden', 'true')
		})

		panalToActivate.querySelector('.alink').style.display = 'block'
		panalToActivate.querySelector('.alink').tabindex = 1
		panalToActivate.querySelector('.alink').setAttribute('disabled', 'false')
		panalToActivate
			.querySelector('.accordion-trigger')
			?.setAttribute('aria-expanded', 'true')
		panalToActivate
			.querySelector('.accordion-content')
			?.setAttribute('aria-hidden', 'false')
	}
	const sectors = [
		{
			name: 'Aviation',
			icon: 'i-tabler-plane',
			to: '/portfolio?category=Aviation',
			image: '/sectors/tpa-concourse.jpg',
			focus: 'center 55%',
			alt: 'Bright airport concourse with polished floors and overhead lighting'
		},
		{
			name: 'K–12 Education',
			icon: 'i-tabler-backpack',
			to: '/portfolio?category=Education',
			image: '/sectors/sumner-courtyard.jpg',
			focus: 'center 55%',
			alt: 'School courtyard walkway between blue and white classroom buildings'
		},
		{
			name: 'Healthcare',
			icon: 'i-tabler-stethoscope',
			to: '/portfolio?category=Healthcare',
			image: '/sectors/moffitt-corridor.jpg',
			focus: 'center 60%',
			alt: 'Corridor with patterned carpet and wood-look flooring'
		},
		{
			name: 'Multi-Family',
			icon: 'i-tabler-building',
			to: '/portfolio?category=Residential+%26+Hospitality',
			image: '/sectors/mf-kitchen.jpg',
			focus: 'center 62%',
			alt: 'Apartment kitchen and living area with wood-look flooring'
		},
		{
			name: 'Higher Education',
			icon: 'i-tabler-school',
			to: '/portfolio',
			image: '/sectors/usfsp-vanity.jpg',
			focus: 'center 45%',
			alt: 'Restroom vanity with a green tile wall and wood cabinet'
		}
	]
</script>

<template>
	<div class="wrapper" @focusin="useAccordion">
		<div class="accordion" ref="accordion" @click="useAccordion">
			<div
				v-for="(sector, i) in sectors"
				:key="sector.name"
				class="accordion-panel"
			>
				<h3 :id="`panel${i + 1}-heading`">
					<button
						class="accordion-trigger"
						:aria-controls="`panel${i + 1}-content`"
						:aria-expanded="i === 0 ? 'true' : 'false'"
					>
						<span :id="`panel${i + 1}-title`" class="accordion-title">{{
							sector.name
						}}</span>
						<span aria-hidden="true" class="accordion-icon">
							<UIcon :name="sector.icon" class="w-full h-full" />
						</span>
					</button>
				</h3>
				<div
					class="accordion-content"
					:id="`panel${i + 1}-content`"
					:aria-labelledby="`panel${i + 1}-heading`"
					aria-hidden="true"
					role="region"
				>
					<UButton
						:label="`See our ${sector.name} Portfolio`"
						color="focusyellow"
						class="text-midnight-950 alink"
						:to="sector.to"
					/>
					<NuxtImg
						class="accordion-image"
						:src="sector.image"
						:style="{ objectPosition: sector.focus }"
						fit="fit"
						sizes="400px sm:640px md:500px lg:700px"
						format="webp"
						loading="lazy"
						:alt="sector.alt"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	img {
		max-width: 100%;
		display: block;
		mix-blend-mode: luminosity;
		opacity: 0.2;

		transition:
			mix-blend-mode 500ms ease-in-out,
			opacity 500ms ease-in-out;
	}

	.accordion-panel:has([aria-expanded='true']) img {
		mix-blend-mode: normal;
		opacity: 1;
	}

	.wrapper {
		margin-inline: auto;
	}

	.accordion {
		--_button-size: 3rem;
		--_panel-padding: 0.75rem;
		--_panel-gap: 1rem;
		--_animation: 500ms ease-in-out;

		display: flex;
		flex-direction: column;

		contain: content;
	}

	@media (min-width: 45em) {
		.accordion {
			flex-direction: row;
			height: 90vh;
			max-height: 700px;
		}
	}

	.accordion * {
		margin: 0;
	}

	.accordion-panel {
		position: relative;
		isolation: isolate;
		background-color: var(--midnight);
		flex-basis: calc(var(--_button-size) + (var(--_panel-padding) * 2));
		overflow: hidden;
		padding: var(--_panel-padding);
		padding-right: calc(var(--_panel-padding) * 4);
		transition:
			flex-basis var(--_animation),
			flex-grow var(--_animation);
	}

	@media (perfers-reduced-motion: no-preference) {
		.accordion-panel {
			transition: none;
		}
	}

	.accordion-panel:has([aria-expanded='true']) {
		flex-basis: clamp(15rem, 30vh, 25rem);
		flex-grow: 1;
	}

	.accordion-trigger {
		outline: 0;
	}
	.accordion-panel:focus-within {
		outline: 3px solid oklch(87.74% 0.2 117.97);
		outline-offset: 3px;
	}

	.accordion-content > p {
		color: white;
		display: grid;
		transform: translateY(2rem);
		opacity: 0;
		height: 100%;

		transition:
			transform 500ms 250ms ease-in-out,
			opacity 500ms 250ms ease-in-out;

		margin-left: calc(var(--_button-size) + var(--_panel-gap));
	}

	@media (perfers-reduced-motion) {
		.accordion-content > p {
			transition: none;
		}
	}

	.accordion-panel:has([aria-expanded='true']) p {
		transform: translateY(0);
		opacity: 1;
	}

	.accordion-title {
		font-size: 1.5em;
		color: white;
		text-align: left;
		width: max-content;

		position: relative;
		isolation: isolate;

		display: grid;
		align-items: center;

		transform-origin: -2.5rem;
		rotate: 90deg;

		transition: rotate var(--_animation);
	}

	.accordion-panel:has([aria-expanded='true']) .accordion-title {
		rotate: 0deg;
	}

	@media (max-width: 44.999em) {
		.accordion-title {
			rotate: 0deg;
		}

		.accordion-title::after {
			content: '';
			position: absolute;

			left: calc((var(--_panel-gap) + var(--_button-size)) * -1);
			width: calc(100% + var(--_button-size) * 2);
			height: var(--_button-size);
			background: hsl(0 0% 0%/0.5);
			z-index: -1;
		}
	}

	.accordion-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		z-index: -1;

		transition: filter var(--_animation);
	}

	.accordion-panel:has([aria-expanded='true']) .accordion-image {
		filter: brightness(1);
	}

	.accordion-trigger {
		display: flex;
		align-items: center;
		gap: var(--_panel-gap);
		flex-direction: row-reverse;
		background: transparent;
		border: 0;
		padding: 0;
	}

	.accordion-icon {
		color: var(--midnight);
		display: block;
		flex-shrink: 0;
		background-color: oklch(87.74% 0.2 117.97);
		width: var(--_button-size);
		aspect-ratio: 1/1;
		padding: 0.5rem;
		border-radius: 50%;
		z-index: 10;
	}

	.alink {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		transform: translateX(100%);
		opacity: 0;

		transition:
			transform 500ms 250ms ease-in-out,
			opacity 500ms 250ms ease-in-out;
	}

	.accordion-panel:has([aria-expanded='true']) .alink {
		@starting-style {
			transform: translateX(155%);
		}
		transform: translateX(0);
		opacity: 1;
		bottom: 2rem;
		right: 2rem;
	}

	.accordion-panel:has([aria-expanded='false']) .alink {
		@starting-style {
			transform: translateX(0);
		}
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		transform: translateX(100%);
		opacity: 0;
	}
</style>
