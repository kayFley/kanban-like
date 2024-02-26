import React from 'react'

const DropIndicator = ({
	beforeId,
	column,
}: {
	beforeId: string | undefined
	column: string
}): JSX.Element => {
	return (
		<div
			data-before={beforeId ?? '-1'}
			data-column={column}
			className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
		/>
	)
}

export default DropIndicator
