"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
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
    return <div>Loading...</div>;
  }

  if (error) {
    //@ts-ignore
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            {/* <th className="border-b px-4 py-2">ID</th> */}
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Email</th>
            {/* <th className="border-b px-4 py-2">Country</th> */}
            <th className="border-b px-4 py-2">Contact #</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={
                //@ts-ignore
                user.id
              }
            >
              {/* <td className="border-b px-4 py-2">{user.id}</td> */}
              <td className="border-b px-4 py-2">
                <Link //@ts-ignore
                  href={`/user-details/${user.id}`} //@ts-ignore
                  key={user.id}
                  passHref
                >
                  {
                    //@ts-ignore
                    user.userName
                  }
                </Link>
              </td>
              <td className="border-b px-4 py-2">
                {
                  //@ts-ignore
                  user.email
                }
              </td>
              {/* <td className="border-b px-4 py-2">{user.country}</td> */}
              <td className="border-b px-4 py-2">
                {
                  //@ts-ignore
                  user.mobileNo
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
