import { getTweets } from '~~/server/db/tweet.js'
import { tweetTransformer } from '~~/server/transformers/tweet'

export default defineEventHandler(async (event) => {
	/* 
	{
  "tweets": [
    {
		"id": "642c267c26f58a883416f6af",
		"text": "Thus is my testing tweet",
		"createdAt": "2023-04-04T13:30:36.504Z",
		"updatedAt": "2023-04-04T13:30:36.504Z",
		"authorId": "642724c563751cb70ef74c8f",
		"replyToId": null
		},
		{
		"id": "642c295126f58a883416f6b3",
		"text": "loading",
		"createdAt": "2023-04-04T13:42:41.898Z",
		"updatedAt": "2023-04-04T13:42:41.898Z",
		"authorId": "642724c563751cb70ef74c8f",
		"replyToId": null
		},
		...
	}

	zelimo da includujemo da nam se jos vrati iz baze i author, posto ovde imamo samo authorId, i zelimo mediaFiles
	*/
	const tweets = await getTweets({
		// ono sto hocemo da includujemo putem prisme, a iz mongodb-a
		include: {
			author: true,
			mediaFiles: true,
			// replies: true,
			replies: {
				include: {
					author: true,
				},
			},
			replyTo: {
				include: {
					author: true,
				},
			},
		},
		orderBy: [
			{ createdAt: 'desc' }, // najnoviji tvitovi ce biti gore, oni stariji ce biti dole
		],
	})

	return {
		// hi: 'hello',
		// tweets: [],
		// tweets: tweets,
		tweets: tweets.map(tweetTransformer),
	}
})
