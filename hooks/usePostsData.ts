import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Post } from "@/types";

// define the fetching function
const fetchPosts = async (): Promise<Post[]> => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/posts"
	);

	return response.data;
};

export const usePostsData = () => {
	// return the useQuery results
	return useQuery({
		queryKey: ["posts-custom-hook"],
		queryFn: fetchPosts,
		// to transform incoming data to your need, we can use select which gets the data as argument
		select: (data) => {
			const postTitle = data.map((post) => post.title);
			return postTitle;
		},
	});
};
