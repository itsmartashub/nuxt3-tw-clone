<script setup>
const { twitterBorderColor } = useTailwindConfig()

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	loading: {
		type: Boolean,
		default: true,
	},
})
</script>

<template>
	<div class="border-x" :class="twitterBorderColor">
		<div class="sticky top-0 px-4 bg-white/80 backdrop-blur-md dark:bg-dim-900/80">
			<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ props.title }}</h2>
		</div>

		<div v-if="loading" class="flex items-center justify-center p-4 border-b">
			<UISpinner />
		</div>
		<div v-else>
			<slot></slot>
		</div>
	</div>
</template>
