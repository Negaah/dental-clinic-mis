"use client";
import { useEffect, useState } from "react";
import apiClient from "../lib/api";
import CreatePatientForm from "../../components/form_patients";
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
  // console.log(data)
  return (
    <div>
      <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg mb-10 mt-2">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Full Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">DOB</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Gender
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Phone #
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((patient, index) => (
            <tr
              key={patient.id} 
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-100 transition-colors`}
            >
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {patient.id}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {patient.full_name}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {patient.dob}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {patient.gender}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {patient.phone}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {patient.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Patients;
