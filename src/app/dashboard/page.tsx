// import { useOutletContext } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
	// const { user } = useOutletContext<{ user: User }>();
	return (
		<div>
			<ul className="text-center grid gap-2 grid-flow-col">
				<li>
					<Button asChild>
						<Link to={"/payments"}>Payments Table</Link>
					</Button>
				</li>
				<li>
					<Button asChild>
						<Link to={"/transactions"}>Transactions Table</Link>
					</Button>
				</li>
			</ul>
		</div>
	);
}
