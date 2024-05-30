import Link from "next/link";

import ReactQeuryStaleTimeExample from "@/components/rq/rq-stale-time-example";

export default function ReactQeuryStaleTimePage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Stale time example</h1>
			<p className="text-lg">
				Showcasing how to manage data freshness using the staleTime option in
				React Query.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Stale Data Management: staleTime defines how long data is considered
					fresh.
				</li>
				<li>
					No Refetch: During staleTime, no refetch occurs when the component
					remounts.
				</li>
				<li>
					Performance Optimization: Reduces unnecessary network requests,
					improving performance.
				</li>
				<li>
					User Experience: Ensures users see fresh data without frequent loading
					states.
				</li>
				<li>
					Dynamic Updates: After staleTime, data is marked as stale and
					refetched on next query trigger.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Frequently Accessed Data: Ideal for data that is accessed often and
					does not change frequently.
				</li>
				<li>
					Performance-Sensitive Applications: Enhances performance by minimizing
					redundant data fetches.
				</li>
				<li>
					User Interface Stability: Improves user experience by reducing loading
					states and ensuring data consistency.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-stale-time-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQeuryStaleTimeExample />
		</div>
	);
}
