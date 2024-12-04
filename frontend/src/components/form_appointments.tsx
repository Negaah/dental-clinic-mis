"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import apiClient from "@/app/lib/api";

const CreateAppointmentsForm = ({ onAppointmentCreated }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await apiClient.post("/appointments/", data);
            alert("Appointment created successfully!");
            reset(); // Clear the form after successful submission
            if (onAppointmentCreated) {
                onAppointmentCreated(response.data); // Optional callback to refresh appointments
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Error creating appointment");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Appointment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Patient ID */}
                <div>
                    <label htmlFor="patient" className="block text-sm font-medium">
                        Patient ID
                    </label>
                    <input
                        id="patient"
                        {...register("patient", { required: "Patient ID is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.patient && (
                        <p className="text-red-600 text-sm mt-1">{errors.patient.message}</p>
                    )}
                </div>

                {/* Dentist ID */}
                <div>
                    <label htmlFor="dentist" className="block text-sm font-medium">
                        Dentist ID
                    </label>
                    <input
                        id="dentist"
                        {...register("dentist", { required: "Dentist ID is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.dentist && (
                        <p className="text-red-600 text-sm mt-1">{errors.dentist.message}</p>
                    )}
                </div>

                {/* Appointment Date */}
                <div>
                    <label htmlFor="appointment_date" className="block text-sm font-medium">
                        Appointment Date
                    </label>
                    <input
                        type="date"
                        id="appointment_date"
                        {...register("appointment_date", { required: "Date is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.appointment_date && (
                        <p className="text-red-600 text-sm mt-1">{errors.appointment_date.message}</p>
                    )}
                </div>

                {/* Appointment Time */}
                <div>
                    <label htmlFor="appointment_time" className="block text-sm font-medium">
                        Appointment Time
                    </label>
                    <input
                        type="time"
                        id="appointment_time"
                        {...register("appointment_time", { required: "Time is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                    {errors.appointment_time && (
                        <p className="text-red-600 text-sm mt-1">{errors.appointment_time.message}</p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium">
                        Status
                    </label>
                    <select
                        id="status"
                        {...register("status", { required: "Status is required" })}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    >
                        <option value="">Select Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
                    )}
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium">
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        {...register("notes")}
                        className="mt-1 block w-full border-gray-300 rounded shadow-sm"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default CreateAppointmentsForm;
