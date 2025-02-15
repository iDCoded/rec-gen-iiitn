import { Button } from "./components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function App() {
	return (
		<>
			<div className="flex flex-col justify-center items-center min-h-screen">
				<Card>
					<CardHeader>
						<CardTitle className="text-center text-2xl font-bold">
							Academic Fee Detail
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-row gap-8">
							<div className="flex flex-col gap-2">
								<Label htmlFor="name">Student Name</Label>
								<Input id="Name" placeholder="Name" />
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email</Label>
								<Input type="email" placeholder="Email" />
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Submit Fee Details</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}

export default App;
