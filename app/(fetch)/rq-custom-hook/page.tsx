import Link from "next/link";

import ReactQueryCustomHookExample from "@/components/rq/rq-custom-hook-example";

export default function ReactQueryCustomHookPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Custom hook example</h1>
			<p className="text-lg">
				Illustrating fetching data using a custom query hook in React Query.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Custom Query Hook: Create a custom hook that encapsulates data
					fetching logic using React Query&apos;s useQuery hook.
				</li>
				<li>
					Abstraction: Abstract away data fetching logic into a reusable custom
					hook for cleaner and more maintainable code.
				</li>
				<li>
					Parameters: Customize the custom hook to accept parameters for dynamic
					queries or API endpoints.
				</li>
				<li>
					Error Handling: Handle errors within the custom hook for consistent
					error handling across the application.
				</li>
				<li>
					Usage Flexibility: Utilize the custom hook in multiple components,
					providing consistent data fetching capabilities.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Code Organization: Use when data fetching logic needs to be abstracted
					and reused across multiple components.
				</li>
				<li>
					Dynamic Queries: Ideal for scenarios where query parameters vary based
					on component state or user input.
				</li>
				<li>
					Error Consistency: Ensures consistent error handling and behavior
					across different parts of the application.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-custom-hook-example.tsx"
					}
				>
					Component code
				</Link>
				,{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/hooks/usePostsData.ts"
					}
				>
					Hook code
				</Link>
				.
			</p>
			<ReactQueryCustomHookExample />
		</div>
	);
}
