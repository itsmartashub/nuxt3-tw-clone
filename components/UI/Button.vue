<script setup>
const emit = defineEmits(['onClick'])

const props = defineProps({
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: 'md',
	},
	liquid: {
		type: Boolean,
		default: false,
	},
})

const paddingClasses = computed(() => {
	switch (props.size) {
		case 'sm':
			return 'py-2 px-3'
		case 'lg':
			return 'py-3 px-4'
		default:
			return 'py-3 px-3'
	}
})

const textFontSize = computed(() => {
	switch (props.size) {
		case 'lg':
			return 'text-md'
		default:
			return 'text-sm'
	}
})

const defaultWidth = computed(() => {
	switch (props.size) {
		default:
			return 'w-min'
	}
})

const dynamicClasses = computed(() => `${paddingClasses.value} ${props.liquid ? 'w-full' : defaultWidth.value}`)

function handleClick(e) {
	emit('onClick', e)
}
</script>

<template>
	<button
		class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
		:disabled="props.disabled"
		:class="dynamicClasses"
		@click="handleClick"
	>
		<span :class="textFontSize">
			<slot />
		</span>
	</button>
</template>
