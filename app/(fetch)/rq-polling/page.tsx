import ReactQueryPollingExample from "@/components/rq/rq-polling-example";
import Link from "next/link";

export default function ReactQueryPollingPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Polling example</h1>
			<p className="text-lg">
				Demonstrating data polling using refetchInterval and
				refetchIntervalInBackground options in React Query.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					refetchInterval: Sets the interval (in milliseconds) at which the
					query refetches data automatically.
				</li>
				<li>
					refetchIntervalInBackground: Enables or disables polling when the
					window is not in focus.
				</li>
				<li>
					Continuous Updates: Keeps data continuously updated by fetching at
					regular intervals.
				</li>
				<li>
					Background Polling: Ensures data is updated even when the user is not
					actively viewing the application.
				</li>
				<li>
					Resource Management: Balances data freshness with resource usage,
					especially for high-frequency polling.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Live Data: Ideal for applications requiring real-time data updates,
					such as chat applications or live scoreboards.
				</li>
				<li>
					Monitoring Systems: Useful for dashboards that need to display the
					latest metrics or statuses.
				</li>
				<li>
					User Engagement: Ensures users always see the most current information
					without manual refreshes.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-polling-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryPollingExample />
		</div>
	);
}
