"use client";

import { Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { usePostsData } from "@/hooks/usePostsData";

const ReactQueryCustomHookExample = () => {
	// fetching posts from custom hook, can be used in others components
	// create a custom hook if you want same data in other components
	// in that way query key will be same and results be server faster due to caching
	const results = usePostsData();

	const { isPending, data, isError, error, isFetching, isRefetching } = results;

	// isPending to show when there is no cached data, and data is fetched
	// isFetching is true on initial fetching and background fetching
	// refetch boolean will be true on specified intervals
	console.log(isPending, isFetching, isRefetching);

	if (isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
		);
	}
	return (
		<div className="container">
			<h1 className="text-xl font-semibold text-center my-5">
				The posts are fetched using a custom query hook
			</h1>
			<h2 className="text-xl font-semibold text-center">Posts list</h2>
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-y-5 my-5 justify-between">
					{data?.map((postTitle) => (
						<li key={postTitle}>
							<Card className="w-[250px]">
								<CardHeader>
									<CardTitle className="truncate">{postTitle}</CardTitle>
								</CardHeader>
							</Card>
						</li>
					))}
				</ol>
			)}
		</div>
	);
};

export default ReactQueryCustomHookExample;
