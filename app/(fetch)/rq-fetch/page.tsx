import Link from "next/link";

import ReactQueryFetchExample from "@/components/rq/rq-fetch-example";

export default function ReactQueryFetchPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Baisc fetch example</h1>
			<p className="text-lg">
				Demonstrating simple data fetching with React Query&apos;s useQuery
				hook.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					useQuery Hook: Simplifies API requests and server state management.
				</li>
				<li>Query Key: Unique array identifier for the query.</li>
				<li>Query Function: Returns a promise, typically with an API call.</li>
				<li>
					Caching and Refetching: Automatic caching and refetching for
					up-to-date data.
				</li>
				<li>
					Loading and Error States: Manage UI states with data, error, and
					isLoading.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-fetch-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryFetchExample />
		</div>
	);
}
