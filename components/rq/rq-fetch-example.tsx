"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

// function to fetch products list
const fetchProducts = async (): Promise<Product[]> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/products");

	return response.data;
};

const ReactQueryFetchExample = () => {
	// useQuery requires query key to identify queries,
	// similar to the key prop which is required while mapping over
	// it also takes a fetching function as an argument,
	// a common pattern is to extract fetching function outside the component
	const results = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

	// destructuring loading state, data, error message recieved from useQuery
	const { isPending, data, isError, error } = results;

	return (
		<>
			{/* products list */}
			<h2 className="text-2xl font-semibold">Products list</h2>

			{/*  show error message if error occured during fetching,
          the error message gets delayed because react-query
           retries to fetch request */}
			{isError ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}

			{/* show pending state if data is being fetched */}
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-5 my-5">
					{/* mapping over products */}
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
		</>
	);
};

export default ReactQueryFetchExample;
