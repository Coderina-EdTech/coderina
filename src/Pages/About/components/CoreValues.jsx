import { Box, Card, CardContent, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const CoreValues = () => {
    const coreValues = [
        {
            title: "Core values we stand by",
            value1: [
                {
                    bgColor: "#FAD9A0",
                    color: "#7A4F03",
                    text: "Innovation"
                },
                {
                    bgColor: "#D3F8E7",
                    color: "#0E824C",
                    text: "State of the art"
                },
                {
                    bgColor: "#C8F0FE",
                    color: "#0C7BA3",
                    text: "Dedication"
                },
            ],
            value2: [
                {
                    bgColor: "#FAD9A0",
                    color: "#7A4F03",
                    text: "Affordability"
                },
                {
                    bgColor: "#FFF0F0",
                    color: "#ED3237",
                    text: "Civil Responsibility"
                },
                {
                    bgColor: "#D3F8E7",
                    color: "#0E824C",
                    text: "Integrity"
                },
                {
                    bgColor: "#C8F0FE",
                    color: "#0C7BA3",
                    text: "Quality"
                },
            ],
            value3: [
                {
                    bgColor: "#FAD9A0",
                    color: "#7A4F03",
                    text: "Parnership"
                },
                {
                    bgColor: "#D3F8E7",
                    color: "#0E824C",
                    text: "Hospitality"
                },
                {
                    bgColor: "#C8F0FE",
                    color: "#0C7BA3",
                    text: "Excellence"
                },
            ]
        }
    ]

    return (
        <Box>
            <Card className="cv__container">
                {coreValues.map((cv, i) => (
                    <CardContent key={i}>
                        <Stack width={{ xs: "100%", md: "30%" }}>
                            <Typography variant='h3' fontSize={{ xs: "30px", md: "40px" }}>{cv.title}</Typography>
                        </Stack>
                        <Stack className='core__values'>
                            <Stack gap={{ xs: ".5em", md: "1em" }}>
                                {cv.value1.map((v) => (
                                    <Paper key={v} sx={{ bgcolor: v.bgColor }}><Typography fontSize={{ xs: "6px", md: "17px" }} color={v.color}>{v.text}</Typography></Paper>
                                ))}
                            </Stack>
                            <Stack gap={{ xs: ".5em", md: "1em" }}>
                                {cv.value2.map((v) => (
                                    <Paper key={v} sx={{ bgcolor: v.bgColor }}><Typography fontSize={{ xs: "6px", md: "17px" }} color={v.color}>{v.text}</Typography></Paper>
                                ))}
                            </Stack>
                            <Stack gap={{ xs: ".5em", md: "1em" }}>
                                {cv.value3.map((v) => (
                                    <Paper key={v} sx={{ bgcolor: v.bgColor }}><Typography fontSize={{ xs: "6px", md: "17px" }} color={v.color}>{v.text}</Typography></Paper>
                                ))}
                            </Stack>
                        </Stack>
                    </CardContent>
                ))}
            </Card>
        </Box>
    )
}

export default CoreValues