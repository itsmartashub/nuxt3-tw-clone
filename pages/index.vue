<script setup>
const loading = ref(false)
const { useAuthUser } = useAuth()
const user = useAuthUser()

/* 💥💥💥💥💥💥💥💥💥💥 
jedino sto je za sad ostalo sto se auth tice, jeste da iza scene automatski regenerisemo access token 40min, 12min, koliko god, PRE NEGO STO ACCESS TOKEN KOJI SMO KREIRALI ISTEKNE 

Instaliracemo lib JWT-DECODE: npm i jwt-decode
Koju cemo da koristimo u composables/useAuth.js
💥💥💥💥💥💥💥💥💥💥 */
</script>

<template>
	<div>
		<MainSection title="Home" :loading="loading"> {{ user }} </MainSection>
	</div>
</template>
