import axios from 'axios'

export const getUsers = async () => {
	const token = localStorage.getItem('token')
	const get = axios({
		method: 'get',
		baseURL: process.env.REACT_APP_API_DOMAIN,
		url: '/users/matched',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			"accept": "application/json",
			'Authorization': `Bearer ${token}`
		},
	})
	const dataPromise = get.then((response) => response.data)
	return dataPromise
}
export const getOneBook = async (id: string) => {
	const token = localStorage.getItem('token')
	const get = axios({
		method: 'get',
		baseURL: process.env.REACT_APP_API_DOMAIN,
		url: '/books/get_one',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			"accept": "application/json",
			'Authorization': `Bearer ${token}`
		},
		params: {
			'book_id': id,
		}
	})
	const dataPromise = get.then((response) => response.data)
	return dataPromise
}

