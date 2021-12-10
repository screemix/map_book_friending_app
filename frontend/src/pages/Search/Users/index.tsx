import React, { memo, useEffect, useState } from 'react'
import { getUsers, getOneBook } from './_model/service'
import SearchItem from './SearchItem'

import cn from './UsersPage.module.scss'
import cnItem from './SearchItem/SearchItem.module.scss'
const UsersPage = () => {
	const [users, setUsers] = useState<any>()

	const [open, setOpen] = useState<boolean>(false)

	const [bookIDS, setBookIDS] = useState<string[]>()
	const [book, setBook] = useState<any>()
	const [index, setIndex] = useState<number>(0)


	const searchBook = async () => {
		getUsers().then((res) => {
			setUsers(res)
		}).catch((er) => {
			alert("Something went wrong")
		})
	}

	const getOneBooksReq = async (id: string) => {
		getOneBook(id).then((res) => {
			setBook(res)
		}).catch((er) => {
			// alert("Something went wrong")
			setIndex(index + 1)
		})
	}
	useEffect(() => {
		searchBook()
	}, [])

	const openPopUp = (ar?: Array<string>) => {
		if (!ar) return
		setOpen(true)
		setBookIDS(ar)
		getOneBooksReq(ar[index])
	}
	const closePopUp = () => {
		setOpen(false)
		setBook(undefined)
		setIndex(0)
		setBookIDS(undefined)
	}
	useEffect(() => {
		if (bookIDS && (index + 1) > bookIDS.length) {
			setOpen(false)
			return
		}
		bookIDS && getOneBooksReq(bookIDS[index])
	}, [index])
	if (users === undefined || users.length === 0) {
		return (
			<p style={{ display: 'flex', justifyContent: 'center' }}>no matched users</p>
		)
	}
	return (
		<>
			{open && book &&
				<div className={cn.popup}>
					<button onClick={closePopUp}> close</button>
					<p>title: {book.title}</p>
					<p>author: {book.author}</p>
					<p>genres: {book.genres.map((item: any) =>
						<span>
							{`${item}; `}
						</span>
					)}
					</p>
					<p style={{ width: '380px', wordBreak: 'break-word' }}>description: {book.description}
					</p>
					<button disabled={index + 1 === bookIDS?.length} onClick={() => setIndex(index + 1)}> next book</button>
				</div>
			}
			<div className={cn.root}>
				<h1>Search Users:</h1>
				<div className={cnItem.table}>
					<p className={cnItem.table__name}>name</p>
					<p className={cnItem.table__age}>age</p>
					<p className={cnItem.table__gender}>gender</p>
					<p className={cnItem.table__city}>city</p>
					<p className={cnItem.table__books}>favourite books</p>
					<p className={cnItem.table__email}>email</p>
					<p className={cnItem.table__users}>matched users</p>
				</div>
				{users !== undefined && users.map((item: any) => {
					return (
						<SearchItem
							email={item.email}
							isActive={item.is_active}
							isSuperuser={item.is_superuser}
							isVerified={item.is_verified}
							favoriteBooks={item.favourite_books_ids}
							matchedUsers={item.matched_users}
							age={item.age}
							gender={item.gender}
							name={item.name}
							city={item.city}
							open={openPopUp}
						/>
					)
				})
				}
			</div>
		</>
	)
}
export default memo(UsersPage)