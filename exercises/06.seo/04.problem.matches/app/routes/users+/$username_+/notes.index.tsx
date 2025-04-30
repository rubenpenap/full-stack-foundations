import { type MetaFunction } from '@remix-run/react'
import { type loader as notesLoader } from './notes.tsx'

export default function NotesIndexRoute() {
	return (
		<div className="container pt-12">
			<p className="text-body-md">Select a note</p>
		</div>
	)
}

export const meta: MetaFunction<
	null,
	{
		'routes/users+/$username_+/notes': typeof notesLoader
	}
> = ({ params, matches }) => {
	const noteMatch = matches.find(
		m => m.id === 'routes/users+/$username_+/notes',
	)

	const displayName = noteMatch?.data.owner.name ?? params.username
	const noteCount = noteMatch?.data.notes.length ?? 0
	const notesText = noteCount === 1 ? 'note' : 'notes'
	return [
		{ title: `${displayName}'s Notes | Epic Notes` },
		{
			name: 'description',
			content: `Checkout ${displayName}'s ${noteCount} ${notesText} on Epic Notes`,
		},
	]
}
