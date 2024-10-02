import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import CustomButton from '../../Home/components/CustomButton'
import legoCard from '../../../assets/lego-card1.png'

const LegoCard1 = () => {
    return (
        <Grid container className="lego__card">
            <Grid size={{ xs: 12, md: 5.6 }}>
                <Typography variant='h4'>FIRST® LEGO® League guides youth through STEM learning and exploration at an early age. </Typography>
                <Typography>From Discover, to Explore, and then to Challenge, students will understand the basics of STEM and apply their skills in an exciting competition while building habits of learning, confidence, and teamwork skills along the way.</Typography>
                <CustomButton orange bold>Let's go!</CustomButton>
            </Grid>
            <Grid size={{ xs: 12, md: 5.4 }}>
                <img src={legoCard} alt="" />
            </Grid>
        </Grid>
    )
}

export default LegoCard1