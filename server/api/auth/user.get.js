import { userTransformer } from '~~/server/transformers/user'

export default defineEventHandler(async (event) => {
	return {
		// user: event.context.auth?.user,
		user: userTransformer(event.context.auth?.user),
	}
})
