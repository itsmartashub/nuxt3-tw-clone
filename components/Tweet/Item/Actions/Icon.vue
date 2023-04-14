<script setup>
// import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/solid'

const { defaultTransition } = useTailwindConfig()

const props = defineProps({
	color: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		default: 5,
	},
})
</script>

<template>
	<!-- Svaka od ovih icona ce biti drugacije boje: chat plave, retweet zelene, srce crvene, itd. Zato cemo uciniti ove komponente dinamickim tako da komponenta moze da prihvati boju koja ce promeniti kontekt unutar svake ikonice.
    Idemo da kreiramo props gore.

    I sad mislimo da samo mozemo jednostavno da bajndujemo props.color u tailwind klasu group-hover:text-${props.color}-400 medjutim, kada kasnije promenimo boju u neku drugu, to se ne poprimi na ovaj element.
    Naime, kada twnd sve kompajluje, ako tu postoji klasa koja se ne koristi (dakle prvo stavimo blue recimo, ona ce raditi, ali kada kasnije dinamicki to promenimo tipa u red, to nece vise raditi), nece je staviti u poslednji CSS fajl koji se generisao. Ono sto moramo da uradimo da bismo preventirali ovo jeste da konfugurisemo safelist key koji je array klasa koje zelimo da budu dinamicke, unutar tailwindcss.config.js
    -->

	<!-- kada hoverujemo na parenta zelimo da se promeni nesto na childu. U tailwindcssu to je izvodljivo koristeci group klasu na parentu, a potom umesto hover na childu, stavljamo group-hover:.... -->
	<div class="flex items-center text-gray-400 cursor-pointer group">
		<div
			:class="`p-2 rounded-full group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`"
		>
			<!-- <ChatBubbleOvalLeftEllipsisIcon class="w-5 h-5" /> -->

			<!-- slot - sad mozemo da pristupimo ovim podacima unutar Parenta ove komponente -->
			<slot name="icon" :classes="`w-${props.size} h-${props.size}`" />
		</div>

		<span :class="`ml-1 group-hover:text-${props.color}-400 ${defaultTransition}`">
			<!-- 5 -->
			<slot name="default"></slot>
		</span>
	</div>
</template>
