"use client";

import { useEffect, useState } from "react";
import apiClient from "../../lib/api";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle, FaPhoneAlt, FaCalendarAlt, FaMapMarkerAlt, FaNotesMedical } from 'react-icons/fa';

export default function RootLayout(
  {
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }
) {


  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [data, setData] = useState<any>([null]); // To store the patient data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState<Error | null>(null); // To manage error state

  // Use effect to resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params; // Resolve the promise
      setResolvedParams(resolved); // Store the resolved params
    };

    resolveParams();
  }, [params]); // Only re-run if params change

  const fetchData = async () => {
    if (!resolvedParams) return; // Ensure params are resolved before fetching
    try {
      const response = await apiClient.get(`/patients/${resolvedParams.id}/`); // Fetch data from API
      setData(response.data || {}); // Update the data state
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

  return (
    <>
      <main className="col-span-7 bg-white">
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
          {/* Profile Picture Section */}
          <div className="relative flex flex-col items-center mt-10">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg flex items-center justify-center bg-blue-100">
              <FaUserCircle className="text-blue-500 text-6xl" />
            </div>
          </div>

          {/* Patient Info Section */}
          <div className="mt-6 px-10">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{data?.full_name}</h1>
              <p className="text-gray-600">Gender: {data?.gender}</p>
            </div>

            {/* Patient Details in Rows */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 ">
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-blue-500" />
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="block text-gray-800">{data?.phone}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-blue-500" />
                <div>
                  <span className="font-medium text-gray-700">DOB:</span>
                  <span className="block text-gray-800">{data?.dob}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-500" />
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="block text-gray-800">{data?.address}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaNotesMedical className="text-blue-500" />
                <div>
                  <span className="font-medium text-gray-700">Medical History:</span>
                  <span className="block text-gray-800">{data?.medical_history}</span>
                </div>
              </div>
            </div>


          </div>

          {/* Children Section */}
          <div className="mt-10 px-10">
            <hr className="border-t border-gray-300" />
            <div className="mt-6">
              {children}
            </div>
          </div>
        </div>
      </main>

      <section className="col-span-3 bg-gray-50 p-4 space-y-4">
        <div className="bg-white p-4 shadow rounded-md flex flex-col">
          <Link href={`/Patients/${resolvedParams.id}`}>Appointments</Link>
          <Link href={`/Patients/${resolvedParams.id}/updates`}>Update</Link>
          <Link href={`/`}>Delete</Link>
        </div>
      </section>
    </>
  );
}
