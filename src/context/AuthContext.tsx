/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from "react";

interface User {
	id: number;
	first_name: string;
	last_name: string;
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

	useEffect(() => {
		console.log("Updated user:", user);
	}, [user]); // Logs when user changes

	async function fetchUser() {
		try {
			const res = await fetch("http://127.0.0.1:8000/api/validate-token/", {
				headers: { Authorization: `Token ${token}` },
			});
			if (!res.ok) throw new Error("Invalid token");

			const data = await res.json();
			console.log("Received from API:", data);
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

export const useAuth = () => useContext(AuthContext);
