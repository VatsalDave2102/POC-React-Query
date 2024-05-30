import Link from "next/link";

import ReactQueryCacheExample from "@/components/rq/rq-cache-example";

export default function ReactQueryCachePage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Cache example</h1>
			<p className="text-lg">
				Illustrating data caching using the gcTime query option in React Query.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>Caching Data: Data is cached upon successful fetch.</li>
				<li>
					Instant Cache Access: Same query instance in another component
					provides cached data instantly.
				</li>
				<li>
					Background Fetching: Fetching function runs in the background,
					updating all instances with fresh data.
				</li>
				<li>
					Garbage Collection: Queries are deleted after gcTime when no instances
					are active.
				</li>
				<li>
					Hard Loading State: A hard loading state is shown if the query is
					fetched again after being garbage collected.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Intermittently Accessed Data: Suitable for data that is not accessed
					continuously but still benefits from caching.
				</li>
				<li>
					Resource Management: Efficiently manages memory by removing inactive
					queries.
				</li>
				<li>
					User Experience: Ensures quick data access for users while maintaining
					up-to-date information through background fetching.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-cache-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryCacheExample />;
		</div>
	);
}
