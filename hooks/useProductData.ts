import { Product } from "@/types";
import {
	UseQueryResult,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
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

	// query client has the cache stored of the instance
	// which we can now access to set initial data
	const queryClient = useQueryClient();
	return useQuery({
		// to fetch data using id, we need to add the id in queryKey array
		// so that react query will not server same cache for different id
		queryKey: ["products-query-by-id", id],
		// the queryKey is array is passed to the query function as parameters
		queryFn: fetchProduct,
		// to prevent showing loading indicator we use initial data to fetch data initially by using queryClient which has cache of requests, there we find our product and return it. This is helpful when we already have data in other request and we need to details page of particular object, which is a product here
		initialData: () => {
			const product = queryClient
				.getQueryData<Product[]>(["products"])
				?.find((product) => product.id === parseInt(productId));
			if (product) {
				return product;
			} else {
				return undefined;
			}
		},
	});
};
