import axios from 'axios'

export const getMe = async () => {
	const token = localStorage.getItem('token')
	const get = axios({
		method: 'get',
		baseURL: process.env.REACT_APP_API_DOMAIN,
		url: '/users/me',
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


