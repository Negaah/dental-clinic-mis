"use client";
import { useEffect, useState } from "react";
import apiClient from "../lib/api";
import CreatePatientForm from "../../components/form_patients";
// ICON part
import { FaHospitalUser } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
const Patients = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [data, setData] = useState([]); // To store the patient data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  const [search, setSearch] = useState(""); // To store next page URL
  const [nextLink, setNextLink] = useState(null); // To store next page URL
  const [prevLink, setPrevLink] = useState(null); // To store previous page URL
  const [count, setCount] = useState(0); // To store total number of patients
  const [currentLink, setCurrentLink] = useState("/patients/?search="); // Initial API endpoint



  // SEARCH Function
  const onSubmit = async (data) => {
    try {
      setSearch(data.search)
      setCurrentLink(`/patients/?search=${search}`)

    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Error creating patient");
    }
  };

// PageInation Function
  const fetchData = async (url) => {
    try {
      const response = await apiClient.get(url); // Fetch data from API
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
    <>
      <main className="col-span-7 bg-white">
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
          {/* Patient Table */}
          <h1>{search}</h1>
          {
            (count) ?
              <>
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
                      <th className="px-4 py-2 text-left text-sm font-semibold">
                        Profile
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {data.map((patient, index) => (

                      <tr
                        key={patient.id}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
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
                        <td>
                          <Link href={`Patients/${patient.id}`}>
                            <FaHospitalUser />
                          </Link>
                        </td>
                      </tr>

                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-4 px-4">
                  <button
                    disabled={!prevLink}
                    onClick={() => setCurrentLink(prevLink)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors ${prevLink
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
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors ${nextLink
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <span>Next</span>
                    <FaArrowRight className="w-4 h-4" /> {/* Right arrow icon */}
                  </button>
                </div>
              </>

              :
              <h1>No Records {search} Found</h1>
          }

          {/* Pagination Controls */}

        </div>
      </main>

      <section className="col-span-3 bg-gray-50 p-4 space-y-4">
        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Search
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>

              <input
                id="search"
                {...register("search", { required: "search" })}
                className="mt-1 block w-full border-gray-300 rounded shadow-sm"
              />
              {errors.search && (
                <p className="text-red-600 text-sm mt-1">{errors.search.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Search
            </button>
          </form>
        </div>
        <CreatePatientForm />
      </section>
    </>
  );
};

export default Patients;
