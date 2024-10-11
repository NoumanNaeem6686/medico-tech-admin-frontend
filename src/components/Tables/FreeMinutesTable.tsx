"use client";
import { useState } from "react";

const dummyData = [
    {
        id: 1,
        psychic: "John Doe",
        givenFreeMinutes: 50,
        usedFreeMinutes: 30,
        amountOfGivenFreeMinutes: "$25",
        amountOfUsedForMinutes: "$15",
    },
    {
        id: 2,
        psychic: "Jane Smith",
        givenFreeMinutes: 40,
        usedFreeMinutes: 20,
        amountOfGivenFreeMinutes: "$20",
        amountOfUsedForMinutes: "$10",
    },
    {
        id: 3,
        psychic: "Mark Johnson",
        givenFreeMinutes: 60,
        usedFreeMinutes: 45,
        amountOfGivenFreeMinutes: "$30",
        amountOfUsedForMinutes: "$22.5",
    },
    {
        id: 4,
        psychic: "Emily Davis",
        givenFreeMinutes: 35,
        usedFreeMinutes: 25,
        amountOfGivenFreeMinutes: "$17.5",
        amountOfUsedForMinutes: "$12.5",
    },
];
function FreeMinutesTable() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <table className="min-w-full border rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-[#12A19B] text-white">
                    <tr>
                        <th scope="col" className="px-4 py-3"></th>
                        <th scope="col" className="px-4 py-3">Psychic</th>
                        <th scope="col" className="px-4 py-3">Given Free minutes</th>
                        <th scope="col" className="px-4 py-3">Used Free minutes</th>
                        <th scope="col" className="px-4 py-3">Amount of given free minutes</th>
                        <th scope="col" className="px-4 py-3">Amount of used for minutes</th>
                        <th scope="col" className="px-4 py-3">Assign Minutes</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map((item) => (
                        <tr key={item.id} className={`hover:bg-[#a7ebd9] ${item.id % 2 === 0 ? "bg-[#daedec]" : "bg-white"}`}>
                            <td className="text-center px-4 py-2">{item.id}</td>
                            <td className="text-center px-4 py-2">{item.psychic}</td>
                            <td className="text-center px-4 py-2">{item.givenFreeMinutes}</td>
                            <td className="text-center px-4 py-2">{item.usedFreeMinutes}</td>
                            <td className="text-center px-4 py-2">{item.amountOfGivenFreeMinutes}</td>
                            <td className="text-center px-4 py-2">{item.amountOfUsedForMinutes}</td>
                            <td className="text-center px-4 py-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">Assign</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default FreeMinutesTable