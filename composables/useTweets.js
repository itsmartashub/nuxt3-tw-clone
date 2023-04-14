export default () => {
	const postTweet = (formData) => {
		const form = new FormData() // Content-Type: multipart/form-data;

		form.append('text', formData.text)
		form.append('replyTo', formData.replyTo)

		formData.mediaFiles.forEach((mediaFile, i) => {
			form.append(`media_file_[${i}]`, mediaFile)
		})

		return useFetchApi('/api/user/tweets', {
			// koiistimo useFetchApi() composable koji smo vec kreirali
			method: 'POST',
			body: form,
		})
	}

	const getHomeTweets = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi('/api/tweets', {
					method: 'GET',
				}) // useFetchApi je composables koji smo kreirali

				console.log(response)

				// resolve(true) // ovo je da bismo izbegli infinite load, zato moramo resolve na kraju uvek
				resolve(response)
			} catch (error) {
				reject(error)
			}
		})
	}

	const getTweetById = (tweetId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi(`/api/tweets/${tweetId}`)

				resolve(response)
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		postTweet,
		getHomeTweets,
		getTweetById,
	}
}
