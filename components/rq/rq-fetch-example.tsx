"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";

import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (): Promise<Product[]> => {
	const response = await axios.get(
		"https://api.escuelajs.co/api/v1/products?offset=10&limit=10"
	);

	return response.data;
};

const ReactQueryFetchExample = () => {
	// useQuery requires query key to identify queries,
	// similar to the key prop which is required while mapping over
	// it also takes a fetching function as an argument,
	// a common pattern is to extract fetching function outside
	const results = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

	// destructuring loading state and data recieved from useQuery
	const { isPending, data } = results;

	return (
		<div className="container">
			<h2 className="text-2xl font-semibold text-center">Products list</h2>
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol>
					{data?.map((product) => (
						<li key={product.id}>{product.title}</li>
					))}
				</ol>
			)}
		</div>
	);
};

export default ReactQueryFetchExample;
