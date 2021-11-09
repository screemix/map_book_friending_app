import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import history from '../../../helpers/history'
import { regUser } from '../_model/types'
import * as Routes from '../../../helpers/routes'
// import { postData } from '../_model/service'

import cn from '../Auth.module.scss'

const SignUp = () => {
	const [user, setUser] = useState<regUser>({
		favourite_books_ids: ["."],
		matched_users: ["."],
	})

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		// postData(user)
		history.push(Routes.LOGIN)
	}

	return (
		<>
			<div className={cn.root}>
				<h1>Please fill the form for registration</h1>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: "column",
					justifyContent: 'center',
					alignItems: 'center'
				}}
				>
					<label>
						<p>Name</p>
						<input
							value={user?.name}
							onChange={e => setUser({ ...user, name: e.target.value })}
							type="text"
							required
						/>
					</label>
					<label>
						<p>Password</p>
						<input
							autoComplete="new-password"
							value={user.password}
							onChange={e => setUser({ ...user, password: e.target.value })}
							type="password"
							required
						/>
					</label>
					<label>
						<p>Email</p>
						<input
							value={user?.email}
							onChange={e => setUser({ ...user, email: e.target.value })}
							type="text"
							required
						/>
					</label>
					<label>
						<p>Age</p>
						<input
							value={user?.age}
							onChange={e => setUser({ ...user, age: Number(e.target.value) })}
							type="number"
							required
						/>
					</label>
					<label>
						<p>City</p>
						<input
							value={user?.city}
							onChange={e => setUser({ ...user, city: e.target.value })}
							type="text"
							required
						/>
					</label>
					<label>
						<p>Gender</p>
						<input
							value={user?.gender}
							onChange={e => setUser({ ...user, gender: e.target.value })}
							type="text"
							required
						/>
					</label>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
				<Link to="/Login" className={cn.root__link}>Already have an account?</Link>

			</div>
		</>
	)
}
export default memo(SignUp)