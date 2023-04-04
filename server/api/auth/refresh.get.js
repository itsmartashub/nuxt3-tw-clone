import { sendError } from 'h3' // nije mi jasno sto druge stvari ne importujemo iz h3, koje su iz h3, al sentError uvek
import { getRefreshTokenByToken } from '../../db/refreshTokens.js'
import { decodeRefreshToken, generateTokens } from '../../utils/jwt.js'
import { getUserById } from '../../db/users.js'

export default defineEventHandler(async (event) => {
	// https://stackoverflow.com/questions/74756773/how-can-i-get-cookie-value-on-server-in-nuxt3

	// const cookies = parseCookies(event) // ovo je iz h3
	const refreshToken = getCookie(event, 'refresh_token') // ovo je iz h3
	// const refreshToken = cookies.refresh_token

	// console.log(cookies)
	// console.log(refreshToken)

	if (!refreshToken) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Refresh token is invalied',
			})
		)
	}

	// sledece, morao da proverimo da li ovaj refreshToken postoji u nasoj db
	const rToken = await getRefreshTokenByToken(refreshToken) // idemo u server/db/refreshTokens.js i tamo kreiramo ovu f-ju, te je ovde importujemo

	if (!rToken) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Refresh token is invalied',
			})
		)
	}

	// idemo u server/utils/jwt.js gde kreiramo decodeRefreshToken() f-ju kojom verifikujemo token
	const token = decodeRefreshToken(refreshToken)

	//
	try {
		const user = await getUserById(token.userId) // kreiramo ovu f-ju u server/db/users.js, te je importujemo ovde

		// sada kada smo dobili korisnika ciji je ono token bio, sada mu mozemo generisati novi token. taj metod smo vec kreirali i koristili. To je generateTokens iz server/utils/jwt.js'
		const { accessToken } = generateTokens(user)

		// return { user }
		return { access_token: accessToken }
	} catch (error) {
		return sendError(
			event,
			createError({
				statusCode: 500,
				statusMessage: 'Something went wrong',
			})
		)
	}

	// ovo smo koristili samo za testiranje rikvestova za svaku stvar sto smo radili
	// return {
	// 	// hello: 'world', // testing
	// 	// hello: refreshToken,
	// 	// hello: rToken,
	// 	hello: token, // { "hello": { "userId": "642724c563751cb70ef74c8f", "iat": 1680287543,"exp":1680301943 } }
	// }
})

/*
NE RAZUMEM ZASTO NIGDE NISMO SIGNOVALI TOKENE IZ .ENV
const runtimeConfig = useRuntimeConfig()
runtimeConfig.jwtAccessSecret = accessToken
runtimeConfig.jwtRefreshSecret = refreshToken
console.log('ACCESS_TOKEN', accessToken)
console.log('REFRESH_TOKEN', refreshToken) */
