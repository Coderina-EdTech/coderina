import { Box, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import Slider from 'react-slick'
import greenBolt from "../../../assets/green-bolt.png"

const ImpactSlider = () => {
    const impactNums = [
        {
            number: "28,372",
            text: <>Number of <br />Students trained</>
        },
        {
            number: "7,362",
            text: <>Number of <br /> Teachers trained</>
        },
        {
            number: "12",
            text: "Number of Governments & Ministry Relationships"
        },
        {
            number: "16",
            text: <>Number of <br />Partnerships </>
        },
        {
            number: "64",
            text: <>New Businesses <br /> Incubated</>

        }
    ]

    let settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
    }

    return (
        <Box overflow={"hidden"} className='impact__carousel' >
            <Slider {...settings}>
                {impactNums.map((slide, index) => (
                    <CardContent key={index} className='impact__card'>
                        <img src={greenBolt} alt="" />
                        <Stack>
                            <Typography variant='h3'>{slide.number}</Typography>
                            <Typography>{slide.text}</Typography>
                        </Stack>
                    </CardContent>
                ))}
            </Slider>
        </Box>
    )
}

export default ImpactSlider