import React from 'react'
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { Input } from 'antd';
import CustomButton from './CustomButton';

const Subscribe = () => {
    return (
        <Grid container className="partner__signup">
            <Grid size={{ xs: 12, md: 4.8 }}>
                <Typography variant='h4'>Sign up for our Newsletter to receive news and updates.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4.8 }}>
                <form action="submit">
                    <Input type="email" placeholder='Enter email address' />
                    <CustomButton orange>Subscribe</CustomButton>
                </form>
            </Grid>
        </Grid>
    )
}

export default Subscribe