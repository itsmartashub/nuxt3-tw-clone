<script setup>
import { ChatBubbleOvalLeftEllipsisIcon, ArrowPathIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
	tweet: {
		type: Object,
		required: true,
	},
})

function generateRandomNumber() {
	return Math.floor(Math.random() * 100)
}
</script>

<template>
	<div class="flex items-center justify-around w-full">
		<TweetItemActionsIcon color="blue">
			<!--
            ovo v-slot:icon="{ classes }" mozemo i pristupiti:
            v-slot:icon="iconSlot.classes", i posle umesto :class="classes" u komponenti: :class="iconSlot.classes", al isa destruktuiranjem je cistija sintaksa -->
			<template v-slot:icon="{ classes }">
				<ChatBubbleOvalLeftEllipsisIcon :class="classes" />
			</template>
			<template v-slot:default> {{ props.tweet.repliesCount }}</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="green">
			<template v-slot:icon="{ classes }">
				<ArrowPathIcon :class="classes" />
			</template>
			<template v-slot:default> {{ generateRandomNumber() }} </template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="red">
			<template v-slot:icon="{ classes }">
				<HeartIcon :class="classes" />
			</template>
			<template v-slot:default> {{ generateRandomNumber() }} </template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="blue">
			<template v-slot:icon="{ classes }">
				<ArrowUpTrayIcon :class="classes" />
			</template>
			<template v-slot:default> {{ generateRandomNumber() }} </template>
		</TweetItemActionsIcon>
	</div>
</template>
