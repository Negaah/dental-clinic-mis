"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiRequest } from "@app/utils/auth.js";  // Optional: For decoding tokens

const UpdatePage = () => {
    const router = useRouter();
    const { id } = router.query; // Capture dynamic route parameter

    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");

    // Utility to refresh access token
    const getNewAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refresh_token");
            const response = await axios.post("http://localhost:8000/api/token/refresh/", {
                refresh: refreshToken,
            });
            const { access } = response.data;
            localStorage.setItem("access_token", access);
            return access;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            router.push("/login"); // Redirect to login if refresh fails
        }
    };

    // Helper function to check if a token is expired
    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };

    // API request wrapper with authentication
    const apiRequest = async (url, method = "GET", data = null) => {
        let accessToken = localStorage.getItem("access_token");

        // Refresh token if expired
        if (isTokenExpired(accessToken)) {
            accessToken = await getNewAccessToken();
        }

        try {
            const response = await axios({
                url,
                method,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data,
            });
            return response.data;
        } catch (error) {
            console.error("API request failed:", error);
        }
    };

    // Fetch patient data when `id` is available
    useEffect(() => {
        if (id) {
            apiRequest(`http://localhost:8000/api/patient/${id}/`)
                .then((data) => {
                    setFull_name(data.full_name);
                    setPhone(data.phone);
                    setDob(data.dob);
                    setGender(data.gender);
                })
                .catch((error) => {
                    console.error("Error fetching patient:", error);
                });
        }
    }, [id]);

    // Handle form submission to update patient
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!id) {
            alert("No patient ID provided.");
            return;
        }

        apiRequest(`http://localhost:8000/api/patient/${id}/`, "PUT", {
            full_name,
            phone,
            dob,
            gender,
        })
            .then(() => {
                alert("Patient updated successfully!");
                router.push("/home"); // Redirect to home
            })
            .catch((error) => {
                console.error("Error updating patient:", error);
                alert("Failed to update patient.");
            });
    };

    return (
        <div>
            <h1 className="text-center font-bold text-lg mt-10">Update Patient</h1>
            <form
                onSubmit={handleSubmit}
                className="border grid grid-cols-1 gap-10 p-20 w-[50%] mx-auto shadow-2xl rounded-2xl mt-10"
            >
                <input
                    type="text"
                    value={full_name}
                    onChange={(e) => setFull_name(e.target.value)}
                    placeholder="Full Name"
                    className="border p-2 rounded-2xl"
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="border p-2 rounded-2xl"
                />
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Date of Birth"
                    className="border p-2 rounded-2xl"
                />
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Gender"
                    className="border p-2 rounded-2xl"
                />
                <button type="submit" className="bg-green-500 p-2 rounded-full text-white">
                    Update Patient
                </button>
            </form>
        </div>
    );
};

export default UpdatePage;
