import React from 'react'
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import CustomButton from '../../Home/components/CustomButton';
import legoCard from '../../../assets/lego-card2.png'

const LegoCard2 = () => {
    return (
        <Grid container className="lego__card">
            <Grid size={{ xs: 12, md: 5.4 }}>
                <img src={legoCard} alt="" />
            </Grid>
            <Grid size={{ xs: 12, md: 5.6 }}>
                <Typography variant='h4'>A chance to shine!</Typography>
                <Typography>Each FIRST LEGO League season culminates with a celebration where teams show off what they learned and invented, and in our oldest division, compete with their robots.</Typography>
                <Typography> Some teams earn an invitation to FIRST LEGO League World Festival as part of FIRST Championship Houston or FIRST Championship Detroit, where teams from all over the world meet and compete.</Typography>
                <CustomButton bold>Get Started</CustomButton>
            </Grid>
        </Grid>
    )
}

export default LegoCard2