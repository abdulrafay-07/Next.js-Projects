'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
    const router = useRouter();

    const [data, setData] = useState("");

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/details");

            setData(response.data.data._id);
        } catch (error) {
            console.log("ERROR:", error);
            toast.error("No user details found");
        };
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Successfully logged out");

            router.push("/login");
        } catch (error) {
            console.log("ERROR:", error);
            toast.error("Cannot logout");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl my-3 text-gray-300 font-bold">
                Profile Page
            </h1>
            <h2 className="py-2">
                {data === "" ? "Data not found" : (
                    <Link href={`/profile/${data}`}>
                        User ID: {data}
                    </Link>
                )}
            </h2>
            <button
                className="mb-2 px-3 py-2 bg-orange-500 text-black rounded-xl"
                onClick={getUserDetails}
            >
                Get Details
            </button>
            <button
                className="px-3 py-2 border-2 border-gray-300 rounded-xl"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}

export default Profile;