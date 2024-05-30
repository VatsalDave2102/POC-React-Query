import Link from "next/link";

import ReactQueryDataTransformationExample from "@/components/rq/rq-data-transform-example";

export default function ReactQuerySuccessErrorPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">
				Data transformation example
			</h1>
			<p className="text-lg">
				Demonstrating data transformation from the response using the select
				option in React Query. In this example, only titles of posts have been
				extracted from response.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Select Option: Allows selecting and transforming specific data from
					the response.
				</li>
				<li>
					Data Transformation: Customize the shape or content of the fetched
					data before it&apos;s used in the application.
				</li>
				<li>
					Simplify Data: Extract only the necessary fields or modify the
					structure to fit the application&apos;s requirements.
				</li>
				<li>
					Optimize Performance: Reduce unnecessary data transfer and processing
					by selecting only relevant information.
				</li>
				<li>
					Enhance Readability: Improve code readability and maintainability by
					performing data transformation within the query.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Data Shaping: Use when fetched data needs to be tailored to match
					specific UI components or application needs.
				</li>
				<li>
					Performance Optimization: Ideal for reducing the payload size or
					complexity of fetched data, improving application performance.
				</li>
				<li>
					Data Normalization: Useful for normalizing API responses or converting
					them into formats compatible with state management libraries like
					Redux.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-data-transform-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryDataTransformationExample />
		</div>
	);
}
