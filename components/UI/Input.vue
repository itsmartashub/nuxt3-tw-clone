<script setup>
// kada god se desi neka promena ovde, moramo da emitujemo u parentu
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
	type: {
		type: String,
		default: 'text',
	},
	modelValue: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: null,
	},
})
</script>

<template>
	<div>
		<label for="" v-if="props.label" class="block pl-3 ml-px text-sm font-medium">{{ props.label }}</label>
		<div class="mt-1">
			<!--
                npm i @tailwindcss/forms 
                pa idemo u tailwind.config.js i dodamo plugins: [ require('@tailwindcss/forms') ]
            -->
			<input
				@input="(event) => emits('update:modelValue', event.target.value)"
				:value="props.modelValue"
				:type="props.type"
				:placeholder="props.placeholder"
				class="block w-full px-4 border-gray-300 rounded-full shadow-md focus:ring-blue-300 focus:border-blue-500 sm:text-sm"
			/>
		</div>
	</div>
</template>
