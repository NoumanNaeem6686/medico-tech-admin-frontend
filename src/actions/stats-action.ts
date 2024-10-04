"use server"
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getStats() {
    try {
        const response = await axios.get(`${BASE_URL}/api/analytics`);
        const data = response.data;
        return {
            data: data,
        };
    } catch (error: any) {
        console.log("🚀 ~ getStats ~ error:", error)
        const errorMessage = error.response?.data?.message || "Failed to fetch stats";
        return { error: errorMessage };
    }
}