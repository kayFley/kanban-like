import React, { useState } from 'react'
import { FaFire } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'

import Card from '@/widgets/Card'

const BurnBarrel = ({
	setCards,
}: {
	setCards: React.Dispatch<React.SetStateAction<Card[]>>
}): JSX.Element => {
	const [active, setActive] = useState(false)

	const handleDragOver = (e: React.DragEvent): void => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDragEnd = (e: React.DragEvent): void => {
		const cardId: string = e.dataTransfer.getData('cardId')

		setCards(prevCards => prevCards.filter(c => c.id !== cardId))

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

export default BurnBarrel
