import { Box, Container } from '@mui/material'
import React from 'react'
import LegoHeader from './components/LegoHeader'
import { blackColor, pinkBg, pinkBgR, whiteColor } from '../../utils/constants'
import Footer from '../Home/components/Footer'
import Partners from '../Home/components/Partners'
import LegoCard1 from './components/LegoCard1'
import LegoCard2 from './components/LegoCard2'
import LegoPrograms from './components/LegoPrograms'
import LegoImpact from './components/LegoImpact'
import LegoCard3 from './components/LegoCard3'
import Resources from './components/Resources'

const FirstLego = () => {
    const legoContent = [
        {
            color: whiteColor,
            section: <LegoHeader />
        },
        {
            color: pinkBgR,
            section: <LegoCard1 />
        },
        {
            color: pinkBg,
            section: <LegoCard2 />
        },
        {
            section: <LegoPrograms />
        },
        {
            color: pinkBgR,
            section: <LegoImpact />
        },
        {
            color: pinkBg,
            section: <LegoCard3 />
        },
        {
            section: <Partners sponsor />
        },
        {
            color: blackColor,
            section: <Footer />
        }
    ]


    return (
        <Box className="first__lego">
            {legoContent.map(({ color, section }) => (
                <Box p={4} key={section} bgcolor={color}>
                    <Container maxWidth="xl">
                        {section}
                    </Container>
                </Box>
            ))}
        </Box>
    )
}

export default FirstLego

// https://youtu.be/i52coAkhX8g