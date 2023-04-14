<script setup>
import { ChatBubbleOvalLeftEllipsisIcon, ArrowPathIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
	tweet: {
		type: Object,
		required: true,
	},
	compact: {
		type: Boolean,
		default: false,
	},
})

// ako je compact true, zelimo da se prikazu stats, ako je false, zelimo da se ne prikazu showStats, WTF
const showStats = computed(() => props.compact)
const size = computed(() => (props.compact ? 5 : 8))

function generateRandomNumber() {
	return Math.floor(Math.random() * 100)
}
</script>

<template>
	<div class="flex items-center justify-around w-full">
		<TweetItemActionsIcon color="blue" :size="size">
			<!--
            ovo v-slot:icon="{ classes }" mozemo i pristupiti:
            v-slot:icon="iconSlot.classes", i posle umesto :class="classes" u komponenti: :class="iconSlot.classes", al isa destruktuiranjem je cistija sintaksa -->
			<template v-slot:icon="{ classes }">
				<ChatBubbleOvalLeftEllipsisIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				{{ props.tweet.repliesCount }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="green" :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowPathIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="red" :size="size">
			<template v-slot:icon="{ classes }">
				<HeartIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>

		<TweetItemActionsIcon color="blue" :size="size">
			<template v-slot:icon="{ classes }">
				<ArrowUpTrayIcon :class="classes" />
			</template>
			<template v-if="showStats" v-slot:default>
				{{ generateRandomNumber() }}
			</template>
		</TweetItemActionsIcon>
	</div>
</template>
