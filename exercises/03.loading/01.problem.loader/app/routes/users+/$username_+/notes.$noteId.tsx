import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '#app/utils/db.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { noteId } = params
	const note = db.note.findFirst({
		where: {
			id: {
				equals: noteId,
			},
		},
	})
	return json({
		// @ts-expect-error
		note: { title: note.title, content: note.content },
	})
}

export default function NoteRoute() {
	const {
		note: { title, content },
	} = useLoaderData<typeof loader>()
	return (
		<div className="absolute inset-0 flex flex-col px-10">
			<h2 className="mb-2 pt-12 text-h2 lg:mb-6">{title}</h2>
			<div className="overflow-y-auto pb-24">
				<p className="whitespace-break-spaces text-sm md:text-lg">{content}</p>
			</div>
		</div>
	)
}
