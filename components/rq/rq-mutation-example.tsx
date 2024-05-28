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

// function to fetch users
const fetchUsers = async (): Promise<AxiosResponse<User[], any>> => {
	const response = await axios.get("https://api.escuelajs.co/api/v1/users");
	return response;
};

const ReactQueryMutationExample = () => {
	return (
		<>
			<UserForm />
			<UserList />
		</>
	);
};

const UserForm = () => {
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

	// on submit handler
	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		// send post request by passing name and email
		mutate({ name, email });
	};

	return (
		<div className="border-y-2 py-3">
			<h2 className="text-2xl font-semibold mb-5">User Form</h2>

			{/* display error */}
			{isFormErrror ? (
				<h2 className="text-2xl font-semibold text-center">
					{formError.message}
				</h2>
			) : null}

			{/* display loader */}
			{isFormPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
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
		</div>
	);
};

const UserList = () => {
	// query to fetch users
	const results = useQuery({
		queryKey: ["users-mutation"],
		queryFn: fetchUsers,
	});

	// extracting data, error and states
	const { data, isPending, isError, error } = results;

	return (
		<>
			<h2 className="text-2xl font-semibold my-5">User List</h2>

			{/* display error */}
			{isError ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}
			{/* display loader */}

			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-col gap-5 my-5">
					{/* display user list */}
					{data?.data.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ol>
			)}
		</>
	);
};

export default ReactQueryMutationExample;
