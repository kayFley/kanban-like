import React from 'react'
import { motion } from 'framer-motion'

import { Props } from '@/interfaces'
import DropIndicator from '@/widgets/DropIndicator'

const Card = ({ title, id, column, handleDragStart }: Props): JSX.Element => {
	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.div
				layout
				layoutId={id}
				draggable='true'
				onDragStart={(e: React.DragEvent) =>
					handleDragStart(e, { title, id, column })
				}
				className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'
			>
				<p className='text-sm text-neutral-100'>{title}</p>
			</motion.div>
		</>
	)
}

export default Card
