import { Box, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import scopeImg1 from "../../../assets/scope-img1.png"
import scopeImg2 from "../../../assets/scope-img2.png"
import scopeImg3 from "../../../assets/scope-img3.png"
import scopeImg4 from "../../../assets/scope-img4.png"
import SolutionCards from '../../components/SolutionCards';

const Scope = () => {
    const scopeCards = [
        {
            img: scopeImg1,
            text: 'Influence changes within the education sector',
        },
        {
            img: scopeImg2,
            text: <>Bring fun into learning. <br /> Learn & Play</>,
        },
        {
            img: scopeImg3,
            text: 'Empower teachers with 21st century learning pedagogy',
        },
        {
            img: scopeImg4,
            text: 'Empower adults with the right learning and entrepreneurship tools.',
        },

    ]

    return (
        <Box className="scope__container">
            <Typography variant='h4' fontSize={{ xs: "24px", md: "55px" }}> Scope of our work</Typography>
            <Grid container className="news__cards">
                {scopeCards.map((scopeCard, i) => (
                    <SolutionCards key={i} {...scopeCard} />
                ))}
            </Grid>
        </Box>
    )
}

export default Scope