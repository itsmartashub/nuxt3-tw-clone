<script setup>
const { twitterBorderColor } = useTailwindConfig()
const { getHomeTweets } = useTweets()

const loading = ref(false)
// const homeTweets = ref([{ 2: 2 }, { 1: 1 }]) // cisto da vidimo dda li ovo radi
const homeTweets = ref([])
const { useAuthUser } = useAuth()
const user = useAuthUser()

/* 💥💥💥💥💥💥💥💥💥💥 
jedino sto je za sad ostalo sto se auth tice, jeste da iza scene automatski regenerisemo access token 40min, 12min, koliko god, PRE NEGO STO ACCESS TOKEN KOJI SMO KREIRALI ISTEKNE 

Instaliracemo lib JWT-DECODE: npm i jwt-decode
Koju cemo da koristimo u composables/useAuth.js
💥💥💥💥💥💥💥💥💥💥 */

onBeforeMount(async () => {
	loading.value = true
	try {
		const { tweets } = await getHomeTweets()

		homeTweets.value = tweets
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
})
</script>

<template>
	<div>
		<MainSection title="Home" :loading="loading">
			<Head>
				<Title>Home / Twitter</Title>
			</Head>

			<div class="border-b" :class="twitterBorderColor">
				<TweetForm :user="user" />
			</div>

			<!-- sa :tweets="[]" simuliramo to da recimo nemamo ni jedan tvit, kako izgleda page -->
			<!-- <TweetListFeed :tweets="[]" /> -->
			<TweetListFeed :tweets="homeTweets" />
		</MainSection>
	</div>
</template>
