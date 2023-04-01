// sadrzace svu logku. grabovace informacije iz access tokena, dekodovace ga, potom sacuvati i attachovati na rikvest, i tako cemo imati pristup svakom korisniku koji mejkuje rikvest gde god je token attached

import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { sendError } from 'h3'
import { getUserById } from '../db/users'

export default defineEventHandler(async (event) => {
	// prvo moramo da definisemo gde ce se ovaj middleware koristiti. Ako to ne uradimo, ranovace se na SVIM RIKVESTOVIMA, a to svakako ne zelimo. Koristicemo module koji se zove url-pattern pa hajde da ga instaliramo: npm i url-pattern
	const endpoints = ['/api/auth/user']

	const isHandledByThisMiddleware = endpoints.some((endpoint) => {
		const pattern = new UrlPattern(endpoint)

		// console.log(endpoint)
		// console.log(event.node.req.url)
		// console.log(pattern)
		// console.log(pattern.match(event.node.req.url))
		return pattern.match(event.node.req.url)
	})

	// console.log(!isHandledByThisMiddleware)

	if (!isHandledByThisMiddleware) return

	const token = event.node.req.headers['authorization']?.split(' ')[1]
	// console.log(token)

	const decoded = decodeAccessToken(token)
	// console.log(decoded)

	if (!decoded) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			})
		)
	}

	try {
		const userId = decoded.userId
		const user = await getUserById(userId)
		// console.log(user)
		// console.log(event.context)
		// console.log('sve super')
		event.context.auth = { user }
	} catch (error) {
		console.log('greska alo', error)
		return
	}
})
