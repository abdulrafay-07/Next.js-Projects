import { connect } from "@/db-config/db-config";
import User from "@/models/user-model";

import { getPayloadFromToken } from "@/helpers/get-payload-from-token";

import { NextRequest, NextResponse } from "next/server";

// connect with db first
connect();

export async function GET(req: NextRequest) {
    try {
        // extract data from token
        const userId = await getPayloadFromToken(req);

        const user = await User.findOne({_id: userId})
            .select("-password -email"); // password is not selected

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        };

        return NextResponse.json({
            message: "User found",
            success: true,
            data: user,
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}