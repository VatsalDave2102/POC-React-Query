import Link from "next/link";

import ReactQueryMutationExample from "@/components/rq/rq-mutation-example";

export default function ReactQueryMutationPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Mutation example</h1>
			<p className="text-lg">
				Demonstrating a post request to add a user using useMutation, and
				updating the user list by displaying the latest data using
				queryClient.setQueryData in the onSuccess callback.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					useMutation Hook: Utilize useMutation for performing POST requests to
					add a user.
				</li>
				<li>
					Mutation Function: Define a function to post user data to the server.
				</li>
				<li>
					onSuccess Callback: Use the onSuccess callback to update the cache
					with the latest user data.
				</li>
				<li>
					queryClient.setQueryData: Leverage queryClient.setQueryData to
					directly update the user list in the cache without refetching.
				</li>
				<li>
					Optimistic Updates: Ensure the user list reflects the newly added user
					immediately for a responsive user experience.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Data Modification: Ideal for scenarios involving data creation,
					updates, or deletion.
				</li>
				<li>
					Real-Time Updates: Use to ensure the UI reflects the latest data
					changes immediately without waiting for a full refetch.
				</li>
				<li>
					Enhanced User Experience: Applicable for providing instant feedback to
					users after performing actions such as adding or updating items.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-mutation-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryMutationExample />
		</div>
	);
}
