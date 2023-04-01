import jwt from 'jsonwebtoken'

// Imacemo 2 secret key-a, jedan za Access Token a drugi za Refresh Token
const generateAccessToken = (user) => {
	const runtimeConfig = useRuntimeConfig()

	// rvi argument za jwt.sign() ce biti ono sto ce ovaj jwt da zadrzi, u nasem slucaju je to userId, drugi parametar je nas secret, tj runtimeConfig .jwtAccessSecret, a za treci argument pisemo kada istice ovaj token
	return jwt.sign({ userId: user.id }, runtimeConfig.jwtAccessSecret, {
		expiresIn: '10m', // access token cemo da metnemo da istice za 10 minuta, a refresh cemo da stavimo da bude aktivan bar 4 sata
	})
}

// za generisanje refresh tokena potreban nam je neki identifikator, u ovom slucaju ce to biti user id, pa cemo u generateRefreshToken() da prosledimo user
const generateRefreshToken = (user) => {
	const runtimeConfig = useRuntimeConfig()

	return jwt.sign({ userId: user.id }, runtimeConfig.jwtRefreshSecret, {
		expiresIn: '4h', // da bude aktivan bar 4 sata
	})
}

/* 🧨🧨🧨🧨🧨 
sto se tice access i regfresh tokena, onaj koji cemo ad ekspousdujemo je access token, a refresh token ce biti sacuvan u kukiju koji ce biti http-only sto znaci da ce samo serveer moci da mu pristupi.

Idemo prvo u schema.prisma da kreiramo novi model RefreshToken i relation sa User, potom u terminalu pushujemo to sa npx prisma db push. Nakon toga, kreiramo novi js fajl db/refreshTokens.js gde kreiramo f-ju createRefreshToken koju cemo potom da importujemo u auth/login.post.js i tu koristimo
🧨🧨🧨🧨🧨*/

export const decodeRefreshToken = (token) => {
	const runtimeConfig = useRuntimeConfig()

	try {
		return jwt.verify(token, runtimeConfig.jwtRefreshSecret)
	} catch (error) {
		return null
	}
}

export const decodeAccessToken = (token) => {
	const runtimeConfig = useRuntimeConfig()

	try {
		return jwt.verify(token, runtimeConfig.jwtAccessSecret)
	} catch (error) {
		return null
	}
}

export const generateTokens = (user) => {
	const accessToken = generateAccessToken(user)
	const refreshToken = generateRefreshToken(user)

	return {
		accessToken,
		refreshToken,
	}
}

export const sendRefreshToken = (event, token) => {
	// You can use getCookie and setCookie from h3 package to set cookies in server API routes
	setCookie(event, 'refresh_token', token, {
		httpOnly: true,
		sameSite: true,
	}) // drugi argument je ime kukija, a treci vrednost, cetvriti su neke opcije
}

/* 
The HttpOnly Attribute

	The HttpOnly attribute limits the scope of the cookie to HTTP requests.  In particular, the attribute instructs the user agent to omit the cookie when providing access to cookies via "non-HTTP" APIs
	(such as a web browser API that exposes cookies to scripts).

	https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.6


---------------------------------------------------
The SameSite Attribute

	The "SameSite" attribute limits the scope of the cookie such that it will only be attached to requests if those requests are same-site, as defined by the algorithm in Section 5.2.  For example, requests for "https://example.com/sekrit-image" will attach same-site cookies if and only if initiated from a context whose "site for cookies" is "example.com".

	https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7
*/
