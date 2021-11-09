export const temp = ''
// export async function loginUser(login: string, pass: string, credentials: any) {
// 	return fetch('http://localhost:8080/login', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(credentials)
// 	})
// 		.then(data => data.json())
// }
// export async function postData(user: any) {
// 	const response = await fetch('http://127.0.0.1:8000/auth/register', {
// 		method: 'POST',
// 		mode: 'no-cors', // no-cors, *cors, same-origin
		// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: 'same-origin', // include, *same-origin, omit
		// headers: {
			// 'Content-Type': 'application/json'
		// },
		// body: JSON.stringify(user) // body data type must match "Content-Type" header
	// });
	// return await response.json(); // parses JSON response into native JavaScript objects
// }
// const temp = () => {
// 	fetch('http://127.0.0.1:8000/auth/register', {
// 		method: 'POST',
// 		mode: 'no-cors',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({
// 			email: "temppp@example.com",
// 			password: "stringa",
// 			is_active: true,
// 			is_superuser: false,
// 			is_verified: false,
// 			favourite_books_ids: [
// 				"string"
// 			],
// 			matched_users: [
// 				"string"
// 			],
// 			age: 0,
// 			gender: "string",
// 			name: "string",
// 			city: "string"
// 		})
// 	}).then((response) => {
// 		// console.log(response.json())
// 		return response
// 	})
// 		.then((data) => {
// 			console.log(data);
// 		}).catch((res) => console.log(res))
// }
// const t = () => {
// 	axios({
// 		method: 'post',
// 		url: 'http://127.0.0.1:8000/auth/register',
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
// 			'Content-Type': 'application/json',
// 			mode: 'no-cors',
// 		},
// 		data: {
// 			email: "temppp@example.com",
// 			password: "stringa",
// 			is_active: true,
// 			is_superuser: false,
// 			is_verified: false,
// 			favourite_books_ids: [
// 				"string"
// 			],
// 			matched_users: [
// 				"string"
// 			],
// 			age: 0,
// 			gender: "string",
// 			name: "string",
// 			city: "string"
// 		}
// 	});
// }