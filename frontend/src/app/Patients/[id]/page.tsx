'use client'
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

    useEffect(() => {
        const resolveParams = async () => {
            const resolved = await params;
            setResolvedParams(resolved);
        };

        resolveParams();
    }, [params]);

    const { data, loading, error } = useFetch(
        resolvedParams ? `/patients/${resolvedParams.id}/` : "",
        { method: "GET" }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
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
                    {data?.appointments?.map((appointment: any, index: number) => (
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
};

export default page;
