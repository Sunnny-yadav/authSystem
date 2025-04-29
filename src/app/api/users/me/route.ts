import { getDataFromToken } from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse} from 'next/server'
import {connect} from '@/dbConfig/dbConfig'
import {User} from '@/models/userModels'

connect();

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)

        const userData = await User.findById({_id: userId}).select("-password");

        if(!userData){
            return NextResponse.json(
                {error:"User data not fetched"},
                {status:400}
            )
        };

        return NextResponse.json({
            message: "userData fetched Successfully",
            data:userData
        });
        
    } catch (error) {
        console.error("me route error:", error);
      
        let errorMessage = "An error occurred while fetching user data operation";
      
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
      
}

