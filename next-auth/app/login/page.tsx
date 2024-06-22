'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
    
            router.push("/profile");
            
        } catch (error) {
            console.log("ERROR:",  error);
            toast.error("Login error.");
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        };
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl my-3 text-gray-300 font-bold">{loading ? "Processing data..." : "Login Form"}</h1>
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
                onClick={onLogin}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Fill the form first" : "Login"}
            </button>
            <Link href="/register">
                Registeration Page
            </Link>
        </div>
    )
}

export default Login;