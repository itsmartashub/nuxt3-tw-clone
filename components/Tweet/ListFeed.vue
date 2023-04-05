<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig()

const props = defineProps({
	tweets: {
		type: Array,
		required: true,
	},
})

const isEmptyArray = computed(() => props.tweets.length === 0)
</script>

<template>
	<div>
		<!--
		ono sto takodje treba da hendlujemo jeste sta se desava kad je Array prazan, tj imamo nula tvitova. Posto imamo tvitove ne mozemo videti kako ovo izgleda. Pa cemo da simuliramo. Idemo u pages/index.vue i u <TweetListFeed :tweets="[]"/> cemo proslediti za tweets props prazan array -->
		<div v-if="isEmptyArray" class="p-4">
			<p class="text-center text-gray-800 dark:text-white">No tweets 😥</p>
		</div>

		<div
			v-for="tweet in props.tweets"
			class="pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300"
			:class="[twitterBorderColor, defaultTransition]"
			:key="tweet.id"
		>
			<TweetItem :tweet="tweet" />
		</div>
	</div>
</template>
