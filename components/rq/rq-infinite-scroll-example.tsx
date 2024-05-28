"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

// function to fetch 10 products for inifinite query using a load more button
// pageParam is provided by useInfiniteQuery, multiplying it by 10
// as offset method is used to fetch data
const fetchProducts = async ({
	pageParam = 0,
}: {
	pageParam: number | undefined;
}): Promise<Product[]> => {
	const products = await axios.get(
		`https://api.escuelajs.co/api/v1/products?offset=${pageParam * 10}&limit=10`
	);
	return products.data;
};

const ReactQueryInifiniteScrollExample = () => {
	// hook to check if load more button is in view, then directly fetch more products
	const { ref, inView } = useInView();

	// useInfiniteQuery hook to fetch products infinitely
	const results = useInfiniteQuery({
		queryKey: ["products-infinite-load-more"],
		queryFn: fetchProducts,
		// the initial page will be 0 having 10 products
		initialPageParam: 0,
		// function to get next page, checking if last page has less than 10 products
		// that means there are no more products left, hence return undefined
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length < 10) {
				return undefined;
			} else {
				return pages.length + 1;
			}
		},
	});

	const {
		status,
		data,
		error,
		isFetching,
		hasNextPage, // boolean to check if next page is available
		fetchNextPage, // function to fetch next batch of products
		isFetchingNextPage, // boolean to check if next page is being fetched
	} = results;

	// effect to run when load more button comes in view to fetch more products
	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<>
			<h2 className="text-2xl font-semibold my-5">Products list</h2>
			{/* display error */}
			{status === "error" ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}

			{/* display loader */}
			{status === "pending" ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<>
					<ol className="flex flex-wrap gap-3 mb-5">
						{/* pages property is an array of every page fethced, hence need to map over it first */}
						{data?.pages.map((group, i) => (
							<React.Fragment key={i}>
								{/* mapping over each page */}
								{group.map((product) => (
									<li key={product.id}>
										<Card className="w-[600px]">
											<CardHeader>
												<CardTitle className="truncate">
													{product.title}
												</CardTitle>
												<CardDescription className="h-[100px] text-wrap truncate">
													{product.description}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="flex justify-between">
													<p className="text-zinc-600">
														{product.category.name}
													</p>
													<p className="text-zinc-600">${product.price}</p>
												</div>
											</CardContent>
										</Card>
									</li>
								))}
							</React.Fragment>
						))}
					</ol>
					{/* load more button */}
					<div>
						<Button
							ref={ref}
							disabled={!hasNextPage || isFetchingNextPage}
							onClick={() => fetchNextPage()}
							className="bg-rose-500 hover:bg-rose-500/90 mb-4"
						>
							{isFetchingNextPage
								? "Loading more..."
								: hasNextPage
								? "Load Newer"
								: "Nothing more to load"}
						</Button>
					</div>
					<div>
						{isFetching && !isFetchingNextPage
							? "Background updating..."
							: null}
					</div>
				</>
			)}
		</>
	);
};

export default ReactQueryInifiniteScrollExample;
