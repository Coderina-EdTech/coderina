import { Box, Container } from '@mui/material'
import React from 'react'
import { blackCard, greenCard2, pinkBgR, whiteColor } from '../../utils/constants'
import AboutHeader from './components/AboutHeader'
import AboutImpact from './components/AboutImpact'
import AboutMV from './components/AboutMV'
import CoreValues from './components/CoreValues'

const AboutUs = () => {
    const aboutContent = [
        {
            color: whiteColor,
            section: <AboutHeader />
        },
        {
            color: greenCard2,
            section: <AboutImpact />
        },
        {
            color: pinkBgR,
            section: <AboutMV />
        },
        {
            color: blackCard,
            section: <CoreValues />
        },
    ]

    return (
        <Box className="about__us">
            {aboutContent.map(({ color, section }) => (
                <Box p={4} key={section} bgcolor={color}>
                    <Container maxWidth="xl">
                        {section}
                    </Container>
                </Box>
            ))}
        </Box>
    )
}

export default AboutUs