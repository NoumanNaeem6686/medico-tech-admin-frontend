"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

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
        <Loader />
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
        <Breadcrumb pageName="Readers History" />

        {customerHistory.length > 0 ? (
          <table className="min-w-full border rounded-2xl overflow-hidden shadow-lg">
            <thead className="bg-[#12A19B] text-white">
              <tr>
                <th className="border-b px-4 py-2">Service Type</th>
                <th className="border-b px-4 py-2">Selected Time</th>
                <th className="border-b px-4 py-2">Total Amount</th>
                <th className="border-b px-4 py-2">Last Readings</th>
                {/* <th className="border-b px-4 py-2">Reviews</th> */}
                {/* <th className="border-b px-4 py-2">Notes</th>
                <th className="border-b px-4 py-2">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {customerHistory.map((item: any, index: any) => (
                <tr key={item.id} className={`hover:bg-[#a7ebd9] ${index % 2 !== 0 ? "bg-[#daedec]" : "bg-white"}`}>
                  <td className="px-4 capitalize py-2 text-center">{item.serviceType}</td>
                  <td className="px-4 py-2 text-center">{item.selectedTime}m</td>
                  <td className="px-4 py-2 text-center">${item.amount}</td>
                  <td className="px-4 py-2 text-center">
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
