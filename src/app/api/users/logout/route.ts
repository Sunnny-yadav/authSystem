import {NextResponse} from 'next/server'

export async function GET(){
    try {
        const response = NextResponse.json({
            message:"LogOut successfull",
            success:true
        });

        response.cookies.set("token","",{httpOnly:true});

        return response;
    } catch (error) {
        console.error("LogOut route error:", error);
      
        let errorMessage = "An error occurred while performing logout operation";
      
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
      
}