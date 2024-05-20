import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Navbar() {
	return (
		<nav className="bg-rose-500 shadow">
			<ol className="flex gap-x-3 py-2">
				<li className="px-2">
					<Button variant={"link"} className="text-white px-0">
						<Link href={"/"}>Home</Link>
					</Button>
				</li>
				<li className="px-2">
					<Button variant={"link"} className="text-white px-0">
						<Link href={"/traditional-fetch"}>Traditional Fetch</Link>
					</Button>
				</li>
				<li className="px-2">
					<Button variant={"link"} className="text-white px-0">
						<Link href={"/rq-fetch"}>React Query Fetch</Link>
					</Button>
				</li>
			</ol>
		</nav>
	);
}
