import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

interface tokenProps {
    id: string;
    username: string;
    email: string;
}

export const getPayloadFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";

        // decode the token
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        // decoded token has the payload that we set @route.ts in login directory

        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};