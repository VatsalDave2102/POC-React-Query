"use client";

import { Loader2 } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useProductData } from "@/hooks/useProductData";

// this is to show single product using dynamic id and a custom query hook
const ReactQuerySingleProduct = ({ productId }: { productId: string }) => {
	// fetching data using product id
	const results = useProductData(productId);

	// extracting data, error and states
	const { isPending, data, isError, error } = results;

	// show error
	if (isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
		);
	}

	return (
		<>
			<h2 className="text-xl font-semibold mt-5">Product</h2>
			{/* display loader */}
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				// display product details
				<Card className="my-5">
					<CardHeader>
						<CardTitle className="truncate">{data.title}</CardTitle>
						<CardDescription className="h-[100px] text-wrap truncate">
							{data.description}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<p className="text-zinc-600">{data.category.name}</p>
							<p className="text-zinc-600">${data.price}</p>
						</div>
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default ReactQuerySingleProduct;
