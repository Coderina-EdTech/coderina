import React from 'react'
import Grid from '@mui/material/Grid2';
import { Stack, Typography } from '@mui/material';
import { Input } from 'antd';
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';

const Subscribe = ({ register, link }) => {
    if (register) return (
        <Stack className="partner__signup" direction={"row"} p={4}>
            <Typography>Fill out the form to register</Typography>
            <Link to={link}><CustomButton bold disabled>Get Started</CustomButton></Link>
        </Stack>
    )
    else return (
        <Grid container className="partner__signup" p={5}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='h4' fontSize={{ xs: "20px", md: "28px" }}>Sign up for our Newsletter to receive news and updates.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4.8 }}>
                <form action="submit">
                    <Input type="email" placeholder='Enter email address' />
                    <CustomButton orange bold>Subscribe</CustomButton>
                </form>
            </Grid>
        </Grid>
    )
}

export default Subscribe