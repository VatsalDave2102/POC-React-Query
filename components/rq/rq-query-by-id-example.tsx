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
import Link from "next/link";

const fetchProducts = async (): Promise<Product[]> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/products");

	return response.data;
};

const ReactQueryByIdExample = () => {
	const results = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	const { isPending, data, isError, error } = results;

	if (isError) {
		return <h2 className="text-2xl font-semibold">{error.message}</h2>;
	}
	return (
		<div className="container">
			<h1 className="text-xl font-semibold mt-5">
				React Query fetch by id example
			</h1>
			<p className="">
				The example shows how to query data using id, when click on a product,
				it will navigate to single product page where the details of product is
				fetched using id.
			</p>
			<h2 className="text-xl font-semibold mt-5">Products list</h2>
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-5 my-5 justify-between">
					{data?.map((product) => (
						<Link key={product.id} href={`/rq-query-by-id/${product.id}`}>
							<li>
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
						</Link>
					))}
				</ol>
			)}
		</div>
	);
};

export default ReactQueryByIdExample;
