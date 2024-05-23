"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Album, User } from "@/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

//  we have defined two fetching functions to shows dependant queries
// first the user will be fetched and then album, this shows dependency of album on user
const fetchUserById = async (userId: string): Promise<User> => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${userId}`
	);
	return response.data;
};

const fetchAlbumById = async (albumId: string): Promise<Album> => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/albums/${albumId}`
	);
	return response.data;
};

const ReactQueryDependentQueriesExample = () => {
	// here we have user hard-coded userId, in real life scenario pass id through props or using searchParams
	const userId = "1";
	const user = useQuery({
		queryKey: ["user-dependent-query", userId],
		queryFn: () => fetchUserById(userId),
	});

	// here we have user hard-coded albumId, in real life scenario pass id through props or using searchParams
	const albumId = "1";
	const album = useQuery({
		queryKey: ["album-dependent-query", albumId],
		queryFn: () => fetchAlbumById(albumId),
		// this will not trigger album fetching until user is fetched
		enabled: !!user.data,
	});

	// show user error
	if (user.isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">
				User not found, {user.error.message}
			</h2>
		);
	}

	// show album error
	if (album.isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">
				Album not found, {album.error.message}
			</h2>
		);
	}
	return (
		<div className="container">
			<h1 className="text-xl font-semibold text-center mt-5">
				Dependant queries
			</h1>
			<p className="text-center">
				The example shows how to fetch dependent data by first fetching the user
				and then fetching album that depends upon whether user is found or not.
			</p>
			{/* user card */}
			<h2 className="text-xl font-semibold text-center mt-5">User</h2>
			{user.isPending ? (
				<div className="flex gap-x-2 items-center justify-center">
					<p>Fetching user</p>

					<Loader2 className="w-8 h-8 text-rose-500 animate-spin my-5" />
				</div>
			) : (
				<Card className="my-5">
					<CardHeader>
						<CardTitle className="truncate">{user.data.name}</CardTitle>
						<CardDescription className="h-[100px] text-wrap truncate">
							{user.data.email}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<p className="text-zinc-600">{user.data.role}</p>
						</div>
					</CardContent>
				</Card>
			)}
			{/* album card */}
			<h2 className="text-xl font-semibold text-center mt-5">Album</h2>

			{album.isPending ? (
				<div className="flex gap-x-2 items-center justify-center">
					<p>Waiting for user</p>

					<Loader2 className="w-8 h-8 text-rose-500 animate-spin my-5" />
				</div>
			) : (
				<Card className="my-5">
					<CardHeader>
						<CardTitle className="truncate">{album.data.title}</CardTitle>
					</CardHeader>
				</Card>
			)}
		</div>
	);
};

export default ReactQueryDependentQueriesExample;
