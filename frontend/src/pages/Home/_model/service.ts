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

export const addBookReq = (title: string, author: string, description: string, genres: Array<string>) => {
	const token = localStorage.getItem('token')
	axios({
		method: 'post',
		baseURL: process.env.REACT_APP_API_DOMAIN,
		url: '/books/',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		data: {
			title,
			author,
			description,
			genres
		}
	}).catch((res) => {
		console.log(res)
		alert('something went wrong, check your fields')
	})
}