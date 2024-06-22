import { connect } from "@/db-config/db-config";
import User from "@/models/user-model";

import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

// connect with db first
connect();

interface tokenProps {
    id: string;
    username: string;
    email: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({error: "Invalid email or password"}, {status: 400});
        };

        // compares the password and the hashed password stored in db
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return NextResponse.json({error: "Invalid email or password"}, {status: 400});
        };

        // jwt (token) is a long encrypted string in which we insert the payload/data
        const tokenPayload: tokenProps = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
            expiresIn: '1h'
        });

        const response = NextResponse.json({
            message: "Logged in successfully!",
            success: true,
        });

        // will send the cookies as well (not the ones we eat ofc)
        response.cookies.set("token", token, {
            httpOnly: true, // means cookies can only be manipulated by the server
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}