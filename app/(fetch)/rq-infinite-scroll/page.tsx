import Link from "next/link";

import ReactQueryInifiniteScrollExample from "@/components/rq/rq-infinite-scroll-example";

export default function ReactQueryInfiniteLoadMorePage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Infinite scroll example</h1>
			<p className="text-lg">
				Implementing infinite scroll using useInfiniteQuery and React
				Intersection Observer to fetch the next page automatically.
			</p>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					useInfiniteQuery Hook: Use useInfiniteQuery to handle paginated data
					fetching, allowing loading of additional pages.
				</li>
				<li>
					getNextPageParam: Usnig getNextPageParam query option to return the
					next page value, guiding React Query on how to fetch subsequent pages.
				</li>
				<li>
					React Intersection Observer: Utilizing React Intersection Observer to
					detect when the &quot;Load More&quot; button enters the viewport.
				</li>
				<li>
					User Experience: Enhance user experience by seamlessly loading more
					data as the user scrolls down.
				</li>
			</ol>
			<h2 className="text-2xl font-semibold mt-3">When to use</h2>
			<ol className="list-disc list-inside text-lg my-1">
				<li>
					Continuous Data Loading: Ideal for applications that require
					continuous data loading without manual pagination.
				</li>
				<li>
					Smooth User Interaction: Use to provide a seamless and smooth
					experience for users who need to browse through extensive lists.
				</li>
				<li>
					Optimized Performance: Efficiently manage data fetching and rendering
					as users scroll through the content.
				</li>
			</ol>
			<p className="text-lg mb-5">
				Full code for this example:{" "}
				<Link
					className="text-blue-500 underline"
					href={
						"https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-infinite-scroll-example.tsx"
					}
				>
					Click here
				</Link>
			</p>
			<ReactQueryInifiniteScrollExample />
		</div>
	);
}
