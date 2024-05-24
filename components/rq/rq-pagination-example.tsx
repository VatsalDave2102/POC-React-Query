"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// function to fetch 10 products to show pagination using offset and limit
const fetchProducts = async (offset: string): Promise<Product[]> => {
	const products = await axios.get(
		`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10`
	);
	return products.data;
};

const ReactQueryPaginationExample = () => {
	// state to keep track of offset
	const [offset, setOffset] = useState(0);

	// useQuery hook to fetch products
	const results = useQuery({
		queryKey: ["products-pagination", offset],
		queryFn: () => fetchProducts(offset.toString()),
		// when user changes page or there is loading state, placeholderData will
		// keep previous data on display rather than showing a loading indicator
		placeholderData: keepPreviousData,
		staleTime: 5000,
	});

	const { isFetching, isError, data, error, isPlaceholderData } = results;

	// use queryClient to prefetch to next page when component mounts using useEffect, comment out the given below useEffect to remove prefetching
	const queryClient = useQueryClient();

	useEffect(() => {
		// checking if there is no placeHolder data or it is last page, we fetch next page
		if (!isPlaceholderData && offset < 10) {
			const nextPage = offset + 10;
			queryClient.prefetchQuery({
				queryKey: ["products-pagination", nextPage],
				queryFn: () => fetchProducts(nextPage.toString()),
			});
		}
	}, [data, isPlaceholderData, offset, queryClient]);

	if (isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
		);
	}
	return (
		<div className="container">
			<h2 className="text-2xl font-semibold text-center mb-5">Products list</h2>
			{isFetching ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<>
					<ScrollArea className="h-[550px] mb-5">
						<ol className="flex flex-wrap gap-y-5 my-5 justify-between">
							{data?.map((product) => (
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
												<p className="text-zinc-600">{product.category.name}</p>
												<p className="text-zinc-600">${product.price}</p>
											</div>
										</CardContent>
									</Card>
								</li>
							))}
						</ol>
					</ScrollArea>
					{/* previous and next buttons */}
					<div className="flex justify-between">
						<Button
							onClick={() => setOffset((prevOffset) => prevOffset - 10)}
							disabled={offset === 0}
							className="bg-rose-500 hover:bg-rose-800/90"
						>
							Previous
						</Button>
						<Button
							onClick={() => setOffset((prevOffset) => prevOffset + 10)}
							className="bg-rose-500 hover:bg-rose-800/90"
							disabled={offset === 100}
						>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default ReactQueryPaginationExample;
