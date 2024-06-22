import { connect } from "@/db-config/db-config";

import { NextRequest, NextResponse } from "next/server";

// connect with db first
connect();

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logged out successfully",
            success: true,
        });

        // getting token cookies
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}