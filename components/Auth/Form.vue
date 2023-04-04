<script setup>
const data = reactive({ username: '', password: '', loading: false })

async function handleLogin() {
	const { login } = useAuth()
	data.loading = true

	try {
		await login({ username: data.username, password: data.password })
	} catch (error) {
		console.log(error)
	}

	data.loading = false
}
</script>

<template>
	<div>
		<form @submit.prevent="handleLogin" class="pt-5 space-y-6">
			<UIInput label="Username" placeholder="@username" v-model="data.username" />

			<UIInput label="Password" placeholder="********" type="password" v-model="data.password" />

			<div>
				<button>Login</button>
			</div>
		</form>
	</div>
</template>
