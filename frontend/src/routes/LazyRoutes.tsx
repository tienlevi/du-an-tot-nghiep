import Loader from "@/utils/Loader";
import React, { lazy } from "react";
export const HomePage = lazy(()=> import('@/pages/Client/HomePage/Homepage')) 
export const LoginPage = lazy(()=> import('@/pages/Client/Auth/Login'))
export const RegisterPage = lazy(()=> import('@/pages/Client/Auth/Register'))

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};