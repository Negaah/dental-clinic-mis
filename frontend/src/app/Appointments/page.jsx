"use client";
import { useEffect, useState } from "react";
import apiClient from "../lib/api";
// Icons for pagination
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Appointments = () => {
  const [data, setData] = useState([]); // Appointment data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [nextLink, setNextLink] = useState(null); // Next page URL
  const [prevLink, setPrevLink] = useState(null); // Previous page URL
  const [count, setCount] = useState(0); // Total number of appointments
  const [currentLink, setCurrentLink] = useState("/appointments/"); // Initial API endpoint

  const fetchData = async (url) => {
    try {
      const response = await apiClient.get(url);
      setData(response.data.results || []);
      setNextLink(response.data.next || null);
      setPrevLink(response.data.previous || null);
      setCount(response.data.count || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentLink); // Fetch data whenever the currentLink changes
  }, [currentLink]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* Appointments Table */}
      <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg mb-10 mt-2">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">#</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Patient</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Dentist</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Time</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((appointment, index) => (
            <tr
              key={appointment.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-100 transition-colors`}
            >
              <td className="px-4 py-2 text-sm border-b border-gray-200">{index + 1}</td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {appointment.patient_name}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {appointment.dentist_name}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {appointment.appointment_date}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {appointment.appointment_time}
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                <span
                  className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                    appointment.status === "Scheduled"
                      ? "bg-yellow-100 text-yellow-600"
                      : appointment.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm border-b border-gray-200">
                {appointment.notes || "N/A"}
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
          <FaArrowLeft className="w-4 h-4" />
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
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Appointments;
