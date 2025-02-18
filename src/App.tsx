import { ArrowRight } from "lucide-react";
import { Button } from "./components/ui/button";

function App() {
	return (
		<>
			<div className="flex flex-col justify-center items-center min-h-screen">
				<h1>Welcome</h1>
				<Button className="group">
					<a
						href="/login"
						className="flex flex-row justify-center items-center">
						Login
						<ArrowRight
							className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
							size={16}
							strokeWidth={2}
							aria-hidden="true"
						/>
					</a>
				</Button>{" "}
			</div>
		</>
	);
}

export default App;
