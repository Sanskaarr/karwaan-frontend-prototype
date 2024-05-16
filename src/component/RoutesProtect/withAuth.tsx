'use client'
import {redirect} from 'next/navigation';
import {useEffect} from 'react';
export default function withAuth(Component :any){
    return function withAuth(props:any){
        useEffect(()=>{
        var token =JSON.parse(localStorage.getItem("user")as string)?.token;
        if(!token){
            redirect("/signup");
        }
    },[]);
    if(typeof(window)!=="undefined"&& !JSON.parse(localStorage.getItem("user")as string)?.token){
        return null;
    }
    return <Component {...props}/>
    }
}