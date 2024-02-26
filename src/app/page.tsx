'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaFire } from 'react-icons/fa'
import { FiPlus, FiTrash } from 'react-icons/fi'

export default function NotionKanban() {
	return (
		<div className='h-screen w-full bg-neutral-900 text-neutral-50'>
			<Board />
		</div>
	)
}

const Board = () => {
	const [cards, setCards] = useState([])
	const [hasChecked, setHasChecked] = useState(false)

	useEffect(() => {
		hasChecked && localStorage.setItem('cards', JSON.stringify(cards))
	}, [cards])

	useEffect(() => {
		const cardData = localStorage.getItem('cards')

		setCards(cardData ? JSON.parse(cardData) : [])

		setHasChecked(true)
	}, [])

	return (
		<div className='flex h-full w-full gap-3 overflow-scroll p-12'>
			<Column
				title='Backlog'
				column='backlog'
				headingColor='text-neutral-500'
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title='TODO'
				column='todo'
				headingColor='text-yellow-200'
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title='In progress'
				column='doing'
				headingColor='text-blue-200'
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title='Complete'
				column='done'
				headingColor='text-emerald-200'
				cards={cards}
				setCards={setCards}
			/>
			<BurnBarrel setCards={setCards} />
		</div>
	)
}

const Column = ({ title, headingColor, column, cards, setCards }) => {
	const [active, setActive] = useState(false)

	const handleDragStart = (e, card) => {
		e.dataTransfer.setData('cardId', card.id)
	}

	const handleDragEnd = e => {
		const cardId = e.dataTransfer.getData('cardId')

		setActive(false)
		clearHighlights()

		const indicators = getIndicators()
		const { element } = getNearestIndicator(e, indicators)

		const before = element.dataset.before || '-1'

		if (before !== cardId) {
			let copy = [...cards]

			let cardToTransfer = copy.find(c => c.id === cardId)
			if (!cardToTransfer) return
			cardToTransfer = { ...cardToTransfer, column }

			copy = copy.filter(c => c.id !== cardId)

			const moveToBack = before === '-1'

			if (moveToBack) {
				copy.push(cardToTransfer)
			} else {
				const insertAtIndex = copy.findIndex(el => el.id === before)
				if (insertAtIndex === undefined) return

				copy.splice(insertAtIndex, 0, cardToTransfer)
			}

			setCards(copy)
		}
	}

	const handleDragOver = e => {
		e.preventDefault()
		highlightIndicator(e)

		setActive(true)
	}

	const clearHighlights = els => {
		const indicators = els || getIndicators()

		indicators.forEach(i => {
			i.style.opacity = '0'
		})
	}

	const highlightIndicator = e => {
		const indicators = getIndicators()

		clearHighlights(indicators)

		const el = getNearestIndicator(e, indicators)

		el.element.style.opacity = '1'
	}

	const getNearestIndicator = (e, indicators) => {
		const DISTANCE_OFFSET = 50

		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect()

				const offset = e.clientY - (box.top + DISTANCE_OFFSET)

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child }
				} else {
					return closest
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1],
			},
		)

		return el
	}

	const getIndicators = () => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
	}

	const handleDragLeave = () => {
		clearHighlights()
		setActive(false)
	}

	const filteredCards = cards.filter(c => c.column === column)

	return (
		<div className='w-56 shrink-0'>
			<div className='mb-3 flex items-center justify-between'>
				<h3 className={`font-medium ${headingColor}`}>{title}</h3>
				<span className='rounded text-sm text-neutral-400'>
					{filteredCards.length}
				</span>
			</div>
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDragEnd}
				className={`h-full w-full transition-colors 
				${active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'}`}
			>
				{filteredCards.map(c => {
					return <Card key={c.id} {...c} handleDragStart={handleDragStart} />
				})}
				<DropIndicator beforeId='-1' column={column} />
				<AddCard column={column} setCards={setCards} />
			</div>
		</div>
	)
}

const Card = ({ title, id, column, handleDragStart }) => {
	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.div
				layout
				layoutId={id}
				draggable='true'
				onDragStart={e => handleDragStart(e, { title, id, column })}
				className='cursor-grap rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'
			>
				<p className='text-sm text-neutral-100'>{title}</p>
			</motion.div>
		</>
	)
}

const DropIndicator = ({ beforeId, column }) => {
	return (
		<div
			data-before={beforeId || '-1'}
			data-column={column}
			className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
		/>
	)
}

const BurnBarrel = ({ setCards }) => {
	const [active, setActive] = useState(false)

	const handleDragOver = e => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDragEnd = e => {
		const cardId = e.dataTransfer.getData('cardId')

		setCards(pv => pv.filter(c => c.id !== cardId))

		setActive(false)
	}

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl 
			${
				active
					? 'border-red-800 bg-red-800/20 text-red-500'
					: 'border-neutral-500 bg-neutral-500/20 text-neutral-500'
			}`}
		>
			{active ? <FaFire className='animate-bounce' /> : <FiTrash />}
		</div>
	)
}

const AddCard = ({ column, setCards }) => {
	const [text, setText] = useState('')
	const [adding, setAdding] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()

		if (!text.trim().length) return

		const newCard = {
			column,
			title: text.trim(),
			id: Math.random().toString(),
		}

		setCards(pv => [...pv, newCard])

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

const DEFAULT_CARDS = [
	// BACKLOG
	{
		title: 'Improve accessibility features on website',
		id: '1',
		column: 'backlog',
	},
	{
		title: 'Implement new payment gateway integration',
		id: '2',
		column: 'backlog',
	},
	{
		title: 'Optimize database queries for faster performance',
		id: '3',
		column: 'backlog',
	},
	{
		title: 'Design user-friendly onboarding process',
		id: '4',
		column: 'backlog',
	},
	// TODO
	{
		title: 'Evaluate cloud providers for scalability',
		id: '5',
		column: 'todo',
	},
	{
		title: 'Implement CI/CD pipeline for new service',
		id: '6',
		column: 'todo',
	},
	{
		title: 'Conduct security audit for infrastructure',
		id: '7',
		column: 'todo',
	},

	// DOING
	{
		title: 'Refactor context providers to use Zustand',
		id: '8',
		column: 'doing',
	},
	{
		title:
			'Implement state management using Zustand in existing Context Providers"',
		id: '9',
		column: 'doing',
	},
	// DONE
	{
		title: 'Set up DD dashboards',
		id: '10',
		column: 'done',
	},
]
