export default () => {
	const postTweet = (formData) => {
		const form = new FormData() // Content-Type: multipart/form-data;

		form.append('text', formData.text)

		formData.mediaFiles.forEach((mediaFile, i) => {
			form.append(`media_file_[${i}]`, mediaFile)
		})

		return useFetchApi('/api/user/tweets', {
			// koiistimo useFetchApi() composable koji smo vec kreirali
			method: 'POST',
			body: form,
		})
	}

	return {
		postTweet,
	}
}
