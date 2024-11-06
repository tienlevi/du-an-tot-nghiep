import MainLayout from "@/layouts/Mainlayout/MainLayout"
import NotFound from "@/pages/Client/NotFound"
import { Navigate } from "react-router"
import { HomePage, Suspense } from "./LazyRoutes"

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
                        <HomePage/>
                    </Suspense>
                )
            }
        ]
    },
    {path: '*', element: <Navigate to={'/404'}/>},
    {path: '/404', element: <NotFound/>}
]

export default PublicRoutes