export const mediaFileTransformer = (mediaFile) => {
	// potrebni su nam samo id media fajla, i url
	return {
		id: mediaFile.id,
		url: mediaFile.url,
	}
}
