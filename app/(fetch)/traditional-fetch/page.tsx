import TraditionalFetchExample from "@/components/traditional/traditional-fetch-example";

export default function TraditionalFetchPage() {
	return (
		<div className="container text-zinc-700">
			<h1 className="text-2xl font-semibold mt-5">Traditional Fetch example</h1>
			<p className="text-lg">
				Demonstrating a traditional fetch request without using React Query.
			</p>
			<TraditionalFetchExample />
		</div>
	);
}
