import React, { FC } from 'react'

import cn from './SearchItem.module.scss'

export interface ISearchItem {
	author: string
	description: string
	genres: Array<string>
	title: string
	id?: string
	open: Function
}
const SearchItem: FC<ISearchItem> = (props) => {
	return (
		<>

			<div className={cn.root}>
				<div className={cn.root__cont}>
					<p className={cn.title}>
						{props.title}
					</p>
				</div>
				<div>
					<p className={cn.author}>
						{props.author}
					</p>
				</div>
				<div className={cn.genres}>
					{props.genres.map((item) => {
						return (
							<p>
								{item}
							</p>
						)
					}
					)}
				</div>
				<div className={cn.root__cont}>
					<button onClick={() => props.open(props.description)}> read description</button>
				</div>
			</div>
		</>
	)
}
export default SearchItem