import formidable from 'formidable'
import { createTweet } from '../../../db/tweet.js'
import { createMediaFile } from '../../../db/mediaFiles.js'
import { tweetTransformer } from '~~/server/transformers/tweet.js'

export default defineEventHandler(async (event) => {
	// ovde pristupamo bodiju, ali u ovom slucaju ovo nece biti klasican json, vec multi-form forma podataka, a razlog za to je taj sto cemo slati i sliku, a to ne mozemo da uradimo ukoliko koristimo json formu. U Suprotnom bismo morali da da saljemo dva zahteva: jedan za kreiranje tvita, a onda i drugi za attachovanje slike.

	const form = formidable({})

	// console.log(form)
	// formidable ima metod parse() unutar koga mozemo proslediti rikvest

	const response = await new Promise((resolve, reject) => {
		form.parse(event.node.req, (err, fields, files) => {
			if (err) reject(err)

			resolve({ fields, files })
		})
	})

	const { fields, files } = response
	// sad hocemo da kreiramo tvit, ali ofc moramo da znamo i ko kreirao tvit, dakle potrebno je da znamo userId
	// const userId = null
	const userId = event.context?.auth?.user?.id
	// razlog zasto ovo nije attached je taj sto nismo dodali ovo za endpoint u nasem server middleware. Idemo u server/middleware/auth.js i u endpoints arrayu dodajemo '/api/user/tweets'

	// bice informacije koje cemo da provajdujemo kad god kreiramo tvit
	const tweetData = {
		authorId: userId,
		text: fields.text,
	}
	const tweet = await createTweet(tweetData)
	// idemo unutar db i kreiramo novi fajl tweet.js, kojim kreiramo prismom tweet u nasoj bazi. To radimo u createTweet() f-ju koju ovde importujemo

	// inace, kako smo kreirali userTransformer(), tako cemo kreirati i tweetTransformer(). Idemo u server/transformers/tweet.js

	/* 
	
	{
		"files": {
			"image_2": {
				"size": 44104,
				"filepath": "C:\\Users\\master\\AppData\\Local\\Temp\\6ee2cb4213249f614e15e2500",
				"newFilename": "6ee2cb4213249f614e15e2500",
				"mimetype": "image/jpeg",
				"mtime": "2023-04-01T18:19:24.280Z",
				"originalFilename": "1680188939177.jpeg"
			}
		}
	}

	posto files ovako izgleda, tj files je objekat i ima key i vrednost. Dakle moracemo da iterate kroz ovaj objakat sto znaci koristicemo Object.keys */
	const filePromises = Object.keys(files).map(async (key) => {
		return createMediaFile({
			// kreiracemo ga u server/db/mediaFiles.js i ogde importovati
			url: '',
			providerPublicId: 'random_id',
			userId: userId,
			tweetId: tweet.id,
		})
	}) // ovo vraca array of Promises

	await Promise.all(filePromises)

	return {
		// hello: 'world', // cisto da cekiramo odmah na pocetku da li ovo radi kada saeljmo rikvest na: /api/user/tweets recimo sa thunder-om
		// hello: response,
		// userId: userId === undefined, // checkiramo da li je userId undefifined
		// userId: userId,
		// tweet: tweet,
		// tweet: tweetTransformer(tweet),
		files: files,
	}
})

/* 
Postoji vise nacina da se pristupi bodiju kao multi-part form. U nasem slucaju koristicemo lib formidable: npm i formidable
*/
