<script setup>
const loading = ref(false)

const { postTweet } = useTweets()

const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
})

async function handleFormSubmit(data) {
	// console.log(data) // ovi podaci dolaze iz child komponente TweetFormInput. Sada idemo da hendlujemo ove podatke na bekendu. Idemo u composables/useTweets.js koji treba da kreiramo

	loading.value = true

	try {
		const response = await postTweet({
			text: data.text,
			mediaFiles: data.mediaFiles,
		})

		// console.log(response)
		// alert(response)
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div>
		<div v-if="loading" class="flex items-center justify-center py-6">
			<UISpinner />
		</div>

		<div v-else>
			<TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
		</div>
	</div>
</template>
