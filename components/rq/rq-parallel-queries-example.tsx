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
import { Product, User } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (): Promise<Product[]> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/products");

	return response.data;
};

const fetchUsers = async (): Promise<User[]> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/users");
	return response.data;
};

const ReactQueryParallelQueriesExample = () => {
	// here we are fetching products and users parallely,
	// but when in suspense mode, this will not work as first query would throw
	// a promise internally and would suspend the component
	// to get around this, use useSuspenseQueries or useSuspenseQuery
	const productsResult = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	const usersResult = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

	// destructuring loading state, data, error message recieved from useQuery
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
	// show error message if error occured during fetching,
	// the error message gets delayed because react-query
	// retries to fetch request
	if (isProductsError) {
		return (
			<h2 className="text-2xl font-semibold text-center">
				{productsError.message}
			</h2>
		);
	}

	if (isUsersError) {
		return (
			<h2 className="text-2xl font-semibold text-center">
				{usersError.message}
			</h2>
		);
	}
	return (
		<div className="container">
			<h1 className="mt-5 font-semibold text-xl">
				This is showcasing how to fetch data parallely using react query
			</h1>
			<div className="flex mt-5 justify-evenly">
				<div className="products">
					<h2 className="text-xl font-semibold">Products list</h2>
					{isProductsPending ? (
						<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
					) : (
						<ol className="flex flex-col gap-5 my-5 justify-between">
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
					{isUsersPending ? (
						<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
					) : (
						<ol className="flex flex-col gap-5 my-5 justify-between">
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
		</div>
	);
};

export default ReactQueryParallelQueriesExample;
