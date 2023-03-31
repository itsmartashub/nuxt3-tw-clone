import bcrypt from 'bcrypt'
import { getUserByUsername } from '../../db/users.js'
import { generateTokens, sendRefreshToken } from '../../utils/jwt.js'
import { userTransformer } from '~~/server/transformers/user.js'
import { createRefreshToken } from '../../db/refreshTokens.js'
import { sendError } from 'h3'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { username, password } = body

	if (!username || !password) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Invalid params',
			})
		)
	}

	// Is the user registered
	const user = await getUserByUsername(username)
	if (!user) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Username or password is invalid',
			})
		)
	}
	// Compare Passwords
	const doesThePasswordMatch = await bcrypt.compare(password, user.password)

	if (!doesThePasswordMatch) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Username or password is invalid',
			})
		)
	}

	// Generate Tokens
	// Access Token
	// Refresh Token
	const { accessToken, refreshToken } = generateTokens(user)

	// Save the refresh token inside the database. Kreiramo novi model RefreshToken u schema.prisma
	await createRefreshToken({
		token: refreshToken,
		userId: user.id,
	})

	// Add http-only cookie
	sendRefreshToken(event, refreshToken) // prosledjujemo mu event, koji ima nesto sto se zove res.

	return {
		// user,
		// doesThePasswordMatch,
		// accessToken,
		// refreshToken,
		access_token: accessToken,
		user: userTransformer(user),
	}
})
