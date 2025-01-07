import { Box, Container } from '@mui/material'
import React from 'react'
// import  from '../../utils/constants'
import Upcoming from './components/Upcoming'
import Activity from './components/Activity'
import News from './components/News'
import Partners from './components/Partners'
import Footer from './components/Footer'
import Experience from './components/Experience'
import { blackCard, blackColor, blueColor, greenBg, headerBackground, pinkBg, whiteColor } from '../../utils/constants'
import Header from './components/Header'
import AboutSection from './components/AboutSection'

const Home = () => {
    const homeContents1 = [
        // {
        //     color: headerBackground,
        //     section: <Header />
        // },
        {
            // color: greenBg,
            section: <AboutSection />
        },
        {
            color: blackCard,
            section: <Upcoming />
        },
        {
            // color: blueColor,
            section: <Activity />
        },
        {
            color: whiteColor,
            section: <News />
        },
        {
            color: whiteColor,
            section: <Experience />
        },
        {
            color: headerBackground,
            section: <Partners />
        },
        {
            color: blackColor,
            section: <Footer />
        }
    ]


    return (
        <Box overflow={"hidden"}>
            <Box bgcolor={headerBackground}>
                <Header />
            </Box>
            {homeContents1.map(({ color, section }) => (
                <Box p={4} key={section} bgcolor={color}>
                    <Container maxWidth="xl">
                        {section}
                    </Container>
                </Box>
            ))}
        </Box>
    )
}

export default Home