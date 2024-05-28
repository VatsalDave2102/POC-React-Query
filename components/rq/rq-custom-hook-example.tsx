"use client";

import { Loader2 } from "lucide-react";

import { usePostsData } from "@/hooks/usePostsData";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ReactQueryCustomHookExample = () => {
	// fetching posts from custom hook, can be used in others components
	// create a custom hook if you want same data in other components
	// in that way query key will be same and results be server faster due to caching
	const results = usePostsData();

	const { isPending, data, isError, error } = results;

	return (
		<>
			<h2 className="text-xl font-semibold my-5">
				The posts are fetched using a custom query hook
			</h2>
			<h2 className="text-xl font-semibold">Posts list</h2>

			{/* display error */}
			{isError ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}

			{/* display loader */}
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-5 my-5">
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
		</>
	);
};

export default ReactQueryCustomHookExample;
