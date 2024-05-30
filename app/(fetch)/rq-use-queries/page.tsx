import Link from "next/link";

import ReactQueryUseQueriesExample from "@/components/rq/rq-use-queries-example";

export default function ReactQueryUseQueriesPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">useQueries hook example</h1>
			<p className="text-lg">
				Demonstrating fetching data from multiple endpoints using React
				Query&apos;s useQueries hook. In this demo, four users are being fetched
				in parallel.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					useQueries Hook: Fetch data from multiple endpoints concurrently using
					a single hook call.
				</li>
				<li>
					Array of Queries: Pass an array of query configurations to useQueries
					to execute multiple queries.
				</li>
				<li>
					Parallel Execution: Queries run in parallel, optimizing data fetching
					performance.
				</li>
				<li>
					Individual Query Configurations: Configure each query independently,
					including query key, query function, and options.
				</li>
				<li>
					Consistent Error Handling: React Query handles errors for each query
					individually, ensuring consistent error handling across queries.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Multiple Endpoint Fetching: Ideal for applications that require data
					from multiple sources or endpoints.
				</li>
				<li>
					Fetch Multiple dynamic data: Use when dynamic items are required in
					parallel.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-use-queries-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryUseQueriesExample />
		</div>
	);
}
