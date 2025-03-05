/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from "react";
import { jwtDecode } from "jwt-decode";

// Define the User type (adjust based on your API response)
interface User {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	loading: boolean;
	login: (_accessToken: string, _refreshToken: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	token: null,
	loading: true,
	login: (_accessToken: string, _refreshToken: string) => {},
	logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("access_token")
	);
	const [loading, setLoading] = useState<boolean>(true);

	// On mount, check if the token exists and is still valid
	useEffect(() => {
		if (token) {
			const decoded: any = jwtDecode(token);
			const currentTime = Date.now() / 1000;

			if (decoded.exp < currentTime) {
				refreshToken();
			} else {
				setUser(decoded);
			}
		}
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Function to log in the user
	function login(accessToken: string, refreshToken: string) {
		localStorage.setItem("access_token", accessToken);
		localStorage.setItem("refresh_token", refreshToken);

		const decoded: any = jwtDecode(accessToken);
		console.log(decoded);
		setUser(decoded);
		setToken(accessToken);
		setLoading(false);
	}

	// Function to log out the user
	function logout() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setToken(null);
		setUser(null);
		setLoading(false);
	}

	// Function to refresh the JWT token
	async function refreshToken() {
		const refreshToken = localStorage.getItem("refresh_token");

		if (!refreshToken) {
			logout();
			return;
		}

		try {
			const res = await fetch("http://127.0.0.1:8000/api/auth/token/refresh/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refresh: refreshToken }),
			});

			if (!res.ok) throw new Error("Failed to refresh token");

			const data = await res.json();
			login(data.access, refreshToken);
		} catch (error) {
			logout();
		}
	}

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
