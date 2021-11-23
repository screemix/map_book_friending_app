import React, { memo, useState } from 'react'
import history from '../../../helpers/history'
import { LogInreq } from '../_model/service'
import * as Routes from '../../../helpers/routes'
import cn from '../Auth.module.scss'



const LogIn = () => {
	const [login, setLogin] = useState('')
	const [pass, setPass] = useState('')
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		LogInreq(
			login,
			pass
		).then((res) => {
			localStorage.setItem('token', res.access_token);
			history.push(Routes.HOME)
		}).catch(() => {
			alert('something went wrong, check your fields')
		})

	}
	const goto = () => {
		history.push('Signup')
	}
	return (
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
			<p onClick={goto} className={cn.root__link}>New comer?</p>

		</div>
	)
}
export default memo(LogIn)