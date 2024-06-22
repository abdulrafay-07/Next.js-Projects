import { connect } from "@/db-config/db-config";
import User from "@/models/user-model";

import { NextRequest, NextResponse } from "next/server";

// connect with db first
connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token } = body;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt : Date.now()} // $gt means greater than Date.now() meaning not expired.
        });

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        };

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        // save user
        const savedUser = await user.save();

        return NextResponse.json({
            message: "Email verified successfully!",
            success: true,
            savedUser,
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}