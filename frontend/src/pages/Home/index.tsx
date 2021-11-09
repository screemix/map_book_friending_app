import React, { memo } from 'react'
import history from '../../helpers/history'
const Home = () => {
	const handleClick = () => {
		localStorage.removeItem('token')
		sessionStorage.removeItem('token')
		history.push('/login')
	}
	return (
		<>
			<h1>Home</h1>
			<button onClick={handleClick}>sign out</button>
		</>
	)
}
export default memo(Home)