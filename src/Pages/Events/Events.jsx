import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import EventBody from './components/EventBody'
import { blackColor, pinkBg } from '../../utils/constants'
import Partners from '../Home/components/Partners'
import Footer from '../Home/components/Footer'

const Events = () => {
    const eventContent = [
        {
            color: pinkBg,
            section: <EventBody />
        },
        {
            color: pinkBg,
            section: <Partners />
        },
        {
            color: blackColor,
            section: <Footer />
        }
    ]

    return (
        <>
            {eventContent.map(({ color, section }) => (
                <Box p={4} key={section} bgcolor={color}>
                    <Container maxWidth="xl">
                        {section}
                    </Container>
                </Box>
            ))}
        </>
    )
}

export default Events