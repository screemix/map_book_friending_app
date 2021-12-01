import React, { memo, useState, FC } from 'react'
import { addBookReq } from '../_model/service'
import cn from './AddBook.module.scss'

interface Iab {
	open: Function
}
const AddBook: FC<Iab> = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [desc, setDesc] = useState('')
	const [genres, setGenres] = useState('')

	const handleSubmit = (e: any) => {
		e.preventDefault()
		addBookReq(title, author, desc, genres.split(','))
		props.open(false)
	}
	return (
		<>
			<div className={cn.popup}>
				<h1>Please fill the fields</h1>
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: "column",
					justifyContent: 'center',
					alignItems: 'center'
				}}
				>
					<label>
						<p>title</p>
						<input
							value={title}
							onChange={e => setTitle(e.target.value)}
							type="text"
							required
						/>
					</label>
					<label>
						<p>author</p>
						<input
							value={author}
							onChange={e => setAuthor(e.target.value)}
							type="text"
							required
						/>
					</label>
					<label>
						<p>description</p>
						<input
							value={desc}
							onChange={e => setDesc(e.target.value)}
							type="text"
							required
						/>
					</label>
					<label>
						<p>genres <span style={{ fontSize: '0.7em', fontStyle: 'italic' }}>(use coma)</span></p>
						<input
							value={genres}
							onChange={e => setGenres(e.target.value)}
							type="text"
							required
						/>
					</label>
					<div>
						<button type="submit">submit</button>
					</div>
					<div >
						<button style={{ marginTop: 0, color: 'red' }} onClick={() => props.open(false)}>cancel</button>
					</div>
				</form>
			</div>
		</>
	)
}
export default memo(AddBook)