import axios from 'axios'

export const searchBooksReq = async (title: string) => {

	const get = axios({
		method: 'get',
		baseURL: process.env.REACT_APP_API_DOMAIN,
		url: '/books/',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			"accept": "application/json",
		},
		params: {
			'q': title
		}
	})
	const dataPromise = get.then((response) => response.data)
	return dataPromise

}