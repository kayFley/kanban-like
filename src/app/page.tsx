'use client'

import Board from '@/widgets/Board'

export default function NotionKanban(): JSX.Element {
	return (
		<div className='h-screen w-full bg-neutral-900 text-neutral-50'>
			<Board />
		</div>
	)
}

// const DEFAULT_CARDS = [
// 	// BACKLOG
// 	{
// 		title: 'Improve accessibility features on website',
// 		id: '1',
// 		column: 'backlog',
// 	},
// 	{
// 		title: 'Implement new payment gateway integration',
// 		id: '2',
// 		column: 'backlog',
// 	},
// 	{
// 		title: 'Optimize database queries for faster performance',
// 		id: '3',
// 		column: 'backlog',
// 	},
// 	{
// 		title: 'Design user-friendly onboarding process',
// 		id: '4',
// 		column: 'backlog',
// 	},
// 	// TODO
// 	{
// 		title: 'Evaluate cloud providers for scalability',
// 		id: '5',
// 		column: 'todo',
// 	},
// 	{
// 		title: 'Implement CI/CD pipeline for new service',
// 		id: '6',
// 		column: 'todo',
// 	},
// 	{
// 		title: 'Conduct security audit for infrastructure',
// 		id: '7',
// 		column: 'todo',
// 	},
//
// 	// DOING
// 	{
// 		title: 'Refactor context providers to use Zustand',
// 		id: '8',
// 		column: 'doing',
// 	},
// 	{
// 		title:
// 			'Implement state management using Zustand in existing Context Providers"',
// 		id: '9',
// 		column: 'doing',
// 	},
// 	// DONE
// 	{
// 		title: 'Set up DD dashboards',
// 		id: '10',
// 		column: 'done',
// 	},
// ]
