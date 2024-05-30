import Link from "next/link";

import ReactQueryDependentQueriesExample from "@/components/rq/rq-dependent-queries-example";

export default function ReactQueryDependentQueriesPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Dependant queries example</h1>
			<p className="text-lg">
				Fetch data from dependent endpoints using React Query, where the
				dependent query&apos;s fetching is conditional based on the success of
				another query. In this demo, the enabled query option of dependant query
				(album query) is conditionally based on successful data fetching of
				parent query (user query).
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Dependent Queries: Fetch data from endpoints where the data from one
					query is required for another.
				</li>
				<li>
					Conditional Fetching: Set the dependent query&aposs enabled option to
					parent query&apos;s data by converting it to boolean.
				</li>
				<li>
					Query Invalidation: Invalidate dependent queries when their
					dependencies change to trigger refetching.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Sequential Data Fetching: Ideal for scenarios where data from one
					query is required to fetch data from another in a sequential manner.
				</li>
				<li>
					Dependency Management: Use when there are clear dependencies between
					different parts of data in the application.
				</li>
				<li>
					Efficient Resource Usage: Applicable when enabling queries
					conditionally can optimize resource usage and improve performance.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-dependent-queries-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryDependentQueriesExample />;
		</div>
	);
}
