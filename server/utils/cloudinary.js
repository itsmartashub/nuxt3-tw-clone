import { v2 as _cloudinary } from 'cloudinary'

const cloudinary = () => {
	const runtimeConfig = useRuntimeConfig()
	_cloudinary.config({
		cloud_name: runtimeConfig.cloudinaryCloudName,
		api_key: runtimeConfig.cloudinaryApiKey,
		api_secret: runtimeConfig.cloudinaryApiSecret,
	})

	return _cloudinary
}

export const uploadToCloudinary = (image) => {
	return new Promise((resolve, reject) => {
		/* 
        Pre nego sto ranujemo ovu f-ju cloudinary.uploader.upload() moramo da setupujemo credentials, a to cemo uraditi sa cloudinary.config().
        Ako bismo imali jos koji cloudinary metod, morali bismo ovo iznova da kucamo. Zato bolje da exctractujemo ovo */

		/* 
        Prvi argument je slika, a drugi je cb f-ja, koja za argumente ima error ukoliko dodje do neke greske, i data tj podaci o slici koje ce imati slika ako se uspesno uplaoaduje. */
		cloudinary().uploader.upload(image, (err, data) => {
			if (err) {
				reject(err)
			}
			resolve(data)
		})
	})
}
