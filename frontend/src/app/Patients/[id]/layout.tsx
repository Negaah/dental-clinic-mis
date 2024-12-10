"use client";

import { useEffect, useState } from "react";
import apiClient from "../../lib/api";
import Link from "next/link";
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
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)] p-10">
          <h1>{data?.id}</h1>
          <h1>{data?.full_name}</h1>
          <h1>{data?.gender}</h1>
          <h1>{data?.phone}</h1>
          <h1>{data?.dob}</h1>
          <h1>{data?.address}</h1>
          <h1>{data?.medical_history}</h1>
          <br></br>
          <hr />
          <div className=" mt-20">
            {children}
          </div>
        </div >
      </main >
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
