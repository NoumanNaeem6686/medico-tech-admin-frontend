"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../Loader";
import { updatePsychic } from "@/store/slices/psychicsSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

function FreeMinutesTable() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { psychics } = useSelector((state: any) => state.psychics);
    console.log("🚀 ~ FreeMinutesTable ~ psychics:", psychics)

    const [loadingId, setLoadingId] = useState<string | null>(null);

    const assignMinutes = async (psychicId: string) => {
        setLoadingId(psychicId);

        const payload = {
            id: psychicId,
            assignedFreeMinutes: 250,
        };

        await dispatch(updatePsychic(payload));

        setLoadingId(null);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <table className="min-w-full border rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-[#12A19B] text-white">
                    <tr>
                        <th scope="col" className="px-4 py-3"></th>
                        <th scope="col" className="px-4 py-3">Psychic</th>
                        <th scope="col" className="px-4 py-3">Given Free minutes</th>
                        <th scope="col" className="px-4 py-3">Used Free minutes</th>
                        <th scope="col" className="px-4 py-3">Assign Minutes</th>
                    </tr>
                </thead>
                <tbody>
                    {psychics.map((psychic: any, index: number) => (
                        <tr
                            key={psychic.id}
                            className={`hover:bg-[#a7ebd9] ${index % 2 === 0 ? "bg-[#daedec]" : "bg-white"}`}
                        >
                            <td className="text-center px-4 py-2">{index + 1}</td>
                            <td className="text-center capitalize px-4 py-2">{psychic.name}</td>
                            <td className="text-center px-4 py-2">{psychic.assignedFreeMinutes}</td>
                            <td className="text-center px-4 py-2">{psychic.usedFreeMinutes}</td>
                            <td className="text-center px-4 py-2">
                                <button
                                    onClick={() => assignMinutes(psychic.id)}
                                    disabled={psychic.assignedFreeMinutes > 0 || loadingId === psychic.id}
                                    className={`${psychic.assignedFreeMinutes > 0 || loadingId === psychic.id
                                        ? "cursor-not-allowed bg-slate-600"
                                        : "bg-blue-500"
                                        } text-white rounded-xl p-2 px-4`}
                                >
                                    {loadingId === psychic.id ? (
                                        "Loading..."
                                    ) : (
                                        "Assign"
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default FreeMinutesTable;
