'use client'
import { useState, useEffect } from "react";
import apiClient from "../../lib/api";

const page = (
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }
) => {
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
    const [data, setData] = useState<any>([null]);
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState<Error | null>(null); // To manage error state

    useEffect(() => {
        const resolveParams = async () => {
            const resolved = await params; // Resolve the promise
            setResolvedParams(resolved); // Store the resolved params
        };

        resolveParams();
    }, [params]);

    const fetchData = async () => {
        if (!resolvedParams) return; // Ensure params are resolved before fetching
        try {
            const response = await apiClient.get(`/patients/${resolvedParams.id}/`); // Fetch data from API
            setData(response.data.appointments || {}); // Update the data state
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (resolvedParams) {
            fetchData(); // Fetch data once params are resolved
        }
    }, [resolvedParams]); // Fetch when resolvedParams changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data, '--------------------------------------')
    return (
        <div>
            <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg mb-10 mt-2">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold"># </th>
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
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
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
                                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${appointment.status === "Scheduled"
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
        </div>
    );
}

export default page;