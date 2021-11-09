import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import history from '../../../helpers/history'

import cn from '../Auth.module.scss'

// async function loginUser(login: string, pass: string) {
// 	return fetch('http://localhost:8080/login', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(credentials)
// 	})
// 		.then(data => data.json())
// }


const LogIn = () => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')

	const handleSubmit = async () => {
		const tempToken = 'testToken'
		sessionStorage.setItem('token', tempToken);
		localStorage.setItem('token', tempToken);
		history.push('/home')
	}

	return (
		<>
			<div className={cn.root}>
				<h1>Please Log In</h1>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: "column",
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<label>
						<p>Username</p>
						<input
							value={login}
							onChange={e => setLogin(e.target.value)}
							type="text"
							required
						/>
					</label>
					<label>
						<p>Password</p>
						<input
							value={pass}
							onChange={e => setPass(e.target.value)}
							type="password"
							required
						/>
					</label>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
				<Link to="/Signup" className={cn.root__link}>New comer?</Link>

			</div>
		</>
	)
}
export default memo(LogIn)