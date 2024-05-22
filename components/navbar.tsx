import Link from "next/link";

import { Button } from "@/components/ui/button";

const Navlinks = [
	{ tag: "Home", link: "/" },
	{ tag: "Traditional Fetch", link: "/traditional-fetch" },
	{ tag: "RQ Fetch", link: "/rq-fetch" },
	{ tag: "RQ Cache", link: "/rq-cache" },
	{ tag: "RQ Stale", link: "/rq-stale" },
	{ tag: "RQ Refetch Default", link: "/rq-refetch-default" },
	{ tag: "RQ Polling", link: "/rq-polling" },
];
export function Navbar() {
	return (
		<nav className="bg-rose-500 shadow">
			<ol className="flex gap-x-3 py-2">
				{Navlinks.map((navlink) => (
					<li className="px-2" key={navlink.link}>
						<Button variant={"link"} className="text-white px-0">
							<Link href={navlink.link}>{navlink.tag}</Link>
						</Button>
					</li>
				))}
			</ol>
		</nav>
	);
}
