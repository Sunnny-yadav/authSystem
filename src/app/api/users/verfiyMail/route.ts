import {NextResponse, NextRequest} from 'next/server'
import {connect} from '@/dbConfig/dbConfig'
import {User} from '@/models/userModels'

connect()
export async function POST(request: NextRequest){
    try {
        const responeBody = await request.json();
        const {token} = responeBody;
        console.log(token)
        const user = await User.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt: Date.now()}
        });
        
        if(!user){
            return NextResponse.json(
                {error:"user not found"},
                {status:400}
            )
        };

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry= undefined;
        await user.save();

        return NextResponse.json({
            message:"user verification successfull",
            success: true
        })

    } catch (error) {
        console.log("Error in backend");
      
        let errorMessage = "An error occurred during email verification";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
      
}
