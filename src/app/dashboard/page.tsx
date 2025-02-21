import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	const { user, logout, loading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		// Only redirect if loading is complete and user is still null.
		if (!loading && !user) {
			navigate("/login");
		}
	}, [user, loading, navigate]);

	if (loading) {
		// Optionally, display a loading spinner or message.
		return <div>Loading...</div>;
	}

	if (!user) {
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
			<p className="text-lg">Email: {user.email}</p>
			<Button className="mt-4" onClick={logout}>
				Logout
			</Button>
		</div>
	);
}
