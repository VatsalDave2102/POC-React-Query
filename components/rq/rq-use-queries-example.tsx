"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useQueries } from "@tanstack/react-query";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";

// fetching function
const fetchUser = async (userId: string): Promise<User> => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${userId}`
	);
	return response.data;
};

// hard coded user ids, in real life scenarios pass them using props or searchparams
const users = ["1", "2", "3", "4"];

const ReactQueryUseQueriesExample = () => {
	// to fetch multiple queries in parallel but dynamically,
	// suppose we let user fetch any 3 users, but don't know the ids of those users
	// we can use useQueries which will run those dynamic queries and return
	// the query results
	// this hook accepts an options object with a queries key whose value is an array with
	// query option objects identical to useQuery hook
	const queryResults = useQueries({
		queries: users.map((id) => ({
			queryKey: ["user-use-query", id],
			queryFn: () => fetchUser(id),
		})),
	});

	return (
		<>
			<h2 className="text-xl font-semibold mt-5">Users list</h2>
			<ol className="flex flex-wrap gap-5 my-5">
				{queryResults?.map((user, index) => {
					if (user.status === "pending") {
						return (
							<li key={index}>
								<Card className="w-[250px] h-[250px]">
									<CardHeader>
										<CardTitle className="truncate">Loading</CardTitle>
										<CardDescription className="text-wrap truncate">
											Fetching user
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
									</CardContent>
								</Card>
							</li>
						);
					}
					if (user.status === "error") {
						return (
							<li key={index}>
								<Card className="w-[250px] h-[250px]">
									<CardHeader>
										<CardTitle className="truncate text-rose-500">
											Error
										</CardTitle>
										<CardDescription className="h-[100px] text-wrap truncate">
											{user.error.message}
										</CardDescription>
									</CardHeader>
								</Card>
							</li>
						);
					}
					if (user.data)
						return (
							<li key={user.data.id}>
								<Card className="w-[250px] h-[250px]">
									<CardHeader>
										<CardTitle className="truncate">{user.data.name}</CardTitle>
										<CardDescription className="h-[100px] text-wrap truncate">
											{user.data.email}
										</CardDescription>
									</CardHeader>
								</Card>
							</li>
						);
				})}
			</ol>
		</>
	);
};

export default ReactQueryUseQueriesExample;
