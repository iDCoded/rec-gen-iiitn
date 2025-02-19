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

	const onSubmit: SubmitHandler<FormFields> = async (formData) => {
		const res = await fetch("http://localhost:8000/api/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
			}),
		});
		const data = await res.json();

		if (res.ok) {
			localStorage.setItem("token", data.token);
		} else {
			setError("root", { message: data.detail });
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Login with your email</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										placeholder="m@example.com"
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
										placeholder="Enter your password"
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
									className="w-full">
									Login
								</Button>
								{errors.root && (
									<div className="text-red-600 text-xs">
										{errors.root.message}
									</div>
								)}
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
