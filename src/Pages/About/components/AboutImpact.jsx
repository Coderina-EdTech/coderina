import { Box, Typography } from '@mui/material'
import React from 'react'
import ImpactSlider from './ImpactSlider'

const AboutImpact = () => {
    return (
        <Box className="aboutImpact__container">
            <Typography variant='h4' fontSize={{ xs: "30px", md: "40px" }}>Our impact so far</Typography>
            <ImpactSlider />
        </Box>
    )
}

export default AboutImpact