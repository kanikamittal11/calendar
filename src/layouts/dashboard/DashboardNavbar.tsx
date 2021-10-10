import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Toolbar, Button } from '@mui/material';
import logo from '../../logo.svg';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

const AppBar = styled('div')({
    padding: '8px',
});

const Heading = styled('div')({
    color: '#3c4043',
    fontSize: '22px',
    paddingRight: '50px',
});

const formatDate = (date: Dayjs) => date.format('YYYY-MM-DD').toString();

function TodayButton() {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => navigate('/week')}
            size="small"
            style={{ fontSize: '14px', textTransform: 'none' }}
            variant="outlined"
        >
            Today
        </Button>
    );
}

function BackButton() {
    const { firstDay } = useParams();
    const navigate = useNavigate();
    const changedDay = formatDate(dayjs(firstDay).subtract(1, 'week'));
    return (
        <IconButton aria-label="back" onClick={() => navigate(`/week/${changedDay}`)} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
    );
}

function ForwardButton() {
    const { firstDay } = useParams();
    const navigate = useNavigate();
    const changedDay = formatDate(dayjs(firstDay).add(1, 'week'));
    return (
        <IconButton
            aria-label="forward"
            onClick={() => navigate(`/week/${changedDay}`)}
            size="small"
        >
            <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
    );
}

const getMonth = () => {
    // if no firstDay param set default as today
    const { firstDay = formatDate(dayjs()) } = useParams();
    return dayjs(firstDay).format('MMMM YYYY');
};

function DashboardNavbar() {
    return (
        <AppBar>
            <Toolbar>
                <Box component="img" src={logo} sx={{ width: 50 }} />
                <Heading>Calendar</Heading>
                <Stack alignItems="center" direction="row" spacing={2}>
                    <TodayButton />
                    <BackButton />
                    <ForwardButton />
                    <Heading>{getMonth()}</Heading>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default DashboardNavbar;
