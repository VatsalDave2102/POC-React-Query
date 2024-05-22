"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";

import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const fetchProducts = async (): Promise<Product[]> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/products");

	return response.data;
};

const ReactQueryFetchOnClickExample = () => {
	const results = useQuery({
		queryKey: ["products-fetch-onclick"],
		queryFn: fetchProducts,
		enabled: false, // this will not trigger fetching as the component mounts
	});

	const { isLoading, data, isError, error, isFetching, isRefetching, refetch } =
		results;

	// isPending to show when there is no cached data, and data is fetched
	// isFetching is true on initial fetching and background fetching
	console.log(isLoading, isFetching, isRefetching);

	if (isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
		);
	}
	return (
		<div className="container">
			<h2 className="text-2xl font-semibold text-center">Products list</h2>
			{/* button to trigger fetching manually */}
			<Button
				className="bg-rose-500 hover:bg-rose-500/80"
				onClick={() => {
					refetch();
				}}
			>
				Fetch Products
			</Button>
			{isLoading && isFetching ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-y-5 my-5 justify-between">
					{data?.map((product) => (
						<li key={product.id}>
							<Card className="w-[250px]">
								<CardHeader>
									<CardTitle className="truncate">{product.title}</CardTitle>
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
			)}
		</div>
	);
};

export default ReactQueryFetchOnClickExample;
