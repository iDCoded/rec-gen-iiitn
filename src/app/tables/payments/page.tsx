import { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

export default function PaymentsTable() {
	const [paymentData, setPaymentData] = useState<Payment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCardData = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/payments");
				if (!response.ok) throw new Error("Failed to fetch payments data");

				if (response.ok) {
					const data: Payment[] = await response.json();
					setPaymentData(data);
				}
			} catch (err: unknown) {
				console.error(err);
				setError("Unable to fetch data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchCardData();
	}, []);

	if (loading) return <p className="text-center text-gray-500">Loading...</p>;
	if (error) return <p className="text-center text-red-500">Error: {error}</p>;

	return (
		<div className="w-full max-w-4xl mx-auto py-10">
			<DataTable columns={columns} data={paymentData} />
		</div>
	);
}
