import { Box, CardContent, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Slider from 'react-slick'
import personStar from "../../../assets/person-star.svg"
import smile from "../../../assets/smile.svg"
import robot from "../../../assets/robot.svg"
import plant from "../../../assets/plant.svg"
import gSmile from "../../../assets/green-smile.png"
import gPerson from "../../../assets/green-person.png"
import gBank from "../../../assets/green-bank.png"
import gHandShake from "../../../assets/green-shake.png"
import gBill from "../../../assets/green-bill.png"

const ImpactSlider = ({ lego }) => {
    const impactNums = [
        {
            number: "28,372",
            text: <>Number of <br />Students trained</>,
            img: gSmile,
        },
        {
            number: "7,362",
            text: <>Number of <br /> Teachers trained</>,
            img: gPerson,
        },
        {
            number: "12",
            text: "Number of Governments & Ministry Relationships",
            img: gBank,
        },
        {
            number: "16",
            text: <>Number of <br />Partnerships </>,
            img: gHandShake,
        },
        {
            number: "64",
            text: <>New Businesses <br /> Incubated</>,
            img: gBill,
        }
    ]

    const legoImpact = [
        {
            number: "5,600",
            text: "Teachers trained",
            img: personStar,
        },
        {
            number: "12,749",
            text: "Students Impacted",
            img: smile,
        },
        {
            number: "1,185",
            text: "Robots Built",
            img: robot,
        },
        {
            number: "26",
            text: "Projects Incubated",
            img: plant,
        },
    ]

    let settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    if (lego) return (
        <Container maxWidth="lg">
            <Box overflow={"hidden"} className='impact__carousel' >
                <Slider {...settings} slidesToShow={4}>
                    {legoImpact.map((slide, index) => (
                        <CardContent key={index} className='impact__card'
                            sx={{
                                bgcolor: "#FFF9F0",
                                borderRight: "1px solid #E69F22",
                                height: { xs: "26vh", md: "34vh" }
                            }}>
                            <Box width={{ xs: "12px", md: "24px" }} component={"img"} src={slide.img} alt="" />
                            <Stack>
                                <Typography variant='h4' fontSize={{ xs: "40px", md: "50px" }}>{slide.number}</Typography>
                                <Typography fontSize={{ xs: "14px", md: "16px" }}>{slide.text}</Typography>
                            </Stack>
                        </CardContent>
                    ))}
                </Slider>
            </Box>
        </Container>
    )
    return (
        <Box overflow={"hidden"} className='impact__carousel' border={"1px solid #14B96C"} >
            <Slider {...settings} slidesToShow={5}>
                {impactNums.map((slide, index) => (
                    <CardContent key={index} className='impact__card'
                        sx={{
                            bgcolor: "#ADF7D4",
                            borderRight: "1px solid #14B96C",
                            height: { xs: "26vh", md: "36vh" },
                        }}>
                        <Box width={{ xs: "16px", md: "24px" }} component={"img"} src={slide.img} alt="" />
                        <Stack>
                            <Typography variant='h4' fontSize={{ xs: "40px", md: "48px" }}>{slide.number}</Typography>
                            <Typography fontSize={{ xs: "14px", md: "16px" }}>{slide.text}</Typography>
                        </Stack>
                    </CardContent>
                ))}
            </Slider>
        </Box>
    )
}

export default ImpactSlider