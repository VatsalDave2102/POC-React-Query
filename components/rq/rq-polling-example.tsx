"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";

// function to fetch products list
const fetchProducts = async (): Promise<Product[]> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/products");

	return response.data;
};

const ReactQueryPollingExample = () => {
	// to refetch at regular intervals or retch in background to keep content updated
	const results = useQuery({
		queryKey: ["products-polling"],
		queryFn: fetchProducts,
		refetchInterval: 5000, // will refetch data every 5 second, default value is false
		refetchIntervalInBackground: true, // will refetch when windown is not focused
	});

	// extracting data, error and states
	const { isPending, data, isError, error } = results;

	return (
		<>
			<h2 className="text-2xl font-semibold ">Products list</h2>
			{/* display error */}
			{isError ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}

			{/* display loader */}
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-y-5 my-5 justify-between">
					{/* display data */}
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

export default ReactQueryPollingExample;
