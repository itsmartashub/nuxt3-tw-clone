export default (url, options = {}) => {
	const { useAuthToken } = useAuth()

	return $fetch(url, {
		...options,
		headers: {
			// overwriteovamo sta god da je u headers
			...options.headers,
			Authorization: `Bearer ${useAuthToken().value}`, // posto je useAuthToken() ref, moramo dodati .value
		},
	})
}
