import formidable from 'formidable'
import { createTweet } from '../../../db/tweet.js'
import { createMediaFile } from '../../../db/mediaFiles.js'
import { tweetTransformer } from '~~/server/transformers/tweet.js'
import { uploadToCloudinary } from '../../../utils/cloudinary.js'

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

	const replyTo = fields.replyTo

	/*  bila sam zaboravila  && replyTo !== 'undefined'  u if-u i imala sam error i nisam mogla da kliknem na tweet kad ispisem tvit, a da se on kreira, 
	Inconsistent column data: Malformed ObjectID: provided hex string representation must be exactly 12 bytes, instead got: "undefined", length 9 for the field 'replyTo */
	if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') tweetData.replyToId = replyTo
	// i sad cemo unutar naseg field za /api/user/tweets da unesemo replyTo i vrednost kao form fields (multipart) cisto zarad testa.

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
		// console.log(files, key)
		const file = files[key]
		const cloudinaryResource = await uploadToCloudinary(file.filepath) // treba da prosledimo sliku
		// console.log(cloudinaryResource)
		/* 
		OVO JE RESPONSE:
			{                                                    
				asset_id: '7509f92cf2c4a067f56391a581d0247b',
				public_id: 'txj3iti0higvpet6emhr',
				version: 1680533073,
				version_id: 'a97ba5c806fa2414d3cffb5280e5b718',
				signature: '4bc35c58fb407654473b7e6ffcbd2c5a0129a258',
				width: 564,
				height: 564,
				format: 'jpg',
				resource_type: 'image',
				created_at: '2023-04-03T14:44:33Z',
				tags: [],
				bytes: 44104,
				type: 'upload',
				etag: '3841f9d7ef37b1aae000464857e6b7f8',
				placeholder: false,
				url: 'http://res.cloudinary.com/dlaxdfkvm/image/upload/v1680533073/txj3iti0higvpet6emhr.jpg',
				secure_url: 'https://res.cloudinary.com/dlaxdfkvm/image/upload/v1680533073/txj3iti0higvpet6emhr.jpg',
				folder: '',
				original_filename: 'd7dc5cfba472edc30dcdcfc00',
				api_key: NECU DA TI KAZEM
			}
		*/

		// kreiracemo ga u server/db/mediaFiles.js i ogde importovati
		return createMediaFile({
			url: cloudinaryResource.secure_url,
			providerPublicId: cloudinaryResource.public_id,
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
		tweet: tweetTransformer(tweet),
		// files: files,
	}
})

/* 
Postoji vise nacina da se pristupi bodiju kao multi-part form. U nasem slucaju koristicemo lib formidable: npm i formidable
*/
