/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type FormFields = {
	email: string;
	password: string;
};

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>();

	const navigate = useNavigate();
	const { login } = useAuth();

	const onSubmit: SubmitHandler<FormFields> = async (formData) => {
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/auth/login/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: formData.email.split("@")[0],
						// email: formData.email,
						password: formData.password,
					}),
				}
			);
			const data = await res.json();

			if (res.ok) {
				login(data.access, data.refresh);
				// localStorage.setItem("token", data.token);
				navigate("/");
			} else {
				setError("root", { message: data.detail });
			}
		} catch (error: any) {
			setError("root", { message: error.message });
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Alert
				// variant="warning"
				className="mb-4 border-amber-500 bg-amber-50 text-amber-800">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Demonstration Only</AlertTitle>
				<AlertDescription>
					This login form is for demonstration purposes only. The interface will
					be updated shortly with final design and functionality.
				</AlertDescription>
			</Alert>

			<Card className="shadow-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
					<CardDescription>Login with your email</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email" className="font-medium">
										Email
									</Label>
									<Input
										id="email"
										placeholder="m@example.com"
										className="rounded-md h-10"
										{...register("email", {
											required: "Email is required",
										})}
										type="email"
									/>
									{errors.email && (
										<div className="text-red-600 text-xs">
											{errors.email.message}
										</div>
									)}
								</div>
								<div className="grid gap-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="password" className="font-medium">
											Password
										</Label>
										<a
											href="#"
											className="text-sm text-primary hover:underline underline-offset-4">
											Forgot password?
										</a>
									</div>
									<Input
										id="password"
										placeholder="Enter your password"
										className="rounded-md h-10"
										{...register("password", {
											required: "Password is required",
										})}
										type="password"
									/>
									{errors.password && (
										<div className="text-red-600 text-xs">
											{errors.password.message}
										</div>
									)}
								</div>
								<Button
									disabled={isSubmitting}
									type="submit"
									className="w-full h-10 rounded-md font-medium">
									{isSubmitting ? "Logging in..." : "Login"}
								</Button>
								{errors.root && (
									<div className="text-red-600 text-xs p-2 bg-red-50 rounded border border-red-200">
										{errors.root.message}
									</div>
								)}
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<a
									href="/signup"
									className="text-primary font-medium hover:underline underline-offset-4">
									Sign up
								</a>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
