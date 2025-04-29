import { NextResponse, NextRequest } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import { User } from "@/models/userModels";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    const {newPassword , token} = await request.json();

    const user = await User.findOne({
        forgotPasswordToken:token,
        forgotPasswordTokenExpiry:{$gt:Date.now()}
    });

    if(!user){
        return NextResponse.json(
            {error:"user token mismatched"},
            {status:400}
        )
    };

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = newHashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.save();

    return NextResponse.json({
        message:"reset password successfull",
        success: true
    })
};