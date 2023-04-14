<script setup>
const emit = defineEmits(['onSuccess'])
const loading = ref(false)

const { postTweet } = useTweets()

const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
	placeholder: {
		type: String,
		default: "What's happening ?",
	},
	replyTo: {
		type: Object,
		default: null,
	},
})

async function handleFormSubmit(data) {
	// console.log(data) // ovi podaci dolaze iz child komponente TweetFormInput. Sada idemo da hendlujemo ove podatke na bekendu. Idemo u composables/useTweets.js koji treba da kreiramo

	loading.value = true

	try {
		const response = await postTweet({
			text: data.text,
			mediaFiles: data.mediaFiles,
			replyTo: props.replyTo?.id,

			// sad moramo de idemo u ovaj composable composables/useTweets.js gde je ova postTweet fn, i append-ovacemo 'replyTo': form.append('replyTo', formData.replyTo)
		})

		emit('onSuccess', response.tweet)
		// console.log(response)
		// alert(JSON.stringify(response))
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
			<TweetFormInput :placeholder="props.placeholder" :user="props.user" @onSubmit="handleFormSubmit" />
		</div>
	</div>
</template>
