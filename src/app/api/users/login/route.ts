import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/userModels.js";
import jwt from "jsonwebtoken";

connect();

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
  
    const reqBody: LoginRequest = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "No User Found",
        },
        { status: 400 }
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return NextResponse.json(
        {
          error: "Password Mismatch occured",
        },
        { status: 400 }
      );
    }

    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;


  } catch (error) {
    console.error("Login route error:", error);
  
    let errorMessage = "An error occurred while performing login operation";
  
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
  
}
