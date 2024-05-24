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
import Link from "next/link";

// this is to show single product using dynamic id and a custom query hook
const ReactQuerySingleProduct = ({ productId }: { productId: string }) => {
	// fetching data using product id
	const results = useProductData(productId);

	const { isPending, data, isError, error } = results;

	// show error
	if (isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
		);
	}

	return (
		<div className="container">
			<h1 className="text-xl font-semibold text-center mt-5">Single page</h1>
			<p>
				The example shows how to query data using id, when click on a product,
				it will navigate to single product page where the details of product is
				fetched using id.
			</p>
			<p className="mt-2">
				Moreover this displays the user of initialData property and queryClient
				to fetch initial data. When user navigates from{" "}
				<Link href={"/rq-query-by-id"} className="text-blue-500 underline">
					products list
				</Link>{" "}
				to single product page by selecting a product, we display product data
				from previous query cache while the product is still being fetched.
			</p>
			<p className="mt-2">
				This way, the loading indicator is not shown for much time as we have
				some data to display.
			</p>
			<h2 className="text-xl font-semibold text-center mt-5">Product</h2>
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
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
		</div>
	);
};

export default ReactQuerySingleProduct;
