"use client";
import { useEffect, useState } from "react";
import apiClient from "../lib/api";
import CreatePatientForm from "../../components/form_patients";
// ICON part
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
      console.log(response.data);
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <button
          disabled={!prevLink}
          onClick={() => setCurrentLink(prevLink)}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors ${
            prevLink
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FaArrowLeft className="w-4 h-4" /> {/* Left arrow icon */}
          <span>Previous</span>
        </button>
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-gray-700">Page:</span>
          <span className="bg-gray-100 px-3 py-1 rounded-md font-medium text-blue-600 shadow-sm">
            {Math.ceil(data.length / 10)} of {Math.ceil(count / 10)}
          </span>
        </div>
        <button
          disabled={!nextLink}
          onClick={() => setCurrentLink(nextLink)}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors ${
            nextLink
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span>Next</span>
          <FaArrowRight className="w-4 h-4" /> {/* Right arrow icon */}
        </button>
      </div>
    </div>
  );
};

export default Patients;
