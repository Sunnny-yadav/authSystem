import  {NextRequest} from 'next/server'
import jwt from 'jsonwebtoken'



export const getDataFromToken =async (request: NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || ""
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        
        if((typeof decodedToken == "string") || !("_id" in decodedToken)){
            throw new Error("Invalid token structure")
        };
        
        return decodedToken._id;
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error("Unknown error occured in getDataFromToken helper function")
        }
    }
};