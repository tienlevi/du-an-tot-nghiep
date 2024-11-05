import Loader from "@/utils/Loader";
import React, { lazy } from "react";
export const HomePage = lazy(()=> import('@/pages/Client/HomePage/Homepage')) 


export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};