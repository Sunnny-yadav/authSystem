import {NextResponse, NextRequest} from 'next/server'
import {connect} from '@/dbConfig/dbConfig'
import {User} from '@/models/userModels'
import { sendMail } from '@/helpers/mailer';

connect()
export async function POST(request: NextRequest){
    const reqBody = await request.json();
    const {email} = reqBody;

    const user = await User.findOne({email}).select("-password");

    if(!user){
        return NextResponse.json(
            {error:"user with this mail id not exist"},
            {status:400}
        )
    };

    const isMailSend = await sendMail({reciverMail: user.email, emailType:"RESET", userId:user._id});
    console.log(isMailSend)

    return NextResponse.json(
        {
            message:"email verification successfull",
            success:true
        }
    )

};