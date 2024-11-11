import MainLayout from "@/layouts/Mainlayout/MainLayout"
import NotFound from "@/pages/Client/NotFound"
import { Navigate } from "react-router"
import { HomePage, LoginPage, RegisterPage, Suspense } from "./LazyRoutes"

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
            },
            {
                path: '/login',
                element: (
                    <Suspense>
                        <LoginPage/>
                    </Suspense>
                )
            },
            {
                path: '/register',
                element: (
                    <Suspense>
                        <RegisterPage/>
                    </Suspense>
                )
            }
        ]
    },
    {path: '*', element: <Navigate to={'/404'}/>},
    {path: '/404', element: <NotFound/>}
]

export default PublicRoutes