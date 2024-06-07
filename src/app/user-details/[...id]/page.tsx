"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Page = ({ params }: any) => {
  const { id } = params;
  const [customerHistory, setCustomerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerHistory = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/customer/psychics-detail-by-id/${id}`,
        );
        console.log("🚀 ~ fetchCustomerHistory ~ response:", response);
        setCustomerHistory(response.data);
        setLoading(false);
      } catch (error) {
        //@ts-ignore
        setError(error);
        setLoading(false);
      }
    };

    fetchCustomerHistory();
  }, [id]);

  if (loading) {
    return (
      <DefaultLayout>
        <div>Loading...</div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div>
          {
            //@ts-ignore
            error ? "No Data Found!" : ""
          }
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Readers History</h1>
        {customerHistory.length > 0 ? (
          <table className="min-w-full border bg-white">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">User Name</th>
                <th className="border-b px-4 py-2">Selected Time</th>
                <th className="border-b px-4 py-2">Total Amount</th>
                <th className="border-b px-4 py-2">Last Readings</th>
                {/* <th className="border-b px-4 py-2">Reviews</th> */}
                {/* <th className="border-b px-4 py-2">Notes</th>
                <th className="border-b px-4 py-2">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {customerHistory.map((item: any) => (
                <tr key={item.id}>
                  <td className="border-b px-4 py-2">{item.userName}</td>
                  <td className="border-b px-4 py-2">{item.selectedTime}m</td>
                  <td className="border-b px-4 py-2">${item.totalAmount}</td>
                  <td className="border-b px-4 py-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  {/* <td className="border-b px-4 py-2">{item.notes}</td>
                  <td className="border-b px-4 py-2">{item.status}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No customer history found</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Page;
