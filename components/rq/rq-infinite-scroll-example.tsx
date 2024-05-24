"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "../ui/button";
import { useInView } from "react-intersection-observer";

// function to fetch 10 products to for inifinite query using a load more button
// pageParam is provided by useInfiniteQuery, for page groups
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
	// hook to check if load more button is in view, if it is, then directly fetch more products
	const { ref, inView } = useInView();

	// useInfiniteQuery hook to fetch products infinitely
	const results = useInfiniteQuery({
		queryKey: ["products-infinite-load-more"],
		queryFn: fetchProducts,
		// the initial page will be 0 having 10 products
		initialPageParam: 0,
		// function to get next page, here we have kept only 7 pages, if fetchNextPage is called, page updates here
		getNextPageParam: (lastPage, pages) => {
			if (pages.length < 7) {
				return pages.length + 1;
			} else {
				return undefined;
			}
		},
		maxPages: 7,
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

	// show error state
	if (status === "error") {
		return (
			<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
		);
	}

	return (
		<div className="container">
			<h1 className="text-2xl font-semibold mt-5">
				Infinite Query with load more button
			</h1>
			<p className="text-lg mb-5">
				This is an example of fetching data infinitely using useInifiniteQuery,
				first we fetch only 10 products, as user clicks load more button, or it
				comes into view, another 10 products are fetched.
			</p>

			<h2 className="text-2xl font-semibold my-5">Products list</h2>
			{status === "pending" ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<>
					<ol className="flex flex-wrap gap-3 mb-5">
						{data?.pages.map((group, i) => (
							<React.Fragment key={i}>
								{group.map((product) => (
									<li key={product.id}>
										<Card className="w-[250px]">
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
		</div>
	);
};

export default ReactQueryInifiniteScrollExample;
