"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IoPersonAddOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const Page = () => {
    const [patients, setPatients] = useState([]); // Store patient data
    const [nextLink, setNextLink] = useState(null); // Next page link
    const [prevLink, setPrevLink] = useState(null); // Previous page link
    const [count, setCount] = useState(0); // Total count
    const [currentLink, setCurrentLink] = useState("http://localhost:8000/api/patient/"); // Current link

    // Fetch data whenever `currentLink` changes
    useEffect(() => {
        axios
            .get(currentLink)
            .then((response) => {
                const data = response.data;
                console.log(data)
                setPatients(data.results || []);
                setNextLink(data.next || null);
                setPrevLink(data.previous || null);
                setCount(data.count || 0);
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
            });
    }, [currentLink]);
    console.log(nextLink)
    // Handle delete operation
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            axios
                .delete(`http://127.0.0.1:8000/api/patient/${id}/`)
                .then(() => {
                    // Update state to remove deleted item
                    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
                    alert("Item deleted successfully!");
                })
                .catch((error) => {
                    console.error("Error deleting item:", error);
                    alert("Failed to delete the item.");
                });
        }
    };
    return (
        <div className="border p-20 w-[50%] mx-auto shadow-2xl rounded-2xl mt-20">
            <Link
                href="/register"
                className="bg-green-400 h-10 w-10 block flex items-center justify-center fixed top-[60%] right-[25%] rounded-full shadow-md"
            >
                <IoPersonAddOutline />
            </Link>

            <h1 className="text-center font-bold text-lg mb-4">Patient List</h1>

            <table className="border w-full mb-4">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Full Name</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">DOB</th>
                        <th className="p-4">Gender</th>
                        <th className="p-4">Update</th>
                        <th className="p-4">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((item) => (
                        <tr key={item.id}>
                            <td className="border p-2">{item.id}</td>
                            <td className="border p-2">{item.full_name}</td>
                            <td className="border p-2">{item.phone}</td>
                            <td className="border p-2">{item.dob}</td>
                            <td className="border p-2">{item.gender}</td>
                            <td className="border p-2">
                                <Link href={`update/${item.id}`}>
                                    <GrUpdate />
                                </Link>
                            </td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(item.id)}>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between">
                <button
                    onClick={() => setCurrentLink(prevLink)}
                    disabled={!prevLink}
                    className={`px-4 py-2 bg-gray-300 rounded ${!prevLink ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Previous
                </button>
                <span className="font-bold text-sm">Total Patients: {count}</span>
                <button
                    onClick={() => setCurrentLink(nextLink)}
                    disabled={!nextLink}
                    className={`px-4 py-2 bg-gray-300 rounded ${!nextLink ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Page;
