import React from 'react'

export interface CardInterface {
	id: string
	title: string
	column: string
}

export interface Props {
	title: string
	id: string
	column: string
	handleDragStart: (
		event: React.DragEvent,
		data: { title: string; id: string; column: string },
	) => void
}
