import { prisma } from '.'

export const createTweet = (tweetData) => {
	return prisma.tweet.create({
		data: tweetData,
	})
}
export const getTweets = (params = {}) => {
	// TODO prepraviti getTweet u getTweets svugde gde s ekoristi
	return prisma.tweet.findMany({
		...params,
	})
}
// export const getTweetById = (tweetId) => {
// 	return prisma.tweet.findUnique({
// 		where: {
// 			id: tweetId,
// 		},
// 	})
// }
export const getTweetById = (tweetId, params = {}) => {
	return prisma.tweet.findUnique({
		...params,
		// overvtitujemo sta god da smo poslali where za key, zato on ide POSLE ...params. I sad tamo gde ovu f-ju getTweetById() pozivamo, za params stavljamo ono sto zelimo da includujemo (author, mediaFiles, replyTo)
		where: {
			...params.where,
			id: tweetId,
		},
	})
}
/* 
{
  "tweet": {
    "id": "642c267c26f58a883416f6af",
    "text": "Thus is my testing tweet",
    "mediaFiles": [
      {
        "id": "642c267d26f58a883416f6b0",
        "url": "https://res.cloudinary.com/dlaxdfkvm/image/upload/v1680615036/ge9vpbvtrstfi0qth5jx.jpg"
      }
    ],
    "author": {
      "id": "642724c563751cb70ef74c8f",
      "name": "test",
      "email": "test@test.com",
      "username": "test",
      "profileImage": "https://picsum.photos/200/200",
      "handle": "@test"
    },
    "replies": [
      {
        "id": "642c76bb90b98fc12826e666",
        "text": "jebeni tvit",
        "mediaFiles": [],
        "author": {
          "id": "642724c563751cb70ef74c8f",
          "name": "test",
          "email": "test@test.com",
          "username": "test",
          "profileImage": "https://picsum.photos/200/200",
          "handle": "@test"
        },
        "replies": [],
        "replyTo": {
          "id": "642c267c26f58a883416f6af",
          "text": "Thus is my testing tweet",
          "mediaFiles": [],
          "author": {
            "id": "642724c563751cb70ef74c8f",
            "name": "test",
            "email": "test@test.com",
            "username": "test",
            "profileImage": "https://picsum.photos/200/200",
            "handle": "@test"
          },
          "replies": [],
          "replyTo": null,
          "repliesCount": 0,
          "postedAtHuman": "1 day ago"
        },
        "repliesCount": 0,
        "postedAtHuman": "1 day ago"
      },
      {
        "id": "642c76de90b98fc12826e668",
        "text": "jebeni reply",
        "mediaFiles": [],
        "author": {
          "id": "642724c563751cb70ef74c8f",
          "name": "test",
          "email": "test@test.com",
          "username": "test",
          "profileImage": "https://picsum.photos/200/200",
          "handle": "@test"
        },
        "replies": [],
        "replyTo": {
          "id": "642c267c26f58a883416f6af",
          "text": "Thus is my testing tweet",
          "mediaFiles": [],
          "author": {
            "id": "642724c563751cb70ef74c8f",
            "name": "test",
            "email": "test@test.com",
            "username": "test",
            "profileImage": "https://picsum.photos/200/200",
            "handle": "@test"
          },
          "replies": [],
          "replyTo": null,
          "repliesCount": 0,
          "postedAtHuman": "1 day ago"
        },
        "repliesCount": 0,
        "postedAtHuman": "1 day ago"
      }
    ],
    "replyTo": null,
    "repliesCount": 2,
    "postedAtHuman": "1 day ago"
  }
} */
