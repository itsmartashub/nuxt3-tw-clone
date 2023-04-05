<script setup>
const loading = ref(true)
</script>

<template>
	<div>
		<MainSection title="Home" :loading="loading">
			<Head>
				<Title>Tweet</Title>
			</Head>
		</MainSection>
	</div>
</template>
