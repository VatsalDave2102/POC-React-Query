"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { axiosInterceptor } from "@/utils/axios-utils";

// function to post user data to backend, we have kept password and avatar hard-coded here
const addUser = async (user: {
	name: string;
	email: string;
	password: string;
}) => {
	const response = await axios.post("https://api.escuelajs.co/api/v1/users", {
		name: user.name,
		email: user.email,
		password: user.password,
		avatar: "https://picsum.photos/800",
	});
	return response.data;
};

// function to login user, this will return access token and refresh token, will store in localStorage
const loginUser = async (credentials: { email: string; password: string }) => {
	const response = await axios.post(
		"https://api.escuelajs.co/api/v1/auth/login",
		{ email: credentials.email, password: credentials.password }
	);
	return response.data;
};

// function to fetch current user using access token in localStorage
const fetchUser = async (): Promise<User> => {
	// we are using interceptor, hence we have our base URL defined
	const response = await axiosInterceptor.get("/auth/profile");
	return response.data;
};

const ReactQueryAxiosInterceptorExample = () => {
	return (
		<>
			<div className="flex flex-col">
				<div className="flex gap-36">
					<AddUserForm />
					<LoginForm />
				</div>
				<FetchUser />
			</div>
		</>
	);
};

// component to with form to add users
const AddUserForm = () => {
	// states to store name and email field value
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// useMutation hook to add mutation function
	const addUserMutation = useMutation({
		mutationFn: addUser,
	});

	// mutate function is used to send the request to backend
	const {
		mutate, // function to send mutation request
		isPending,
		isError,
		error,
		isSuccess,
		reset, // function to reset mutation
	} = addUserMutation;

	// on submit handler
	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		// send post request by passing name and email
		mutate({ name, email, password });
	};

	return (
		<div className="border-t-2 py-3">
			{" "}
			<h2 className="text-2xl font-semibold mb-5">Add User Form</h2>
			<p className="text-lg mb-5">
				Add user to the database by filling details.
			</p>
			{isError ? (
				<div>
					<h2 className="text-xl font-semibold">{error.message}</h2>
					<Button onClick={reset}>Reset</Button>
				</div>
			) : null}
			{/* show pending state */}
			{isPending ? (
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
						<label htmlFor="add-email">Email</label>
						<input
							type="email"
							id="add-email"
							className="border"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="add-password">Password</label>
						<input
							type="password"
							id="add-password"
							className="border"
							required
							min={6}
							onChange={(e) => setPassword(e.target.value)}
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

// component to login users
const LoginForm = () => {
	// states to store credentials
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// mutation query, when login is successful, we store token in localStorage
	// using onSuccess callback
	const mutation = useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			localStorage.setItem("currentUser", JSON.stringify(data));
		},
	});

	// mutate function is used to send the request to backend
	const {
		mutate, // function to send mutation request
		isPending,
		isError,
		error,
		isSuccess,
		reset, // function to reset mutation
	} = mutation;

	// on submit handler
	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		// send post request by passing email and password
		mutate({ email, password });
	};

	return (
		<div className="border-t-2 py-3">
			<h2 className="text-2xl font-semibold mb-5">Login Form</h2>
			<p className="text-lg mb-5">
				Login user to store its current user tokens in localStorage
			</p>

			{/* display error */}
			{isError ? (
				<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
			) : null}

			{/* display loader */}
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<form onSubmit={onSubmit} className="space-y-6">
					<div className="flex flex-col">
						<label htmlFor="login-email">Email</label>
						<input
							type="email"
							id="login-email"
							className="border"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="login-password">Password</label>
						<input
							type="password"
							id="login-password"
							className="border"
							required
							min={6}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button>Submit</Button>
				</form>
			)}

			{isSuccess ? (
				<p className="mt-5 ">
					User logged in succesfully and stored to localStorage!
				</p>
			) : null}
		</div>
	);
};

// component to fetch current user and display its details
const FetchUser = () => {
	// query to fetch current user, the http header will have auth token attached using interceptor
	const results = useQuery({
		queryKey: ["current-user"],
		queryFn: fetchUser,
		enabled: false,
	});

	// extracting data, error and states
	const { isFetching, isLoading, data, isError, error, refetch } = results;

	return (
		<div className="border-t-2 py-3">
			<h2 className="text-2xl font-semibold mb-5">Fetch Current User</h2>
			<p className="text-lg mb-5">
				Fetching user using axios interceptors. We have attached HTTP
				Authorization header in the request using interceptor.
			</p>
			<Button onClick={() => refetch()}>Fetch user</Button>

			{isError ? (
				<div>
					<h2 className="text-xl font-semibold my-5">{error.message}</h2>
				</div>
			) : null}

			{isFetching && isLoading ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : null}
			{data ? (
				<Card className="w-[500px] my-3">
					<CardHeader>
						<CardTitle className="truncate">{data?.name}</CardTitle>
						<CardDescription className="text-wrap truncate">
							{data?.email}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<p className="text-zinc-600">{data?.role}</p>
						</div>
					</CardContent>
				</Card>
			) : null}
		</div>
	);
};

export default ReactQueryAxiosInterceptorExample;
