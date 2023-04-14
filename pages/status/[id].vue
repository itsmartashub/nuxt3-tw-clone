<script setup>
const route = useRoute()
const loading = ref(false)
const tweet = ref(null)

const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const user = useAuthUser()

// watchujemo promenu url adrese da ne bismo morali da rifresujemo rucno stranicu na svaki reply
watch(
	() => useRoute().fullPath,
	() => getTweet()
)

function getTweetIdFromRoute() {
	return useRoute().params.id
}

async function getTweet() {
	console.log('getTweet()')
	loading.value = true
	try {
		console.log(useRoute().params.id)
		console.log(getTweetIdFromRoute())

		const response = await getTweetById(getTweetIdFromRoute())

		tweet.value = response.tweet
		// console.log(response)
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}

onBeforeMount(() => {
	getTweetIdFromRoute()
	useRoute().params.id

	// getTweet()
	console.log('onBeforeMount')
})
</script>

<template>
	<div>
		<MainSection title="Home" :loading="loading">
			<Head>
				<Title>Tweet</Title>
			</Head>

			<!-- <h1>{{ getTweetIdFromRoute() }}</h1> -->

			<TweetDetails :user="user" :tweet="tweet" />
		</MainSection>
	</div>
</template>
