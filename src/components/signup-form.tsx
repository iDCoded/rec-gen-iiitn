import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import { useId, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function SignupForm() {
	const id = useId();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSignup(e: React.FormEvent): Promise<void> {
		e.preventDefault();

		const username = email.split("@")[0];
		const firstName = name.split(" ")[0];
		const lastName = name.split(" ")[1];

		await fetch("http://localhost:8000/api/signup/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				firstName,
				lastName,
			}),
		});
	}

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<div className="flex flex-col items-center gap-2">
						<div
							className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
							aria-hidden="true">
							<Building2 />
						</div>
						<p className="sm:text-center">Sign up IIIT Nagpur</p>
						<p className="sm:text-center text-muted-foreground">
							We just need a few details to get you started.
						</p>
					</div>
				</CardHeader>

				<CardContent>
					<form className="space-y-5" onSubmit={handleSignup}>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor={`${id}-name`}>Full name</Label>
								<Input
									id={`${id}-name`}
									placeholder="Dhruv Anand"
									type="text"
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor={`${id}-email`}>Email</Label>
								<Input
									id={`${id}-email`}
									placeholder="hi@iiitn.ac.in"
									type="email"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor={`${id}-password`}>Password</Label>
								<Input
									id={`${id}-password`}
									placeholder="Enter your password"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
						</div>
						<Button type="button" className="w-full">
							Sign up
						</Button>
						<div className="text-center text-sm">
							Already have an account?{" "}
							<a href="/login" className="underline underline-offset-4">
								Login
							</a>
						</div>
					</form>
				</CardContent>

				<p className="text-center text-xs text-muted-foreground pb-6">
					By signing up you agree to our{" "}
					<a className="underline hover:no-underline" href="#">
						Terms
					</a>
					.
				</p>
			</Card>
		</div>
	);
}
