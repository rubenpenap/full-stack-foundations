import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '#app/utils/db.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { username } = params
	const user = db.user.findFirst({
		where: {
			username: { equals: username },
		},
	})
	return json({
		// @ts-expect-error
		user: { name: user.name, username: user.username },
	})
}
export default function ProfileRoute() {
	const {
		user: { name, username },
	} = useLoaderData<typeof loader>()
	return (
		<div className="container mb-48 mt-36">
			<h1 className="text-h1">{name ?? username}</h1>
			<Link to="notes" className="underline">
				Notes
			</Link>
		</div>
	)
}
