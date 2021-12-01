import axios from 'axios'
import * as types from '../_model/types'
export const signUpReq = (user: types.regUser) => {
	axios({
		method: 'post',
		baseURL: process.env.REACT_APP_API_DOMAIN,
		url: '/auth/register',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		data: { ...user }
	}).catch((res) => {
		console.log(res)
		alert('something went wrong, check your fields')
	})
}
export const LogInreq = async (login: string, pass: string) => {
	let params = new URLSearchParams()
	params.append('grant_type', '')
	params.append('username', login)
	params.append('password', pass)
	params.append('scope', '')
	params.append('client_id', '')
	params.append('client_secret', '')
	const get = axios({
		method: 'post',
		baseURL: process.env.REACT_APP_API_DOMAIN,
		url: '/auth/jwt/login',
		headers: {
			// "accept": "application/json",
			"accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
			"content-type": "application/x-www-form-urlencoded",
			// 'Content-Type': 'application/json',

		},
		data: params
	})
	const dataPromise = get.then((response) => response.data)
	return dataPromise

}
