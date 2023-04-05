/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	darkMode: 'class',

	/* 
	[components/Tweet/Item/Actions/Icon.vue]
	Naime, kada twnd sve kompajluje, ako tu postoji klasa koja se ne koristi (dakle prvo stavimo blue recimo, ona ce raditi, ali kada kasnije dinamicki to promenimo tipa u red, to nece vise raditi), nece je staviti u poslednji CSS fajl koji se generisao. Ono sto moramo da uradimo da bismo preventirali ovo jeste da konfugurisemo safelist key koji je array klasa koje zelimo da budu dinamicke, unutar tailwindcss.config.js */
	safelist: [
		{
			pattern: /text-(red|green|blue)-(100|400)/,
			variants: ['group-hover'],
		},
		{
			pattern: /bg-(red|green|blue)-(100|400)/,
			variants: ['group-hover'],
		},
	],

	theme: {
		screens: {
			xs: '614px',
			sm: '1002px',
			md: '1022px',
			lg: '1092px',
			xl: '1280px',
		},

		extend: {
			colors: {
				dim: {
					50: '#5F99F7',
					100: '#5F99F7',
					200: '#38444d',
					300: '#202e3a',
					400: '#253341',
					500: '#5F99F7',
					600: '#5F99F7',
					700: '#192734',
					800: '#162d40',
					900: '#15202b',
				},
			},
		},
	},

	plugins: [require('@tailwindcss/forms')],
}
