"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

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

	// extracting data, error and states
	const { isPending, isError, data, error } = results;

	return (
		<>
			<h2 className="text-2xl font-semibold mb-5">Products list</h2>
			{/* display error */}
			{isError ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}

			{/* display loader */}
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<>
					<div className="h-[550px] mb-5">
						<ol className="flex flex-wrap gap-5 my-5">
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
					</div>
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
		</>
	);
};

export default ReactQueryPaginationExample;
