"use client";
import { useForm } from "react-hook-form";
import apiClient from "@/app/lib/api";

const CreatePatientForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await apiClient.post("/patients/", data);
            console.log("Patient created successfully:", response.data);
            alert("Patient created successfully!");
        } catch (error) {
            console.error("Error creating patient:", error);
            alert("Error creating patient");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Patient</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="full_name" className="block text-sm font-medium">
                        Full Name
                    </label>
                    <input
                        id="full_name"
                        {...register("full_name", { required: "Full Name is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.full_name && (
                        <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="dob" className="block text-sm font-medium">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dob"
                        {...register("dob", { required: "Date of Birth is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.dob && (
                        <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium">
                        Gender
                    </label>
                    <select
                        id="gender"
                        {...register("gender", { required: "Gender is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && (
                        <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: "Invalid phone number",
                            },
                        })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium">
                        Address
                    </label>
                    <textarea
                        id="address"
                        {...register("address", { required: "Address is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.address && (
                        <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="medical_history" className="block text-sm font-medium">
                        Medical History
                    </label>
                    <textarea
                        id="medical_history"
                        {...register("medical_history")}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreatePatientForm;
