import React, { memo, useState } from 'react'
import { searchBooksReq } from './_model/service'
import SearchItem from './SearchItem'
import cn from './Home.module.scss'
const Home = () => {
	const [books, setBooks] = useState<any>()
	const [title, setTitle] = useState('')
	const [open, setOpen] = useState<boolean>(false)
	const [desc, setDesc] = useState<string>('')
	const searchBook = async () => {
		searchBooksReq(title).then((res) => {
			setBooks(res)
		}).catch((er) => {
			alert("Something went wrong")
		})
	}
	const changeVal = (t: any) => {
		setTitle(t)
	}
	console.log(open)
	console.log(desc)
	const openDesciption = (text?: string) => {
		if (open && text) {
			setDesc(text)
		} else if (open && !text) {
			setOpen(false)
			setDesc('')
		} else {
			setOpen(true)
			text && setDesc(text)
		}
	}
	return (
		<>
			{open &&
				<div className={cn.popup}>
					<button onClick={() => openDesciption()}> close</button>
					<p>{desc}</p>
				</div>
			}
			<div className={cn.root}>
				<h1>Search Books:</h1>
				<div className={cn.search}>
					<input
						value={title}
						onChange={e => changeVal(e.target.value)}
						type="text"
					/>
					<button onClick={searchBook}>here</button>
				</div>
				{books !== undefined && Object.entries(books).map((item: any) => {
					return (
						<SearchItem
							author={item[1].author}
							description={item[1].description}
							genres={item[1].genres}
							title={item[1].title}
							open={openDesciption}
						// id={item[1].id}
						/>
					)
				})
				}
			</div>
		</>
	)
}
export default memo(Home)