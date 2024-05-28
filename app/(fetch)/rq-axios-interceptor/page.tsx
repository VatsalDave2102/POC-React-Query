import Link from "next/link";

import ReactQueryAxiosInterceptorExample from "@/components/rq/rq-axios-interceptor";

export default function ReactQueryAxiosInterceptorPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Cache example</h1>
			<p className="text-lg">
				Integrating Axios interceptors with React Query to handle errors, add an
				HTTP authorization header. Create a user, log in the user to store a
				token in localStorage, and fetch the current user session using the auth
				token.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Axios Interceptors:
					<ol className="list-disc list-inside mx-6 my-1 text-lg">
						<li>
							Request Interceptor: Add an authorization header with the token
							for every request.
						</li>
						<li>
							Response Interceptor: Handle errors by logging them to the
							console.
						</li>
					</ol>
				</li>
				<li>
					React Query with Axios:
					<ol className="list-disc list-inside mx-6 my-1 text-lg">
						<li>useMutation: Create and log in a user to store the token.</li>
						<li>
							useQuery: Fetch the current user session using the stored auth
							token.
						</li>
					</ol>
				</li>
				<li>
					Token Management:
					<ol className="list-disc list-inside mx-6 my-1 text-lg">
						<li>Store the auth token in localStorage upon successful login.</li>
						<li>
							Retrieve the token from localStorage in the Axios request
							interceptor.
						</li>
					</ol>
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Authentication Workflows: Use when implementing authentication and
					session management in an application.
				</li>
				<li>
					Error Handling: Ensure consistent error handling across all API
					requests.
				</li>
				<li>
					Authorization: Automatically include authorization tokens in API
					requests.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-axios-interceptor.tsx"
					}
				>
					Component code
				</Link>
				,{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/VatsalDave2102/POC-React-Query/blob/main/utils/axios-utils.ts"
					}
				>
					Axios Interceptor code
				</Link>
				.
			</p>
			<ReactQueryAxiosInterceptorExample />
		</div>
	);
}
