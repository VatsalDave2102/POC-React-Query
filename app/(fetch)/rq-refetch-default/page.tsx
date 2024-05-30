import Link from "next/link";

import ReactQueryRefetchDefaultExample from "@/components/rq/rq-refetch-default-example";

export default function ReactQueryRefetchDefaultPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Refetch default example</h1>
			<p className="text-lg">
				Demonstrating default refetch behavior using refetchOnMount and
				refetchOnWindowFocus options in React Query.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					refetchOnMount: Determines if data should be refetched when a
					component mounts.
				</li>
				<li>
					refetchOnWindowFocus: Triggers refetch when the window regains focus.
				</li>
				<li>
					Ensuring Fresh Data: Keeps data up-to-date by refetching on specified
					triggers.
				</li>
				<li>
					User Experience: Improves reliability of displayed data by reducing
					the chance of stale information.
				</li>
				<li>
					Configuration Flexibility: Both options can be set to true, false, or
					customized with a function.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Dynamic Data: Ideal for applications where data changes frequently and
					needs to be current.
				</li>
				<li>
					User-Focused Applications: Ensures users see the most recent data upon
					returning to the app or component.
				</li>
				<li>
					Critical Information: Suitable for scenarios where up-to-date data is
					crucial, such as financial dashboards or live updates.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-refetch-default-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryRefetchDefaultExample />
		</div>
	);
}
