import axios from "axios";
import jwtDecode from "jwt-decode";

// API base URL
const BASE_URL = "http://localhost:8000";

// Helper function to check if a token is expired
export const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decodedToken.exp < currentTime;
    } catch {
        return true; // Assume expired if decoding fails
    }
};

// Get a new access token using the refresh token
export const getNewAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            throw new Error("No refresh token found. Please log in.");
        }

        const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
            refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem("access_token", access);
        return access;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        alert("Session expired. Please log in again.");
        window.location.href = "/login"; // Redirect to login
        return null;
    }
};

// Wrapper for authenticated API requests
export const apiRequest = async (url, method = "get", data = null) => {
    let accessToken = localStorage.getItem("access_token");

    // Refresh the token if it is expired
    if (isTokenExpired(accessToken)) {
        accessToken = await getNewAccessToken();
        if (!accessToken) return null; // Abort if refreshing fails
    }

    try {
        const response = await axios({
            url: `${BASE_URL}${url}`,
            method,
            headers: { Authorization: `Bearer ${accessToken}` },
            data,
        });

        return response.data;
    } catch (error) {
        console.error("API request failed:", error);
        return null; // Handle error appropriately
    }
};
