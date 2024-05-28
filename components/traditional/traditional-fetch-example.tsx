"use client";

import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Product } from "@/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

const TraditionalFetchExample = () => {
	// state to show that data is loading
	const [isLoading, setIsLoading] = useState(true);

	// state to show error occured during fetching
	const [error, setError] = useState("");

	// state to store fetched products
	const [data, setData] = useState<Product[]>([]);

	// to fetch data when component mounts
	useEffect(() => {
		// function to fetch data
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api.escuelajs.co/api/v1/products"
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				// handling error
				if (error instanceof AxiosError) setError(error.message);
				setIsLoading(false);
			}
		};

		// fetching data
		fetchData();
	}, []);

	if (error) {
		return <h2 className="text-2xl font-semibold text-center">{error}</h2>;
	}

	return (
		<>
			<h2 className="text-2xl font-semibold mt-5">Products list</h2>
			{isLoading ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-5 my-5">
					{data.map((product) => (
						<li key={product.id}>
							{" "}
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

export default TraditionalFetchExample;
