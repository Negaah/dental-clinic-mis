"use client";
import { useEffect, useState } from "react";
import apiClient from "../lib/api";
import CreatePatientForm from "../../components/form_patients";

const Patients = () => {
  const [data, setData] = useState([]); // To store the patient data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  const [nextLink, setNextLink] = useState(null); // To store next page URL
  const [prevLink, setPrevLink] = useState(null); // To store previous page URL
  const [count, setCount] = useState(0); // To store total number of patients
  const [currentLink, setCurrentLink] = useState("/patients/"); // Initial API endpoint

  const fetchData = async (url) => {
    try {
      const response = await apiClient.get(url); // Fetch data from API
      console.log(response.data)
      setData(response.data.results || []); // Update the data state
      setNextLink(response.data.next || null); // Set next page URL
      setPrevLink(response.data.previous || null); // Set previous page URL
      setCount(response.data.count || 0); // Set total count of patients
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentLink); // Fetch data when component mounts
  }, [currentLink]); // Dependency array to trigger effect when currentLink changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Patient Table */}
      <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg mb-10 mt-2">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Full Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">DOB</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Gender</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Phone #</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((patient, index) => (
            <tr
              key={patient.id}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-100 transition-colors`}
            >
              <td className="px-4 py-2 text-sm border-b border-gray-200">{patient.id}</td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">{patient.full_name}</td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">{patient.dob}</td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">{patient.gender}</td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">{patient.phone}</td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">{patient.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      Pagination Controls
      <div className="flex justify-between items-center">
        <button
          disabled={!prevLink}
          onClick={() => setCurrentLink(prevLink)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">{`Showing ${data.length} of ${count} patients`}</span>
        <button
          disabled={!nextLink}
          onClick={() => setCurrentLink(nextLink)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Patients;
