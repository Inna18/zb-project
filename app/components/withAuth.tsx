'use client';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

const authRoutes = ['/myPage', '/cart', '/logout'];
const noAuthRoutes = ['/login', '/signup'];

export default function withAuth(Component: any) {
    return function withAuth(props: any) {
        const session = useSession();
        console.log("session: ", session)

        useEffect(() => {
            if (session.status === 'unauthenticated') {
                redirect("/");
            }
        }, [session]);

        if (session.status === 'unauthenticated') {
            return null;
        }

        return <Component {...props}/>
        
    }
}

