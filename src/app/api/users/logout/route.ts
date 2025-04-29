import {NextResponse} from 'next/server'

export async function GET(){
    try {
        const response = NextResponse.json({
            message:"LogOut successfull",
            success:true
        });

        response.cookies.set("token","",{httpOnly:true});

        return response;
    } catch (error: any) {
        return NextResponse.json({
            error:error.message || "An error occured in the logout controller"
        },{status:500});
    }
}