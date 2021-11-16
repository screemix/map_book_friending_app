import React, { memo } from 'react'
import { useLocation } from 'react-router-dom'
import history from '../helpers/history'
import avatar from '../Icons/avatar.png'
const Header = () => {

	const { pathname } = useLocation();

	if (pathname === "/login" || pathname === "/signup")
		return null

	const handleClick = () => {
		localStorage.removeItem('token')
		sessionStorage.removeItem('token')
		history.push('/login')
	}
	return (
		<>
			<div
				style={{
					display: 'flex',
					height: '100px',
					justifyContent: 'end',
				}}
			>
				<div style={{
					display: 'flex',
					height: '100px',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					<img src={avatar} style={{ margin: "10px", width: '80px' }} />
					<div onClick={handleClick}>Sign Out</div>
				</div>
			</div>
		</>
	)
}
export default memo(Header)