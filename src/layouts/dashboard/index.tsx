import React from 'react';
import { styled } from '@mui/material/styles';
import DashboardNavbar from './DashboardNavbar';
import { Outlet } from 'react-router-dom';
import Divider from '@mui/material/Divider';

const RootStyle = styled('div')({
    minHeight: '100%',
    overflow: 'hidden',
});

const MainStyle = styled('div')({
    padding: '8px',
});

export default function DashboardLayout() {
    return (
        <RootStyle>
            <DashboardNavbar />
            <Divider variant="middle" />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
}
