import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleLogin(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): Promise<void> {
		e.preventDefault();

		const username = email.split("@")[0]; // Store the enrollment ID (before @) as the username

		await fetch("http://localhost:8000/api/login/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});

		// TODO: Add alert messages
		// const data = await res.json();
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Login with your email</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										{/* <a
											href="#"
											className="ml-auto text-sm underline-offset-4 hover:underline">
											Forgot your password?
										</a> */}
									</div>
									<Input
										id="password"
										type="password"
										placeholder="Enter your password"
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									onClick={(e) => handleLogin(e)}>
									Login
								</Button>
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<a href="/signup" className="underline underline-offset-4">
									Sign up
								</a>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
