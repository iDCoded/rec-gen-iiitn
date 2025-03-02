import { useState, useEffect } from "react";
import { columns, Transaction } from "./columns";
import { DataTable } from "./data-table";

export default function TransactionsTable() {
	const [transactionData, setTransactionData] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchTransactionData = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/transactions");
				if (!response.ok) throw new Error("Failed to fetch transactions data");

				if (response.ok) {
					const data: Transaction[] = await response.json();
					setTransactionData(data);
				}
			} catch (err: unknown) {
				console.error(err);
				setError("Unable to fetch data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchTransactionData();
	}, []);

	if (loading) return <p className="text-center text-gray-500">Loading...</p>;
	if (error) return <p className="text-center text-red-500">Error: {error}</p>;

	return (
		<div className="w-full max-w-4xl mx-auto py-10">
			<DataTable columns={columns} data={transactionData} />
		</div>
	);
}
