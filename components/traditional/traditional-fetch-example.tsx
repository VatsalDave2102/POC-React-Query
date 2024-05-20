"use client";

import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Product } from "@/types";

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
					"https://api.escuelajs.co/api/v1/products?offset=10&limit=10"
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
		<div className="container">
			<h2 className="text-2xl font-semibold text-center">Products list</h2>
			{isLoading ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol>
					{data.map((product) => (
						<li key={product.id}>{product.title}</li>
					))}
				</ol>
			)}
		</div>
	);
};

export default TraditionalFetchExample;
