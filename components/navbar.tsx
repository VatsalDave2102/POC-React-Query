"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

const Navlinks = [
	{ tag: "RQ Fetch", link: "/rq-fetch" },
	{ tag: "RQ Cache", link: "/rq-cache" },
	{ tag: "RQ Stale", link: "/rq-stale" },
	{ tag: "RQ Refetch Default", link: "/rq-refetch-default" },
	{ tag: "RQ Polling", link: "/rq-polling" },
	{ tag: "RQ Fetch Onclick", link: "/rq-fetch-onclick" },
	{ tag: "RQ Data Transformation", link: "/rq-data-transform" },
	{ tag: "RQ Custom Hook", link: "/rq-custom-hook" },
	{ tag: "RQ Query by id", link: "/rq-query-by-id" },
	{ tag: "RQ Parallel Queries", link: "/rq-parallel-queries" },
	{ tag: "RQ Use Queries", link: "/rq-use-queries" },
];
export function Navbar() {
	return (
		<nav className="bg-rose-500 shadow w-[300px]">
			<ol className="px-1">
				<Accordion type="single" collapsible>
					<AccordionItem value="home" className="py-2">
						<li>
							<Button variant={"link"} className="text-white px-0 text-md">
								<Link href={"/"}>Home</Link>
							</Button>
						</li>
					</AccordionItem>
					<AccordionItem value="traditional-fetch" className="py-2">
						<li>
							<Button variant={"link"} className="text-white px-0 text-md">
								<Link href={"/traditional-fetch"}>Traditional Fetch</Link>
							</Button>
						</li>
					</AccordionItem>
					<AccordionItem value="rq">
						<AccordionTrigger className="text-white">
							React Query Examples
						</AccordionTrigger>
						<AccordionContent>
							{Navlinks.map((navlink) => (
								<li className="px-2" key={navlink.link}>
									<Button variant={"link"} className="text-white px-0">
										<Link href={navlink.link}>{navlink.tag}</Link>
									</Button>
								</li>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</ol>
		</nav>
	);
}
