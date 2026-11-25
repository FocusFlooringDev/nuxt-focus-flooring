<script setup lang="ts">
	const props = defineProps({
		id: {
			type: String
		},
		name: {
			type: String
		},
		size: {
			type: String
		},
		cost: {
			type: Number
		},
		client: {
			type: String
		},
		scope: {
			type: String
		},
		srcImg: {
			type: String
		},
		alt: {
			type: String
		},
		category: {
			type: String
		},
		slug: {
			type: String
		},
		gallery: {
			type: Array as PropType<{ src: string; alt: string }[]>
		},
		// Open the pop-up on page load (used by /portfolio?project=<slug>)
		autoOpen: {
			type: Boolean,
			default: false
		}
	})

	const isOpen = ref(false)
	const card = ref<{ $el?: HTMLElement } | null>(null)

	// Gallery photos when the project has them, otherwise its single photo
	const photos = computed(() =>
		props.gallery?.length
			? props.gallery
			: [{ src: props.srcImg ?? '', alt: props.alt ?? '' }]
	)
	const current = ref(0)
	const show = (i: number) => {
		current.value = (i + photos.value.length) % photos.value.length
	}
	watch(isOpen, (open) => {
		if (open) current.value = 0
	})

	onMounted(() => {
		if (props.autoOpen) {
			card.value?.$el?.scrollIntoView?.({ block: 'center' })
			isOpen.value = true
		}
	})
</script>

<template>
	<UBlogPost
		ref="card"
		:image="{
			src: srcImg,
			alt: alt,
			format: 'webp',
			sizes: '150px sm:225px md:350px'
		}"
		:title="name"
		:ui="{
			title:
				'text-gray-900 dark:text-white text-xl whitespace-normal font-semibold  group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200',
			image: {
				wrapper: 'aspect-[9/10]'
			}
		}"
	>
		<UButton
			label="Learn More"
			class="text-midnight-950"
			color="focusyellow"
			@click="isOpen = true"
		/>
	</UBlogPost>
	<UModal
		v-model="isOpen"
		:ui="{
			rounded: 'rounded-2xl',
			width: 'w-full sm:max-w-5xl '
		}"
	>
		<UCard
			:ui="{
				base: 'h-full flex flex-col',
				rounded: '',
				divide: 'divide-y divide-gray-100 dark:divide-gray-800',
				body: {
					base: 'grow'
				}
			}"
		>
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
					>
						{{ name }}
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="isOpen = false"
					/>
				</div>
			</template>
			<div class="gallery">
				<NuxtImg
					:key="photos[current].src"
					:src="photos[current].src"
					class="gallery-photo"
					:alt="photos[current].alt"
					format="webp"
				/>
				<template v-if="photos.length > 1">
					<button
						class="gallery-arrow gallery-prev"
						aria-label="Previous photo"
						@click="show(current - 1)"
					>
						‹
					</button>
					<button
						class="gallery-arrow gallery-next"
						aria-label="Next photo"
						@click="show(current + 1)"
					>
						›
					</button>
					<span class="gallery-count">
						{{ current + 1 }} / {{ photos.length }}
					</span>
				</template>
			</div>
			<div v-if="photos.length > 1" class="gallery-thumbs">
				<button
					v-for="(photo, i) in photos"
					:key="photo.src"
					class="gallery-thumb"
					:class="{ 'is-active': i === current }"
					:aria-label="`Show photo ${i + 1}`"
					:aria-current="i === current"
					@click="show(i)"
				>
					<NuxtImg
						:src="photo.src"
						:alt="photo.alt"
						format="webp"
						width="120"
						loading="lazy"
					/>
				</button>
			</div>
			<div class="p-4">
				<div class="p-4">
					<p v-if="size">
						<span class="font-bold">Size: </span>
						<span class="uppercase">{{ size }}</span>
					</p>
					<p><span class="font-bold">Client: </span> {{ client }}</p>
					<p><span class="font-bold">Scope: </span> {{ scope }}</p>
				</div>
			</div>
		</UCard>
	</UModal>
</template>

<style scoped>
	.gallery {
		position: relative;
		aspect-ratio: 3 / 2;
		background: var(--midnight);
	}

	.gallery-photo {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.gallery-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		border: 0;
		background: rgba(23, 29, 26, 0.55);
		color: #f1f1f1;
		font-size: 24px;
		line-height: 1;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.gallery-arrow:hover,
	.gallery-arrow:focus-visible {
		background: var(--focus-yellow);
		color: var(--midnight);
	}

	.gallery-prev {
		left: 10px;
	}

	.gallery-next {
		right: 10px;
	}

	.gallery-count {
		position: absolute;
		bottom: 10px;
		right: 10px;
		padding: 2px 8px;
		background: rgba(23, 29, 26, 0.55);
		color: #f1f1f1;
		font-size: 13px;
	}

	.gallery-thumbs {
		display: flex;
		gap: 8px;
		padding: 12px 16px 0;
		overflow-x: auto;
	}

	.gallery-thumb {
		flex: 0 0 72px;
		height: 54px;
		padding: 0;
		border: 2px solid transparent;
		background: none;
		cursor: pointer;
		opacity: 0.7;
	}

	.gallery-thumb.is-active {
		border-color: var(--focus-yellow);
		opacity: 1;
	}

	.gallery-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.sideby {
		display: grid;
		container-type: inline-size;
		gap: var(--s2);
		grid-template-columns: 1fr;
	}

	.sideby > img {
		display: block;
	}

	@container (min-width: 700px) {
		.sideby {
			grid-template-columns: 1fr 1fr;
		}
	}

	.v-enter-active,
	.v-leave-active {
		transition: transform 0.4s ease;
	}

	.v-enter-from,
	.v-leave-to {
		transform: translateY(-100%);
	}
</style>
