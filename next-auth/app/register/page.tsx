'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onRegister = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/register", user);

            router.push("/login");

        } catch (error) {
            console.log("ERROR:",  error);
            toast.error("Registration failed.");
        };
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        };
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl my-3 text-gray-300 font-bold">{loading ? "Processing data..." : "Registeration Form"}</h1>
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({
                    ...user,
                    username: e.target.value,
                })}
                placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({
                    ...user,
                    email: e.target.value,
                })}
                placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({
                    ...user,
                    password: e.target.value,
                })}
                placeholder="password"
            />
            <button
                className={`mb-4 ${!buttonDisabled ? "px-3 py-2 border-2 border-gray-300 rounded-xl" : "cursor-not-allowed"}`}
                onClick={onRegister}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Fill the form first" : "Register"}
            </button>
            <Link href="/login">
                Login Page
            </Link>
        </div>
    )
}

export default Register;