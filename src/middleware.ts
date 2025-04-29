import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'


export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
   
    const isPathPublic = path == '/login' || path == '/signUp' ;

    const capturedToken = request.cookies.get("token")?.value || "" ;

    if(isPathPublic && capturedToken){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    };

    if(!isPathPublic && !capturedToken){
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
};

export const config = {
    matcher:[
        '/',
        '/login',
        '/signUp',
        '/profile/:path*'  // 🛡️ Protect /profile and any nested paths
    ]
}