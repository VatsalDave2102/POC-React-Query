import ReactQuerySingleProduct from "@/components/rq/rq-single-product";

export default function ReactQueryPostPage({
	params,
}: {
	params: { id: string };
}) {
	return <ReactQuerySingleProduct productId={params.id} />;
}
