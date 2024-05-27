"use client";

import { Loader2 } from "lucide-react";
import axios, { AxiosResponse } from "axios";
import { SyntheticEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { User } from "@/types";
import { Button } from "@/components/ui/button";

// function to post user data to backend, we have kept password and avatar hard-coded here
const addUser = async (user: { name: string; email: string }) => {
	const response = await axios.post("https://api.escuelajs.co/api/v1/users", {
		name: user.name,
		email: user.email,
		password: "changeme",
		avatar: "https://picsum.photos/800",
	});
	return response.data;
};

const fetchUsers = async (): Promise<AxiosResponse<User[], any>> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/users");
	return response;
};

const ReactQueryMutationExample = () => {
	// states to store name and email field value
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const queryClient = useQueryClient();

	// useMutation hook to add mutation function
	const mutation = useMutation({
		mutationFn: addUser,
		// this callback will run on successful request,
		// here we invalidate our fetching query
		// to refetch latest data with new user
		// but that will make an additional request to the server,
		// there a better way to get latest data, hence below code in commented
		// onSuccess: () => {
		// 	queryClient.invalidateQueries({ queryKey: ["users-mutation"] });
		// },

		// given below is a little more verbose code, but it saves an additional query request
		onSuccess: (data) => {
			queryClient.setQueryData(
				["users-mutation"],
				(
					oldQueryData: AxiosResponse<User[], any>
				): AxiosResponse<User[], any> => {
					console.log(oldQueryData);
					return { ...oldQueryData, data: [...oldQueryData.data, data] };
				}
			);
		},
	});

	// mutate function is used to send the request to backend
	const {
		mutate, // function to send mutation request
		isPending: isFormPending,
		isError: isFormErrror,
		error: formError,
		isSuccess,
		reset, // function to reset mutation
	} = mutation;

	const results = useQuery({
		queryKey: ["users-mutation"],
		queryFn: fetchUsers,
	});

	const { data, isPending: isUsersPending, isError: isUsersError } = results;
	// on submit handler
	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		// send post request by passing name and email
		mutate({ name, email });
	};

	return (
		<div className="container">
			<h1 className="text-2xl font-semibold mt-5">Mutation example</h1>
			<p className="text-lg mb-5">
				This is an example of posting data to backend to add a new user using
				useMutation hook, fill the form and submit to add user. If user is added
				a success message will appear or else an error message will appear. This
				example also uses optimistic update.
			</p>

			<h2 className="text-2xl font-semibold my-5">User Form</h2>
			{/* show pending state */}
			{isFormPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : isFormErrror ? (
				<div>
					<h2 className="text-xl font-semibold">{formError.message}</h2>
					<Button onClick={reset}>Reset</Button>
				</div>
			) : (
				<form onSubmit={onSubmit} className="space-y-6">
					<div className="flex flex-col">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							className="border"
							required
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							className="border"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<Button>Submit</Button>
				</form>
			)}
			{/* show success message */}
			{isSuccess ? <p className="mt-5 ">User added succesfully!</p> : null}

			<h2 className="text-2xl font-semibold my-5">User List</h2>
			{isUsersPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-col gap-5 my-5">
					{data?.data.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ol>
			)}
		</div>
	);
};

export default ReactQueryMutationExample;
