'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";

import axios from "axios";
import { toast} from "react-hot-toast";

const VerifyEmail = () => {
    // const router = useRouter();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verify-email", {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
            toast.error("Verification failed.");
        }
    };

    useEffect(() => {
        // vanilla js usage

        // token in url is like: url?token=15120591ska - we split using equals so it becomes ["url?token=", "15120591ska"]
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

        // using next js

        // const { query } = router;
        // const urlToken = query.token;
        // setToken(urlToken);
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl my-3 text-gray-300 font-bold">
                Verify Email
            </h1>
            <h2 className="bg-orange-500 p-2 text-black rounded-lg">
                {token ? `${token}` : "no token"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified!</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-red-500">Error</h2>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail;