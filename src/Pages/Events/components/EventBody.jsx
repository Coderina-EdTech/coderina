import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { AiOutlineCalendar } from "react-icons/ai";
import { TbClockHour3 } from "react-icons/tb";
import { Search } from '@mui/icons-material';
import Input from 'antd/es/input/Input';

const EventBody = () => {
    const upCard = [
        {
            color: "#9AEFC7",
            date: "Jul 27, 2021",
            title: "STEAM Classes",
            time: "8:00 am - 5:00 pm",
            location: "National Library of Nigeria Plot 274, Central Business District,, Abuja Book Classes here https://coderina.org/SCHEDULE/",
        },
        {
            color: "#A6E5FC",
            date: "Aug 3, 2020",
            time: "8:00 am - 5:00 pm",
            title: "Job Readiness Programme",
            location: "Online Online",
        },
        {
            color: "#A6E5FC",
            date: "Jul 27, 2020 - Sep 30, 2021",
            time: "8:00 am - 5:00 pm",
            title: "CPPD for Teachers",
            location: "Online Online",
        },
        {
            color: "#A6E5FC",
            date: "Aug 3, 2020",
            time: "8:00 am - 5:00 pm",
            title: "Job Readiness Programme",
            location: "Online Online",
        },
    ]


    return (
        <Box className="header__container">
            <Stack className='event__upcoming'>
                <Typography variant='h4'>Upcoming Events</Typography>
                <form action="submit">
                    <Input type='text' prefix={<Search />} placeholder='Search for event' />
                </form>
            </Stack>
            <Grid container justifyContent={"space-between"} gap={2.2}>
                {upCard.map((card, i) => (
                    <Grid key={i} size={{ xs: 12, md: 5.9 }}>
                        <Card className='event__card'>
                            <CardContent>
                                <Stack className='event__grid'>
                                    <Stack bgcolor={card.color}></Stack>
                                    <Stack>
                                        <Stack color={card.color}>
                                            <Typography><AiOutlineCalendar />{card.date}</Typography>
                                            <Typography><TbClockHour3 />{card.time}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography variant="h6">{card.title}</Typography>
                                            <Typography>{card.location}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default EventBody