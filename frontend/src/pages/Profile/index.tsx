import React, { memo, useEffect, useState } from 'react'
import { getMe } from './_model/service'
import { getOneBook } from '../Search/Users/_model/service'
import avatar from '../../Icons/avatar.png'

import cn from './Profile.module.scss'

const Profile = () => {
	const [data, setData] = useState<any>(undefined)
	const [books, setBooks] = useState<string[]>()

	const GetMeReq = async () => {
		getMe().then((res) => {
			setData(res)
		}).catch((er) => {
			alert("Something went wrong")
		})
	}

	const getOneBooksReq = async () => {
		let ar: any[] = []
		data.favourite_books_ids.forEach((item: any) => {
			getOneBook(item).then((res) => {
				console.log(item, ar)
				ar.push(res)
			}).catch((er) => {
				// alert("Something went wrong")
			})
		})
		setBooks(ar)
	}
	useEffect(() => {
		if (data !== undefined) getOneBooksReq()
	}, [data])
	useEffect(() => {
		GetMeReq()
	}, [])
	if (!data) return (<p>please wait or try again...</p>)
	return (
		<div className={cn.root}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img src={avatar} style={{ margin: "5px 10px 5px 0", width: '100px' }} alt="avatar" />
				<p>{!data ? 'User Profile' : data.name}</p>
			</div>
			<div className={cn.content}>
				<div className={cn.content__main}>
					<h4>Main info</h4>
					<p className={cn.table__age}>Age: {!data ? '-' : data.age}</p>
					<p className={cn.table__gender}>Gender: {!data ? '-' : data.gender}</p>
					<p className={cn.table__city}>City: {!data ? '-' : data.city}</p>
					<p className={cn.table__email}>Email: {!data ? '-' : data.email}</p>
				</div>
				<div className={cn.content__users}>
					<h4>Matched users</h4>
					{data.mathced_users ? data.mathced_users.map((item: any) => {
						return (
							<p>{item}</p>
						)
					}) : <p>no users</p>}

				</div>
				<div className={cn.content__users}>
					<h4>Liked books</h4>
					{books && books.length !== 0 ? books.map((item: any) => {
						return (
							<p>{item.title}</p>
						)
					}) : <p>no books</p>}

				</div>
			</div>
		</div>
	)
}
export default memo(Profile)