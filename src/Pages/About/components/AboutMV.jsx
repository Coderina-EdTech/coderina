import { Box, CardContent, Paper, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import Plant from '../../../assets/plant.png'
import Load from '../../../assets/loading.png'
import Repeat from '../../../assets/repeat.png'
import Safe from '../../../assets/safe.png'
import Locate from '../../../assets/loacation.png'
import Smile from '../../../assets/smile.png'
import Bulb from '../../../assets/bulb.png'
import Tool from '../../../assets/tool.png'


const AboutMV = () => {
    const mvCard = [
        {
            item: "Our Mission",
            details: [
                {
                    icon: Plant,
                    span: "Give back and leave a lasting footprint ",
                    text: "in every community we serve, creating a ripple effect of positive change."
                },
                {
                    icon: Load,
                    span: "Challenge the limits of what is possible, ",
                    text: "constantly pushing boundaries to achieve better educational outcomes. "
                },
                {
                    icon: Repeat,
                    span: "Create and nurture a self-sustaining ecosystem ",
                    text: "where students, educators, and professionals can thrive independently."
                },
                {
                    icon: Safe,
                    span: "Reduce hunger and poverty ",
                    text: "through education and entrepreneurial skills, building resilient communities."
                },
            ]
        },
        {
            item: "Our Vision",
            details: [
                {
                    icon: Locate,
                    span: "Influence positive changes within the education sector, ",
                    text: "shaping future generations through innovative learning solutions."
                },
                {
                    icon: Smile,
                    span: "Bring fun into learning, ",
                    text: "making education engaging and interactive for students of all ages."
                },
                {
                    icon: Bulb,
                    span: "Empower teachers with 21st-century learning pedagogy, ",
                    text: "equipping them with the tools they need to deliver impactful lessons."
                },
                {
                    icon: Tool,
                    span: "Empower adults with the right learning and entrepreneurship tools, ",
                    text: "ensuring lifelong learning and business opportunities for all."
                },
            ]
        }
    ]

    return (
        <Box>
            <Grid container className="mvCard__container">
                {mvCard.map((mv, i) => (
                    <Grid key={i} size={{ xs: 12, md: 12 }}>
                        <Typography variant='h4'>{mv.item}</Typography>
                        <Grid container className="mv__card">
                            {mv.details.map((detail, i) => (
                                <Grid key={i} size={{ xs: 12, md: 12 }}>
                                    {/* <CardContent> */}
                                    <Paper elevation={0}>
                                        <img src={detail.icon} alt="" />
                                    </Paper>
                                    {/* <Typography fontSize={{ xs: "18px", md: "8px" }}><Typography component={"span"}>{detail.span}</Typography>{detail.text}</Typography> */}
                                    {/* </CardContent> */}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default AboutMV