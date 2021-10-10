import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function Router() {
    return useRoutes([
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate replace to="/week" /> },
                { path: 'week', element: <Dashboard /> },
                { path: 'week/:firstDay', element: <Dashboard /> },
                { path: '*', element: <NotFound /> },
            ],
        },
    ]);
}

export default Router;
