import User from "@/models/user-model";

import nodemailer from "nodemailer";
import { uuid } from "uuidv4";

interface MailProps {
    email: string;
    emailType: string;
    userId: string;
};

export const sendMail = async ({
    email,
    emailType,
    userId,
}: MailProps) => {
    try {
        // generate token
        const token = uuid();

        // update token values in db
        if (emailType == "VERIFY") {
            await User.findByIdAndUpdate(
                userId, {
                    $set: {
                        verifyToken: token,
                        verifyTokenExpiry: Date.now() + 3600000, // + 1hr
                    }
                }
            );
        } else if (emailType == "RESET") {
            await User.findByIdAndUpdate(
                userId, {
                    $set: {
                        forgotPasswordToken: token,
                        forgotPasswordTokenExpiry: Date.now() + 3600000, // +1hr
                    }
                }
            )
        }

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.PORT,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        const mailOptions = {
            from: 'leo@leo.ai',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password" ,
            html: `
                <p>
                    Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verify-email" : "reset-password"}?token=${token}">here</a> to 
                    ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                </p>`,
        };

        const info = await transporter.sendMail(mailOptions);

        return info;
    } catch (error: any) {
        throw new Error(error.message);
    }
}