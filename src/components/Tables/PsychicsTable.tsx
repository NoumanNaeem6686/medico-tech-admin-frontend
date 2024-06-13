"use client";
import {
  deletePsychic,
  gettingAllPsychics,
} from "@/store/slices/psychicsSlice";
import { PSYCHICS_TABLE } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

const PsychicsTable = () => {
  const dispatch = useDispatch();//@ts-ignore
  const { pasychics, loading } = useSelector((state) => state.psychics);

  useEffect(() => {
    const getAllPsychics = async () => {
      try {
        //@ts-ignore
        await dispatch(gettingAllPsychics());
      } catch (error) {
        console.error("Failed to fetch psychics:", error);
      }
    };

    getAllPsychics();
  }, [dispatch]);

  const handleEdit = (id: string) => {
    // Handle edit logic here
    console.log("Edit psychic with ID:", id);
  };

  const handleDelete = async (id: string) => {
    try {
      //@ts-ignore
      const response = await dispatch(deletePsychic(id));
      //@ts-ignore
      if (response?.payload?.success) {
        // The Redux state will be updated by the deletePsychic.fulfilled case
      }
    } catch (error) {
      console.error("Error deleting psychic:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="dark:bg-gray-800 relative overflow-hidden bg-white shadow-md sm:rounded-lg">
          <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-x-4 lg:space-y-0"></div>
          <div className="overflow-x-auto">
            <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
              <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-[#12a19b] text-xs uppercase text-white">
                <tr>
                  <th scope="col" className="p-4"></th>
                  <th scope="col" className="px-4 py-3">
                    Psychics
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <FaEye />
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Employed
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Hours
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Earnings
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pasychics &&
                  pasychics.map((psychic: any, index: any) => (
                    <tr
                      key={index}
                      className="odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 border-b odd:bg-white"
                    >
                      <td className="w-4 px-4 py-3">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            // onClick="event.stopPropagation()"
                            className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                      >
                        <Link
                          href={
                            //@ts-ignore
                            `/psychics-details/${psychic.id}?name=${psychic.name}`
                          }
                        >
                          <div className="flex items-center">
                            <img
                              src={
                                //@ts-ignore
                                psychic?.profileUrl
                              }
                              alt="Psychic Image"
                              className="mr-3 h-8 w-auto"
                            />
                            {
                              //@ts-ignore
                              psychic?.name
                            }
                          </div>
                        </Link>
                      </th>
                      <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        <div className="flex items-center">
                          <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                          category
                        </div>
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        {
                          //@ts-ignore
                          psychic?.status ? "Online" : "Offline"
                        }
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        on/off
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        <div className="flex items-center">
                          {
                            //@ts-ignore
                            psychic?.joiningDate
                          }
                        </div>
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        <div className="flex items-center">120 hours</div>
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        <div className="flex items-center">$6000</div>
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        <div className="flex items-center space-x-2">
                          {/* <button
                            onClick={() => handleEdit(psychic.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button> */}
                          <button
                            onClick={() => handleDelete(psychic.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychicsTable;
