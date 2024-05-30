import ReactQueryparallelQueriesExample from "@/components/rq/rq-parallel-queries-example";
import Link from "next/link";

export default function ReactQueryParallelQueriesPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Parallel Queries example</h1>
			<p className="text-lg">
				Demonstrating parallel querying of multiple endpoints using React Query.
				Products and Users are fetched parallely in this example.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Parallel Queries: Fetch data from multiple endpoints simultaneously to
					improve performance and efficiency.
				</li>
				<li>
					Independent Fetching: Each query runs independently, allowing
					concurrent data retrieval.
				</li>
				<li>
					Optimized Performance: Reduce overall loading time by fetching related
					data in parallel.
				</li>
				<li>
					Concurrency Control: React Query handles concurrency seamlessly,
					managing cache and state for each query.
				</li>
				<li>
					Data Consistency: Ensure consistency across multiple queries by
					utilizing React Query&apos;s caching mechanism.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Complex Data Requirements: Useful when an application requires data
					from multiple sources or endpoints.
				</li>
				<li>
					Performance Optimization: Ideal for scenarios where fetching data in
					parallel can significantly improve loading times.
				</li>
				<li>
					Related Data Retrieval: Applicable when fetching related data
					concurrently to maintain application state consistency.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-parallel-queries-example.tsx"
					}
				>
					Click here
				</Link>
				.
			</p>
			<ReactQueryparallelQueriesExample />
		</div>
	);
}
