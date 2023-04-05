import jwt_decode from 'jwt-decode'

export default () => {
	const useAuthToken = () => useState('auth_token') // useState je f-ja koju ovo nam Nuxt provajduje, kao neka lajt verzija Pinie. Tipa ako ne zelimo da koristimo Piniu, a zelimo neke podatke koristimo globalno, mozemo korisiti useState
	const useAuthUser = () => useState('auth_user')
	const useAuthLoading = () => useState('auth_loading', () => true) // difoltno vrednost auth_loading-a ce biti true, sto stavljamo za drugi parametar ovom useState(). Odnosno, stavljamo arrow-fn koja vraca true (() => true), a da smo stavili samo true za drugi parametar, bio vi error 500: init is not a function

	const setToken = (newToken) => {
		const authToken = useAuthToken()
		authToken.value = newToken
	}
	const setUser = (newUser) => {
		const authUser = useAuthUser()
		authUser.value = newUser
	}
	const setIsAuthLoading = (value) => {
		const authLoading = useAuthLoading()
		authLoading.value = value
	}

	const login = ({ username, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				/* let { data } = await useFetch('/api/auth/login', {
					method: 'POST',
					body: {
						username,
						password,
					},
				})
				data = toRaw(data.value) */

				const data = await $fetch('/api/auth/login', {
					method: 'POST',
					body: {
						username,
						password,
					},
				})
				// console.log(data)

				setToken(data.access_token)
				setUser(data.user)

				/* 
				ovo ne cuvamo u LocalStorage ili Cookie, access_token zelimo da imamo samo u memoriji, ako se rifresuje stranica, nema ga vise, al i idalje mozemo da dohvatimo Session koisteci refresh token */

				/* 				
				useFetch zamrzava nasu aplikaciju dk ne vidimo podatke, a sa useLazyFetch zelimo da prikazemo loader

				console.log(data) // RefImpl
				console.log(data.value) // Proxy pa moramo da koristimo toRaw da konvertujemo u js prikaz
				console.log(toRaw(data.value)) // {...} tj odg od servera u obliku u kom nam apravo treba 
				*/

				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}

	const refreshToken = () => {
		return new Promise(async (resolve, reject) => {
			try {
				// let { data } = await useFetch('/api/auth/refresh')
				// data = toRaw(data.value)
				/* 
				SA useFetch() NECE RADITI, BICE ERROR JER VALKJDA ON KESIRA IL STA JA ZNAM */
				const data = await $fetch('/api/auth/refresh')

				setToken(data.access_token)
				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}

	const getUser = () => {
		/*
		ovde nam je sad potreban i access_token. I s obz na to da cemo da prosledjujemo ovaj access token u mnoge endpoints koje bi trebalo da su zasticene, kreiracemo composable useFetchApi.js */
		return new Promise(async (resolve, reject) => {
			try {
				/* let { data } = await useFetchApi('/api/auth/refresh')
				data = toRaw(data.value) */
				const data = await useFetchApi('/api/auth/user') // composables/useFetchApi.js. Ovom f-jom modifikujemo header iz rikvesta i attachujemo mu Bearer token
				setUser(data.user)

				resolve(true)
			} catch (error) {
				reject(error)
			}
		})
	}

	const reRefreshAccessToken = () => {
		// decodujemo access token koji je sacuvan u memoriji
		const authToken = useAuthToken()

		// console.log(authToken.value)

		if (!authToken.value) return

		const jwtDecoded = jwt_decode(authToken.value)
		// console.log(jwtDecoded)

		const newRefreshTime = jwtDecoded.exp - 60000

		// setTimeout(async () => {
		// 	await refreshToken()
		// 	reRefreshAccessToken()
		// }, 100)

		/* 		
		moramo sa async await, inace ove dve f-je ne cekaju jedna na drugi. Ovako sa await reRefreshAccessToken() se nece ranovati dok se refreshToken() ne zavrsi */
		setTimeout(async () => {
			await refreshToken()
			reRefreshAccessToken()
		}, newRefreshTime)
	}

	/* 
	initAuth ce se pozvati svaki x kada rifresujemo stranicu, jer podatke o korisniku, odn token ne cuvamo ni u localstorage, ni u cookie, vec samo u memoriji, te cemo morati kad god kor rifresuje stranicu ili ako istekne, da ponovo generisemo refresh token. Koristicemo ga unutar app.vue i pozvacemo ga na onBeforeAmount() */
	const initAuth = () => {
		// alert('initAuth')

		return new Promise(async (resolve, reject) => {
			setIsAuthLoading(true)

			try {
				await refreshToken()
				await getUser()
				// jednom kada imamo pristup novom access tokenu i korisniku, pozvacemo novi metod reRefreshAccessToken(), njega necemo morati da await-ujemo, on ce se runnovati u pozadini
				reRefreshAccessToken()

				resolve(true)
			} catch (error) {
				console.log(error)
				reject(error)
			} finally {
				setIsAuthLoading(false)
			}
		})
	}

	return {
		login,
		useAuthUser,
		useAuthToken,
		initAuth,
		useAuthLoading,
	}
}
