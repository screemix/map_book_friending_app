import React, { memo } from 'react'
import { useLocation } from 'react-router-dom'
import history from '../helpers/history'
import avatar from '../Icons/avatar.png'
import * as Routes from '../helpers/routes'

import cn from './Header.module.scss'

const Header = () => {

	const { pathname } = useLocation();

	if (pathname === Routes.LOGIN || pathname === Routes.SIGNUP)
		return null

	const handleClick = () => {
		localStorage.removeItem('token')
		sessionStorage.removeItem('token')
		history.push(Routes.LOGIN)
	}
	const goto = (link: string) => {
		history.push(link)
	}
	return (
		<>
			<div
				style={{
					display: 'flex',
					// height: '70px',
					width: '100%',
					backgroundColor: 'rgb(239, 239, 239)'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', width: "95%", justifyContent: 'center' }}>
					<div className={cn.button} onClick={() => goto(Routes.HOME)}>
						<p>Search Books</p>
					</div>
					<div className={cn.button} onClick={() => goto(Routes.USERS)}>
						<p>Search Users</p>
					</div>
				</div>
				<div style={{
					display: 'flex',
					// height: '70px',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					<img src={avatar} style={{ margin: "5px 10px 5px 0", width: '40px' }} alt="avatar" />
					<div onClick={handleClick}>Sign Out</div>
				</div>
			</div>
		</>
	)
}
export default memo(Header)