<script setup>
	function handleBuy(e) {
	
		const pass = window.prompt()
		if (pass === 'FFFstore01') {
			window.location.href =
				'https://envision-cs.com/store/Focus-Flooring-c156562751'
		} else {
			return window.location
		}
	}

	const route = useRoute()
	// On the home page the header sits on top of the photo slideshow
	const isHome = computed(() => route.path === '/')

	const links = [
		{
			label: 'Our History',
			to: '/our-history'
		},
		{
			label: 'About',
			icon: 'i-heroicons-square-3-stack-3d',
			children: [
				{
					label: 'About Us',
					to: '/about-us'
				},
				{
					label: 'Meet the team',
					to: '/meet-the-team'
				},
				{
					label: 'Join our team',
					to: '/join-our-team'
				}
			]
		},
		{
			label: 'Our Process',
			to: '/our-process'
		},
		{
			label: 'Portfolio',
			to: '/portfolio'
		},
		{
			label: 'Contact',
			to: '/contact/general-contact'
		}
	]
</script>

<template>
	<div :class="isHome ? 'absolute inset-x-0 top-0 z-50' : ''">
		<UHeader
			:links="links"
			:class="isHome ? '!bg-transparent backdrop-blur-none' : ''"
		>
			<template #logo>
				<NuxtImg
					src="/Focus_Flooring_logo_white.svg"
					alt="Focus Flooring Logo"
					width="120"
					height="30"
					fit="contain"
				/>
			</template>
			<template #right>
				<template v-if="isHome">
					<UButton
						to="/our-process"
						variant="outline"
						color="focusyellow"
						class="hidden lg:inline-flex hover:text-midnight-950"
					>
						See our process
					</UButton>
				</template>
				<UButton
					href="https://envision-cs.com/store/Focus-Flooring-c156562751"
					@click="handleBuy(event)"
					ref="lastFocusableElement"
					color="focusyellow"
					class="text-midnight-950"
				>
					Shop
				</UButton>
			</template>
			<template #panel>
				<UNavigationTree :links="links" />
				<div v-if="isHome" class="mt-6 flex flex-col gap-3">
					<UButton
						to="/our-process"
						variant="outline"
						color="focusyellow"
						block
					>
						See our process
					</UButton>
				</div>
			</template>
		</UHeader>
	</div>
</template>

<style scoped></style>
