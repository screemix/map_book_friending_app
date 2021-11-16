import React, { FC, useState } from 'react'
import { ISearchItem } from '../_model/types'

import cn from './SearchItem.module.scss'

const SearchItem: FC<ISearchItem> = (props) => {
	const [open, setOpen] = useState<boolean>(false)
	// const [text, setText] = useState<string>('')
	// const toggle = (t: boolean) =>
	if (open) {
		return (
			<div className={cn.popup}>
				<button onClick={() => setOpen(!open)}> close</button>
				<p>{props.description}</p>
			</div>
		)

	}
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
					<button onClick={() => { setOpen(!open) }}> read description</button>
				</div>
			</div>
		</>
	)
}
export default SearchItem