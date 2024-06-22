import { connect } from "@/db-config/db-config";
import User from "@/models/user-model";
import { sendMail } from "@/helpers/mailer";

import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

// connect with db first
connect();

export async function POST(req: NextRequest) {
    try {
        // retrieve data
        const body = await req.json();
        const { username, email, password } = body;

        // validation
        const user = await User.findOne({email});
        
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        };

        // hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating User object and giving it values
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // save user details
        const savedUser = await newUser.save();

        // send verification email
        await sendMail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        return NextResponse.json({
            message: "User registered successfully!",
            success: true,
            savedUser,
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}