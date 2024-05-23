import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async ({
	queryKey,
}: {
	queryKey: string[];
}): Promise<Product> => {
	// getting product id from queryKey array
	const productId = queryKey[1];
	const response = await axios.get(
		`https://api.escuelajs.co/api/v1/products/${productId}`
	);

	return response.data;
};

export const useProductData = (productId: string) => {
	const id = productId;
	return useQuery({
		// to fetch data using id, we need to add the id in queryKey array
		// so that react query will not server same cache for different id
		queryKey: ["products-query-by-id", id],
		// the queryKey is array is passed to the query function as parameters
		queryFn: fetchProduct,
	});
};
