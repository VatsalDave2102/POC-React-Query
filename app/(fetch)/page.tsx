import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const cardData = [
	{
		title: "Basic Fetch",
		description: `Demonstrating simple data fetching with React Query's
    useQuery hook.`,
		link: "/rq-fetch",
	},
	{
		title: "Mutations",
		description: `Demonstrating a post request to add a user using useMutation,  and
    updating the user list.`,
		link: "/rq-mutation",
	},
	{
		title: "Pagination",
		description: `Implementing pagination using offset and limit, with keepPreviousData to prevent showing a loader.`,
		link: "/rq-pagination",
	},
	{
		title: "Infinite Scroll",
		description: `Implementing infinite scroll using useInfiniteQuery and React
    Intersection Observer to fetch the next page automatically.`,
		link: "/rq-infinite-scroll",
	},
	{
		title: "Data Transform",
		description: `Demonstrating data transformation from the response using the select
    option in React Query.`,
		link: "/rq-data-transform",
	},
	{
		title: "Polling",
		description: `Demonstrating data polling using refetchInterval and
    refetchIntervalInBackground options in React Query.`,
		link: "/rq-polling",
	},
];
export default function Home() {
	return (
		<div className="container p-5">
			<div className="w-3/4">
				<h1 className="text-4xl font-semibold text-rose-500">
					React Query Proof of Concept
				</h1>
				<h3 className="text-2xl text-zinc-700">
					Explore various use cases of React Query:{" "}
				</h3>
				<ol className="flex flex-wrap gap-3 mt-5">
					{cardData.map((card) => (
						<li key={card.link}>
							<Card className="w-[500px]">
								<CardHeader>
									<CardTitle className="truncate">{card.title}</CardTitle>
									<CardDescription className="text-wrap">
										{card.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button className="bg-rose-500 hover:bg-rose-500/90">
										<Link href={card.link}>Check example</Link>
									</Button>
								</CardContent>
							</Card>
						</li>
					))}
				</ol>
				<h3 className="text-2xl text-zinc-700 mt-5">
					...and many more. Check other use cases from sidebar.
				</h3>
			</div>
		</div>
	);
}
