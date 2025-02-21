/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
	firstName: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	token: string;
	loading: boolean;
	login: (_token: string, _userData: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	token: "",
	loading: true,
	login: (_token: string, _userData: User) => {},
	logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState(localStorage.getItem("token") || "");
	const [loading, setLoading] = useState<boolean>(true);

	// Only attempt fetching the user once on mount if a token exists.
	useEffect(() => {
		if (token && !user) {
			fetchUser();
		} else {
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Separate effect for logging user changes.
	useEffect(() => {
		console.log("User in state:", user);
	}, [user]);

	async function fetchUser() {
		try {
			const res = await fetch("http://127.0.0.1:8000/api/validate-token/", {
				headers: { Authorization: `Token ${token}` },
			});
			if (!res.ok) throw new Error("Invalid token");

			const data = await res.json();
			setUser(data);
		} catch (error) {
			logout();
		} finally {
			setLoading(false);
		}
	}

	function login(token: string, userData: User) {
		localStorage.setItem("token", token);
		setToken(token);
		setUser(userData);
		setLoading(false);
	}

	function logout() {
		localStorage.removeItem("token");
		setToken("");
		setUser(null);
		setLoading(false);
	}

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
