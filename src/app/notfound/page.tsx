import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col justify-center items-center text-center h-screen gap-6">
			<h1 className="text-7xl font-mono font-bold">404</h1>
			<p>
				<span className="italic">Opps!</span> Page not found
			</p>
			<Button
				onClick={() => {
					navigate("/");
				}}>
				Back to Home
			</Button>
		</div>
	);
};

export default NotFound;
