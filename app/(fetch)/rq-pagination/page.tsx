import Link from "next/link";

import ReactQueryPaginationExample from "@/components/rq/rq-pagination-example";

export default function ReactQueryPaginationPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Pagination example</h1>
			<p className="text-lg">
				Implementing pagination using offset and limit, with keepPreviousData to
				prevent showing a loader.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Pagination Parameters: Use offset and limit to fetch specific subsets
					of data.
				</li>
				<li>
					Query Key: Include offset in the query key to differentiate between
					different pages of data.
				</li>
				<li>
					keepPreviousData: Use the keepPreviousData option to retain the
					previous data while fetching new data, avoiding a loading state.
				</li>
				<li>
					Controlled Fetching: Dynamically adjust offset and limit based on user
					interaction (e.g., clicking &quot;Next&quot; or &quot;Previous&quot;
					buttons).
				</li>
			</ol>
			<blockquote className="italic text-lg p-2 border-l-4 border-zinc-700 rounded bg-zinc-100">
				Note: The total number of pages is hard coded as API response does not
				provide total count.
			</blockquote>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Large Data Sets: Ideal for applications that need to display large
					data sets in manageable chunks.
				</li>
				<li>
					Smooth Navigation: Use to provide a smooth user experience by
					prefetching data and avoiding loading indicators.
				</li>
				<li>
					User Navigation: Suitable for scenarios where users need to navigate
					through data pages efficiently without interruptions.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-pagination-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryPaginationExample />
		</div>
	);
}
