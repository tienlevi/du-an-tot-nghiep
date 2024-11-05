import MainLayout from "@/layouts/Mainlayout/MainLayout"
import Homepage from "@/pages/Client/HomePage/Homepage"
import NotFound from "@/pages/Client/NotFound"
import { Suspense } from "react"

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
    {path: '*', element: <NotFound/>}
]

export default PublicRoutes