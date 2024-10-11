"use client";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const TransactionsTable = () => {
  const data = useSelector((state: any) => state.transection);
  let transactions = data.psychicsTransection;
  transactions = transactions?.slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  console.log("transactions", transactions);

  if (data.loading) {
    return <Loader />;
  }

  if (data.isError) {
    return <p>Error loading transactions.</p>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <table className="min-w-full overflow-hidden rounded-2xl border shadow-lg">
        <thead className="bg-[#12A19B] text-white">
          <tr>
            <th scope="col" className="px-4 py-3">
              Transaction Number
            </th>
            <th scope="col" className="px-4 py-3">
              Transaction Type
            </th>
            <th scope="col" className="px-4 py-3">
              Withdraw Amount
            </th>
            <th scope="col" className="px-4 py-3">
              Date
            </th>
            <th scope="col" className="px-4 py-3">
              Psychic
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction: any, index: number) => (
              <tr
                key={index}
                className={`hover:bg-[#a7ebd9] ${
                  index % 2 !== 0 ? "bg-[#daedec]" : "bg-white"
                }`}
              >
                <td className="text-gray-900 px-4 py-2 text-center font-medium dark:text-white">
                  {transaction.transactionNumber}
                </td>
                <td className="text-gray-900 px-4 py-2 text-center font-medium dark:text-white">
                  {transaction.transactionType}
                </td>
                <td className="text-gray-900 px-4 py-2 text-center font-medium dark:text-white">
                  {transaction.withdrawAmount}
                </td>
                <td className="text-gray-900 px-4 py-2 text-center font-medium dark:text-white">
                  {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="text-gray-900 px-4 py-2 text-center font-medium dark:text-white">
                  {transaction.psychics?.name}
                </td>
                <td className="text-gray-900 px-4 py-2 text-center font-medium capitalize dark:text-white">
                  <span className="rounded-md bg-green-800 px-3 py-1 text-white">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-gray-900 text-center dark:text-white"
              >
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
