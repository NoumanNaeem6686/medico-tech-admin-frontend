"use client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Modal } from "@mui/material"; // Import the modal from MUI (or any other modal library)

const dummyData = [
    {
        id: "66e52677875f513ec9e5abb6",
        transactionNumber: 1000,
        adminId: "663080c4341f818233e4ce87",
        psychicsId: "66a0d69e649d519bdfef7388",
        psychicBillingId: "66e521ff5b04e67e4b1ddef0",
        transactionType: "Withdraw",
        withdrawAmount: 200,
        status: "paid",
        createdAt: "2024-09-14T06:00:22.573Z",
        updatedAt: "2024-09-14T06:00:22.573Z",
        psychics: {
            id: "66a0d69e649d519bdfef7388",
            name: "psy",
            email: "psy@gmail.com",
        },
    },
];

const TransactionsTable = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<any>(null);
    const [newStatus, setNewStatus] = useState("");

    const handleEdit = (transaction: any) => {
        setCurrentTransaction(transaction);
        setNewStatus(transaction.status); // Initialize modal with current status
        setEditModalOpen(true);
    };

    const handleSaveStatus = () => {
        // Save new status and close modal
        if (currentTransaction) {
            currentTransaction.status = newStatus;
        }
        setEditModalOpen(false);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <table className="min-w-full border rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-[#12A19B] text-white">
                    <tr>
                        <th scope="col" className="px-4 py-3">Transaction Number</th>
                        <th scope="col" className="px-4 py-3">Transaction Type</th>
                        <th scope="col" className="px-4 py-3">Withdraw Amount</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                        <th scope="col" className="px-4 py-3">Psychic</th>
                        {/* <th scope="col" className="px-4 py-3">Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map((transaction, index) => (
                        <tr key={index} className={`hover:bg-[#a7ebd9] ${index % 2 !== 0 ? "bg-[#daedec]" : "bg-white"}`}>
                            <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">{transaction.transactionNumber}</td>
                            <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">{transaction.transactionType}</td>
                            <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">{transaction.withdrawAmount}</td>
                            <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">{transaction.psychics.name}</td>
                            <td className="text-gray-900 text-center px-4 capitalize py-2 font-medium dark:text-white">
                                <span className="bg-green-800 text-white px-3 py-1 rounded-md">
                                    {transaction.status}
                                </span>
                            </td>
                            {/* <td className="text-gray-900 text-center px-4 py-2 font-medium dark:text-white">
                                <button onClick={() => handleEdit(transaction)} className="text-blue-600 hover:text-blue-800">
                                    <FaEdit />
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* {editModalOpen && (
                <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                    <div className="p-6 bg-white rounded shadow-md m-auto mt-10 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Transaction Status</h2>
                        <p>Transaction Number: {currentTransaction?.transactionNumber}</p>
                        <label className="block text-sm font-medium text-gray-700 mt-4">
                            Status
                        </label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleSaveStatus}
                                className="mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )} */}
        </section>
    );
};

export default TransactionsTable;
