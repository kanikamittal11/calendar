import React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';

function NotFound() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Container maxWidth="xs">
                <Box sx={{ pb: 5 }}>
                    <Typography align="center" variant="h6">
                        Page not found
                    </Typography>
                </Box>
                <Grid container spacing={3} />
            </Container>
        </Box>
    );
}

export default NotFound;
