"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "./Loader";
import Breadcrumb from "./Breadcrumbs/Breadcrumb";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URL}/api/user/getAllUsers`);
        console.log("🚀 ~ fetchUsers ~ response:", response);
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        //@ts-ignore
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    //@ts-ignore
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb pageName="All Users" />

      <table className="min-w-full border bg-white rounded-2xl overflow-hidden shadow-lg">
        <thead className="bg-[#12A19B] text-white">
          <tr>
            {/* <th className="border-b px-4 py-2">ID</th> */}
            <th className="border-b py-2">Name</th>
            <th className="border-b px-4 py-2">Email</th>
            {/* <th className="border-b px-4 py-2">Country</th> */}
            <th className="border-b px-4 py-2">Contact </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any, index: number) => (
            <tr key={index} className={`hover:bg-[#a7ebd9] ${index % 2 !== 0 ? "bg-[#daedec]" : "bg-white"}`}>
              {/* <td className="border-b px-4 py-2">{user.id}</td> */}
              <td className="px-4 py-2 text-center capitalize">
                <Link
                  href={`/user-details/${user.id}`} //@ts-ignore
                  key={user.id}
                  passHref
                >
                  {user.userName}
                </Link>
              </td>
              <td className="px-4 py-2 text-center">{user.email}</td>
              {/* <td className="border-b px-4 py-2">{user.country}</td> */}
              <td className="px-4 py-2 text-center">{user.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
