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
        
    } catch (error: any) {
        return NextResponse.json({
            error:error.message || "An error occured while executing the get function for fetching user Profile"
        })
        
    }
}

