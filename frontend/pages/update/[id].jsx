"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

export default function UpdatePage() {
    const router = useRouter();
    const { id } = router.query; // Captures the dynamic part of the route

    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        if (id) { // Ensure `id` is defined
            axios
                .get(`http://localhost:8000/api/patient/${id}/`)
                .then((response) => {
                    const data = response.data;

                    // Populate form fields with fetched data
                    setFull_name(data.full_name);
                    setPhone(data.phone);
                    setDob(data.dob);
                    setGender(data.gender);
                })
                .catch((error) => {
                    console.error("Error fetching patient:", error);
                });
        }
    }, [id]); // Run effect when `id` changes

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/patient/${id}/`, { full_name, phone, dob, gender })
            .then(() => router.push("/home"))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Update Page</h1>
            <form onSubmit={handleSubmit} className="border grid grid-cols-1 gap-10 p-20 w-[50%] mx-auto shadow-2xl rounded-2xl mt-20">
                <input
                    type="text"
                    value={full_name}
                    onChange={(e) => setFull_name(e.target.value)}
                    placeholder="Full Name"
                    className="border p-2 rounded-2xl"
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="border p-2 rounded-2xl"
                />
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Date of Birth"
                    className="border p-2 rounded-2xl"
                />
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Gender"
                    className="border p-2 rounded-2xl"
                />
                <button type="submit" className="bg-green-500 p-2 rounded-full text-white">
                    Update Patient
                </button>
            </form>

        </div>
    );
}