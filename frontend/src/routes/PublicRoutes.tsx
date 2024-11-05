import MainLayout from "@/layouts/Mainlayout/MainLayout"
import Homepage from "@/pages/Client/HomePage/Homepage"
import NotFound from "@/pages/Client/NotFound"
import { Suspense } from "react"
import { Navigate } from "react-router"

const PublicRoutes = [
    {
        path: '/',
        element: (
            <MainLayout/>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <Homepage/>
                    </Suspense>
                )
            }
        ]
    },
    {path: '*', element: <Navigate to={'/404'}/>},
    {path: '/404', element: <NotFound/>}
]

export default PublicRoutes