"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";

import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// function to fetch products list
const fetchPosts = async (): Promise<Post[]> => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/posts"
	);

	return response.data;
};

const ReactQueryDataTransformationExample = () => {
	const results = useQuery({
		queryKey: ["posts-transform"],
		queryFn: fetchPosts,
		// to transform incoming data to as per need, use select option which
		// gets the data as argument and transform arrording to requirements
		select: (data) => {
			const postTitle = data.map((post) => post.title);
			return postTitle;
		},
	});

	// extracting data, error, loading and error states
	const { isPending, data, isError, error } = results;

	return (
		<>
			<h2 className="text-2xl font-semibold">Posts list</h2>

			{/* display error */}
			{isError ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}

			{/* display loader */}
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-5 my-5">
					{/* display data */}
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

export default ReactQueryDataTransformationExample;
