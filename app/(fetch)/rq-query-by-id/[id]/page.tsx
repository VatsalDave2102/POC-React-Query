import Link from "next/link";

import ReactQuerySingleProduct from "@/components/rq/rq-single-product";

export default function ReactQueryPostPage({
	params,
}: {
	params: { id: string };
}) {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Query by ID example</h1>
			<p className="text-lg">
				Fetcing a single item using its ID after product is clicked. Utilizing a
				custom hook with the ID as the query key appended in array, and using
				queryClient.getQueryData to get details of the item from cache to show
				on a single product page while product is being fetched.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Custom Query Hook: Create a custom hook for fetching data based on
					item ID, encapsulating query logic.
				</li>
				<li>
					Query Key: Use the item ID as the query key for fetching data related
					to that specific item.
				</li>
				<li>
					getQueryData: Use queryClient.getQueryData to retrieve details of the
					item from the query cache.
				</li>
				<li>
					Initial Data: Show initial data from the query cache while fetching
					fresh details for the item.
				</li>
				<li>
					Dynamic Queries: Allow dynamic querying by accepting the item ID as a
					parameter in the custom hook.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Single Item Views: Ideal for displaying detailed information of a
					specific item after it&apos;s clicked or selected.
				</li>
				<li>
					Optimized Rendering: Enhance user experience by showing initial data
					from cache while fetching additional details.
				</li>
				<li>
					Custom Query Logic: Applicable when custom query logic is required,
					such as querying by specific IDs.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-query-by-id-example.tsx"
					}
				>
					Products page
				</Link>
				,{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/components/rq/rq-single-product.tsx"
					}
				>
					Single product Page
				</Link>{" "}
				and{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/react-mern/POC-React-Query/blob/main/hooks/useProductData.ts"
					}
				>
					custom product fetching hook
				</Link>
				.
			</p>
			<ReactQuerySingleProduct productId={params.id} />;
		</div>
	);
}
