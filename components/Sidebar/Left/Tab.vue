<script setup>
const { defaultTransition } = useTailwindConfig()
const props = defineProps({
	active: {
		type: Boolean,
		default: false,
	},
})

const textClasses = computed(() => (props.active ? 'font-semibold' : 'font-normal'))
</script>

<template>
	<NuxtLink
		to="#"
		class="flex items-center gap-4 p-3 w-min text-black hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white"
	>
		<div class="w-6 h-6 text-dark" :class="defaultTransition">
			<slot name="icon"></slot>
		</div>
		<div class="hidden text-xl xl:block" :class="textClasses">
			<slot name="name"></slot>
		</div>
	</NuxtLink>
</template>
