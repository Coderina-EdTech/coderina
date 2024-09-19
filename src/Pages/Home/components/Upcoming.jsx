import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { RiArrowRightLine } from "react-icons/ri";
import { RiArrowLeftLine } from "react-icons/ri";
import UpSlider from './UpSlider';


const Upcoming = () => {
    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
    };


    const previous = () => {
        sliderRef.slickPrev();
    };

    return (
        <Box className="upcomingSec__Container sec__container">
            <Stack className='upcomingSec__header'>
                <Typography variant="h5">Upcoming Events</Typography>
                <Stack>
                    <IconButton onClick={previous}><RiArrowLeftLine /></IconButton>
                    <IconButton onClick={next}><RiArrowRightLine /></IconButton>
                </Stack>
            </Stack>
            <UpSlider
                slider={slider => {
                    sliderRef = slider
                }}
            />
        </Box>
    )
}

export default Upcoming