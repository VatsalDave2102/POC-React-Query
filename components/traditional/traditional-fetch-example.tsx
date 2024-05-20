"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Product } from "@/types";

const TraditionalFetchExample = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<Product[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://api.escuelajs.co/api/v1/products?offset=10&limit=10"
			);
			setData(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

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
