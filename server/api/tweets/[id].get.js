import { getTweetById } from '~~/server/db/tweet'
import { tweetTransformer } from '~~/server/transformers/tweet'

export default defineEventHandler(async (event) => {
	const { id } = event.context.params

	/*
     iz response vidimo da nam fale neke stvari koje su null, a to e author, replies, replyTo, repliesCount. Zato idemo nazad u getTweetById() da dodaco include za svaki od ovih koji nedostaje.
     
     za params ove getTweetById() f-je stavljamo ono sto zelimo da includujemo (author: true, mediaFiles: true, replyTo: true), ovo true znaci da includujemo PRVI LEVEL OD ReLATIONSHIP NESTINGA, ali mi zapravo zelimo i authora, zato za replyTo ne stavljamo samo true, vec replyTo: { include: { author: true } }
     */
	const tweet = await getTweetById(id, {
		include: {
			author: true,
			mediaFiles: true,
			// replyTo: true,
			replyTo: {
				include: {
					author: true,
				},
			},
			replies: {
				include: {
					author: true,
					replyTo: {
						include: {
							author: true,
						},
					},
				},
			},
		},
	})

	return {
		// proba: 'test'
		// proba: id,
		// tweet: tweet,
		tweet: tweetTransformer(tweet),
	}
})

// idemo da kreiramo u server/db/tweets.js f-ju getTweetById()
