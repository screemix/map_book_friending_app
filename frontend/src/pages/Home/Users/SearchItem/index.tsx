import React, { FC, memo } from 'react'

import cn from './SearchItem.module.scss'

export interface ISearchItem {
	email: string,
	isActive: boolean,
	isSuperuser: boolean,
	isVerified: boolean,
	favoriteBooks: Array<string>,
	matchedUsers: Array<string>,
	age: number,
	gender: string,
	name: string,
	city: string,
	open: Function
}
const SearchItem: FC<ISearchItem> = (props) => {
	return (
		<>
			<div className={cn.root}>
				<h1>Search Users:</h1>
				<div className={cn.table}>
					<p className={cn.table__name}>name</p>
					<p className={cn.table__age}>age</p>
					<p className={cn.table__gender}>gender</p>
					<p className={cn.table__city}>city</p>
					<p className={cn.table__books}>favourite books</p>
					<p className={cn.table__email}>email</p>
					<p className={cn.table__users}>matched users</p>
				</div>
				<div className={cn.table__item}>
					<p className={cn.table__name}>{props.name}</p>
					<p className={cn.table__age}>{props.age}</p>
					<p className={cn.table__gender}>{props.gender}</p>
					<p className={cn.table__city}>{props.city}</p>
					<div className={cn.table__books}>
						<button disabled={props.favoriteBooks.length === 0} onClick={() => props.open(props.favoriteBooks)}>
							see fabourite books
						</button>
					</div>

					<p className={cn.table__email}>{props.email}</p>
					<div className={cn.table__users}>
						<button disabled={props.matchedUsers.length === 0} onClick={() => props.open(props.matchedUsers)}>
							see matched users
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
export default memo(SearchItem)