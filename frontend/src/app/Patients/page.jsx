"use client";
import { useEffect, useState } from "react";
import apiClient from "../lib/api";
import CreatePatientForm from "../../components/form_patients"
const Patients = () => {
    const [data, setData] = useState([]); // نگهداری داده‌ها
    const [loading, setLoading] = useState(true); // مدیریت وضعیت بارگذاری
    const [error, setError] = useState(null); // مدیریت ارورها

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("/patients/"); // مسیر API
                setData(response.data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [data]); // [] باعث می‌شود فقط یکبار در زمان بارگذاری اجرا شود

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data)
    return (
        <div>
            <table className="w-full border shadow-2xl my-10 px-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Phone #</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.full_name}</td>
                            <td>{patient.dob}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreatePatientForm />
        </div>
    );
};

export default Patients;
