import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, AlertCircle } from "lucide-react";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FormFields = {
	name: string;
	email: string;
	password: string;
};

export default function SignupForm() {
	const id = useId();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>();

	const onSubmit: SubmitHandler<FormFields> = async (formData) => {
		const firstName = formData.name.split(" ")[0];
		const lastName = formData.name.split(" ")[1];
		console.table({
			username: formData.email.split("@")[0],
			email: formData.email,
			password: formData.password,
			first_name: firstName ? firstName : "",
			last_name: lastName ? lastName : "",
		});
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/auth/register/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: formData.email.split("@")[0],
						email: formData.email,
						password: formData.password,
						first_name: firstName ? firstName : "",
						last_name: lastName ? lastName : "",
					}),
				}
			);
			const data = await res.json();

			if (res.ok) {
				localStorage.setItem("token", data.token);
			} else {
				// setError("root", { message: data.detail });
				// ? Send detailed error message from the backend
				// ? if user already exists with the given email.
				setError("root", { message: res.statusText });
			}
		} catch (error) {
			console.error("An error occured while signing up", error);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<Alert
				// variant="warning"
				className="mb-4 border-amber-500 bg-amber-50 text-amber-800">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Prototype Form</AlertTitle>
				<AlertDescription>
					This registration form is currently a prototype. The final
					implementation with complete functionality will be available soon.
				</AlertDescription>
			</Alert>

			<Card className="shadow-md">
				<CardHeader>
					<div className="flex flex-col items-center gap-3">
						<div
							className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-primary/10"
							aria-hidden="true">
							<Building2 className="h-6 w-6 text-primary" />
						</div>
						<p className="text-lg font-semibold">Sign up - IIIT Nagpur</p>
						<p className="sm:text-center text-muted-foreground">
							We just need a few details to get you started.
						</p>
					</div>
				</CardHeader>

				<CardContent>
					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor={`${id}-name`} className="font-medium">
									Full name
								</Label>
								<Input
									id={`${id}-name`}
									placeholder="Dhruv Anand"
									className="rounded-md h-10"
									{...register("name", { required: "Name is required" })}
									type="text"
								/>
								{errors.name && (
									<div className="text-red-600 text-xs">
										{errors.name.message}
									</div>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor={`${id}-email`} className="font-medium">
									Email
								</Label>
								<Input
									id={`${id}-email`}
									placeholder="hi@iiitn.ac.in"
									className="rounded-md h-10"
									{...register("email", { required: "Email is required" })}
									type="email"
								/>
								{errors.email && (
									<div className="text-red-600 text-xs">
										{errors.email.message}
									</div>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor={`${id}-password`} className="font-medium">
									Password
								</Label>
								<Input
									id={`${id}-password`}
									placeholder="Enter your password"
									className="rounded-md h-10"
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 8,
											message: "Password must have at least 8 characters",
										},
									})}
									type="password"
								/>
								{errors.password && (
									<div className="text-red-600 text-xs">
										{errors.password.message}
									</div>
								)}
							</div>
						</div>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full h-10 rounded-md font-medium">
							{isSubmitting ? "Creating account..." : "Create account"}
						</Button>
						{errors.root && (
							<div className="text-red-600 text-xs p-2 bg-red-50 rounded border border-red-200">
								{errors.root.message}
							</div>
						)}
						<div className="text-center text-sm">
							Already have an account?{" "}
							<a
								href="/login"
								className="text-primary font-medium hover:underline underline-offset-4">
								Login
							</a>
						</div>
					</form>
				</CardContent>

				<p className="text-center text-xs text-muted-foreground pb-6">
					By signing up you agree to our{" "}
					<a className="text-primary underline hover:no-underline" href="#">
						Terms of Service
					</a>
					.
				</p>
			</Card>
		</div>
	);
}
