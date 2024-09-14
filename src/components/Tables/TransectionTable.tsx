"use client";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const TransactionsTable = () => {
    const data = useSelector((state: any) => state.transection);
    const transactions = data.psychicsTransection;

    if (data.loading) {
        return < Loader />
    }

    if (data.isError) {
        return <p>Error loading transactions.</p>;
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <table className="min-w-full border rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-[#12A19B] text-white">
                    <tr>
                        <th scope="col" className="px-4 py-3">Transaction Number</th>
                        <th scope="col" className="px-4 py-3">Transaction Type</th>
                        <th scope="col" className="px-4 py-3">Withdraw Amount</th>
                        <th scope="col" className="px-4 py-3">Psychic</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.length > 0 ? (
                        transactions.map((transaction: any, index: number) => (
                            <tr
                                key={index}
                                className={`hover:bg-[#a7ebd9] ${index % 2 !== 0 ? "bg-[#daedec]" : "bg-white"
                                    }`}
                            >
                                <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">
                                    {transaction.transactionNumber}
                                </td>
                                <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">
                                    {transaction.transactionType}
                                </td>
                                <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">
                                    {transaction.withdrawAmount}
                                </td>
                                <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">
                                    {transaction.psychics?.name}
                                </td>
                                <td className="text-gray-900 text-center px-4 capitalize py-2 font-medium dark:text-white">
                                    <span className="bg-green-800 text-white px-3 py-1 rounded-md">
                                        {transaction.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center text-gray-900 dark:text-white">
                                No transactions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default TransactionsTable;
