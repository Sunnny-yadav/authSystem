import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModels";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

interface RegistrationRequest{
    username:string;
    email:string;
    password:string;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody : RegistrationRequest = await request.json();
    const { username, email, password } = reqBody;
 

    // check if user already exist
    const userExist = await User.findOne({ email });
    
  
    if (userExist) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 }
      );
    }

    // hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    if (!newUser) {
      return NextResponse.json(
        { error: "user creation failed" },
        { status: 400 }
      );
    };

    const safeUser = {
        id:newUser._id,
        username: newUser.username,
        email: newUser.email
    };

  sendMail({
      reciverMail:safeUser.email, 
      emailType:"VERIFY", 
      userId:safeUser.id
    })

    return NextResponse.json({
      message: "user registration succesfull",
      success: true,
      user: safeUser,
    },{status: 201});


  } catch (error) {
    console.log("Error in backend");
  
    let errorMessage = "An error occurred during registration";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
  
};
