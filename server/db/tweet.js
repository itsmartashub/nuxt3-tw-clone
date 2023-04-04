import { prisma } from '.'

export const createTweet = (tweetData) => {
	return prisma.tweet.create({
		data: tweetData,
	})
}
export const getTweet = (params = {}) => {
	return prisma.tweet.findMany({
		...params,
	})
}
