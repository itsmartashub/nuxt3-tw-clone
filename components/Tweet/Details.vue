<script setup>
const props = defineProps({
	tweet: {
		type: Object,
		required: true,
	},
	user: {
		type: Object,
		required: true,
	},
})

const replies = computed(() => props.tweet?.replies || [])

function handleFormSuccess(tweet) {
	navigateTo({
		path: `/status/${tweet.id}`,
	})
}
/* medjutim, bez obzira sto se URL menja, i ovo kao radi s te strane. nama se stranica ne menja vec mroamo da rifresjujemo. Da bismo to popravili moramo da watchujemo promene URL adrese.
Idemo u pages/statys/[id].vue  da dodamo watch()  */
</script>

<template>
	<div>
		<TweetItem :tweet="props.tweet" />
		<TweetForm
			placeholder="Tweet your reply"
			:reply-to="props.tweet"
			:user="props.user"
			@on-success="handleFormSuccess"
		/>
		<TweetListFeed :tweets="replies" />
	</div>
</template>
