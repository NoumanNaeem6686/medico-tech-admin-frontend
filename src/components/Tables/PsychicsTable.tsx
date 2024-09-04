"use client";
import {
  deletePsychic,
  gettingAllPsychics,
  updatePsychic,
} from "@/store/slices/psychicsSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import EditPsychicModal from "../EditPsychicModal"; // Import the modal component
import { toast } from "react-toastify";
import { Psychic } from "@/types/psychic";

const PsychicsTable = () => {
  const dispatch = useDispatch(); //@ts-ignore
  const { psychics, loading } = useSelector((state) => state.psychics);
  console.log("🚀 ~ PsychicsTable ~ psychics:", psychics);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPsychic, setCurrentPsychic] = useState<any>({});

  // useEffect(() => {
  //   const getAllPsychics = async () => {
  //     try {
  //       //@ts-ignore
  //       await dispatch(gettingAllPsychics());
  //     } catch (error) {
  //       console.error("Failed to fetch psychics:", error);
  //     }
  //   };

  //   getAllPsychics();
  // }, [dispatch]);

  const handleEdit = (psychic: any) => {
    setCurrentPsychic(psychic);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this psychic?",
    );
    if (!confirmed) {
      return;
    }

    try {
      //@ts-ignore
      const response: any = await dispatch(deletePsychic(id));
      console.log("🚀 ~ handleDelete ~ response:", response);

      if (response?.payload) {
        toast.success("Psychic deleted successfully");
      } else {
        toast.error("Failed to delete psychic");
      }
    } catch (error) {
      console.error("Error deleting psychic:", error);
      toast.error("Error deleting psychic");
    }
  };

  const handleUpdatePsychic = async (updatedPsychic: any) => {
    console.log("updatedPsychic", updatedPsychic);
    try {
      //@ts-ignore
      const response: any = await dispatch(updatePsychic(updatedPsychic));
      console.log("🚀 ~ handleUpdatePsychic ~ response:", response);
      if (response?.payload?.success) {
        toast.success("Psychic updated successfully");
        setEditModalOpen(false);
        // setCurrentPsychic({});
      } else {
        // Handle update error
      }
    } catch (error) {
      console.error("Error updating psychic:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="dark:bg-gray-800 relative overflow-hidden bg-white shadow-md sm:rounded-lg">
          <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-x-4 lg:space-y-0"></div>
          <div className="overflow-x-auto"> */}
      <table className="min-w-full border rounded-2xl overflow-hidden shadow-lg">
        <thead className="bg-[#12A19B] text-white">
          <tr>
            {/* <th scope="col" className="p-4"></th> */}
            <th scope="col" className="px-4 py-3">
              Psychics
            </th>
            {/* <th scope="col" className="px-4 py-3">
                    Category
                  </th> */}
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
          {psychics &&
            psychics.map((psychic: any, index: any) => (
              <tr key={index} className={`hover:bg-[#a7ebd9] ${index % 2 !== 0 ? "bg-[#daedec]" : "bg-white"}`}>
                {/* <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td> */}
                <td className="text-gray-900 whitespace-nowrap text-center px-4 py-2 font-medium dark:text-white">

                  <Link
                    href={`/psychics-table/psychics-details/${psychic.id}?name=${psychic.name}`}
                    className="flex items-center"
                  >
                    <Image
                      src={psychic?.profileUrl}
                      alt="Psychic Image"
                      className="mr-3 h-8 w-auto mix-blend-normal"
                      width={100}
                      height={100}
                    />
                    {psychic?.name}
                  </Link>
                </td>
                {/* <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                        <div className="flex items-center">
                          <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                          category
                        </div>
                      </td> */}
                <td className="text-gray-900 whitespace-nowrap text-center px-4 py-2 font-medium dark:text-white">

                  {psychic?.status ? "Online" : "Offline"}
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap text-center px-4 py-2 font-medium dark:text-white">

                  {psychic?.joiningDate}
                </td>
                <td className="text-gray-900 whitespace-nowrap text-center px-4 py-2 font-medium dark:text-white">

                  120 hours
                </td>
                <td className="text-gray-900 whitespace-nowrap text-center px-4 py-2 font-medium dark:text-white">

                  $6000
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(psychic)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
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
      {/* </div>
        </div>
      </div> */}
      {editModalOpen && (
        <EditPsychicModal
          psychic={currentPsychic}
          onClose={() => setEditModalOpen(false)}
          onUpdate={handleUpdatePsychic}
        />
      )}
    </section>
  );
};

export default PsychicsTable;
