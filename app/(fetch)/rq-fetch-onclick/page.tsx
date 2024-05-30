import Link from "next/link";

import ReactQueryFetchOnClickExample from "@/components/rq/rq-fetch-onclick-example";

export default function ReactQueryFetchOnClickPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">
				Disabling query and Fetching on click example
			</h1>
			<p className="text-lg">
				Illustrating how to disable queries using the enabled option in React
				Query and trigger fetching using refetch function.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Enabled Option: Controls whether a query is enabled or disabled.
				</li>
				<li>
					Disabled State: Disabling prevents automatic fetching when a component
					mounts.
				</li>
				<li>
					Manual Fetching: Queries can be manually triggered using custom events
					like button clicks.
				</li>
				<li>
					Granular Control: Enables fine-grained control over when data fetching
					occurs.
				</li>
				<li>
					User Interaction: Allows users to initiate data fetching for improved
					UX or performance.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Conditional Fetching: Use when data should only be fetched under
					specific conditions or user actions.
				</li>
				<li>
					Optimized Performance: Ideal for scenarios where fetching data on
					demand improves application responsiveness.
				</li>
				<li>
					Conserving Resources: Disable queries when data is not immediately
					needed, reducing unnecessary network requests.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-fetch-onclick-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryFetchOnClickExample />
		</div>
	);
}
