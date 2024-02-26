import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

import Card from '@/widgets/Card'

const AddCard = ({
	column,
	setCards,
}: {
	column: string
	setCards: React.Dispatch<React.SetStateAction<Card[]>>
}): JSX.Element => {
	const [text, setText] = useState('')
	const [adding, setAdding] = useState(false)

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault()

		if (!text.trim()) return

		const newCard: Card = {
			column,
			title: text.trim(),
			id: Math.random().toString(),
		}

		setCards(prevCards => [...prevCards, newCard])
		setAdding(false)
	}

	return (
		<>
			{adding ? (
				<motion.form layout onSubmit={handleSubmit}>
					<textarea
						onChange={e => setText(e.target.value)}
						autoFocus
						placeholder='Add new task'
						className='w-full rounded border border-violet-400 bg-violet-400/20 p-3
						text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
					/>
					<div className='mt-1.5 flex items-center justify-end gap-1.5'>
						<button
							onClick={() => setAdding(false)}
							className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
						>
							Close
						</button>
						<button
							type='submit'
							className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5
										text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
						>
							<span>Add</span>
							<FiPlus />
						</button>
					</div>
				</motion.form>
			) : (
				<motion.button
					layout
					onClick={() => setAdding(true)}
					className='flex w-full items-center gap-1.5 px-3 py-1.5 text-xs
					text-neutral-400 transition-colors hover:text-neutral-50'
				>
					<span>Add card</span>
					<FiPlus />
				</motion.button>
			)}
		</>
	)
}

export default AddCard
