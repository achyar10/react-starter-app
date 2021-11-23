import { lazy } from 'react'

const routes = [
    { 
        path: '/', 
        exact: true, 
        name: 'Home' 
    },
    { 
        path: '/dashboard', 
        name: 'Dashboard', 
        component: lazy(() => import('../pages/dashboard'))
    },
]

export default routes
