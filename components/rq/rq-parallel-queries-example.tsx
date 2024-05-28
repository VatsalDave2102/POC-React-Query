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
import { Product, User } from "@/types";

// we have defined two fetching functions to show parallel queries
// one for products and one for users
const fetchProducts = async (): Promise<Product[]> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/products");
	return response.data;
};

const fetchUsers = async (): Promise<User[]> => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/users"
	);
	return response.data;
};

const ReactQueryParallelQueriesExample = () => {
	// here we are fetching products and users parallely,
	// but when in suspense mode, this will not work as first query would throw
	// a promise internally and would suspend the component
	// to get around this, use useSuspenseQueries or useSuspenseQuery

	// query to fetch products
	const productsResult = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	// query to fetch users
	const usersResult = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

	// destructuring loading state, data, error message recieved from results of products and users
	const {
		isPending: isProductsPending,
		data: productsData,
		isError: isProductsError,
		error: productsError,
	} = productsResult;

	const {
		isPending: isUsersPending,
		data: usersData,
		isError: isUsersError,
		error: usersError,
	} = usersResult;

	return (
		<>
			<div className="flex mt-5 justify-evenly">
				<div className="products">
					<h2 className="text-xl font-semibold">Products list</h2>
					{/* display products error */}
					{isProductsError ? (
						<h2 className="text-2xl font-semibold text-center">
							{productsError.message}
						</h2>
					) : null}

					{/* display loader */}
					{isProductsPending ? (
						<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
					) : (
						<ol className="flex flex-col gap-5 my-5">
							{productsData?.map((product) => (
								<li key={product.id}>
									<Card className="w-[250px]">
										<CardHeader>
											<CardTitle className="truncate">
												{product.title}
											</CardTitle>
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
				</div>
				<div className="users">
					<h2 className="text-xl font-semibold">Users list</h2>
					{/* display user error */}
					{isUsersError ? (
						<h2 className="text-2xl font-semibold text-center">
							{usersError.message}
						</h2>
					) : null}

					{/* display loader */}
					{isUsersPending ? (
						<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
					) : (
						<ol className="flex flex-col gap-5 my-5">
							{usersData?.map((user) => (
								<li key={user.id}>
									<Card className="w-[250px]">
										<CardHeader>
											<CardTitle className="truncate">{user.name}</CardTitle>
											<CardDescription className="h-[100px] text-wrap truncate">
												{user.email}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="flex justify-between">
												<p className="text-zinc-600">{user.role}</p>
											</div>
										</CardContent>
									</Card>
								</li>
							))}
						</ol>
					)}
				</div>
			</div>
		</>
	);
};

export default ReactQueryParallelQueriesExample;
