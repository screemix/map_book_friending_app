import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import history from '../../../helpers/history'
import { LogInreq } from '../_model/service'
import cn from '../Auth.module.scss'



const LogIn = () => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const [token, setToken] = useState('')
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		LogInreq(
			login,
			pass
		).then((res) => {
			setToken(res.access_token)
			sessionStorage.setItem('token', token);
			localStorage.setItem('token', token);
			history.push('/home')
		}).catch(() => {
			alert('something went wrong, check your fields')
		})

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
						<button type="submit">Log In</button>
					</div>
				</form>
				<Link to="/Signup" className={cn.root__link}>New comer?</Link>

			</div>
		</>
	)
}
export default memo(LogIn)