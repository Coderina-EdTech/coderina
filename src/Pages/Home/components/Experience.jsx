import { Box, Card, CardContent, CardMedia, Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React from 'react'
import CustomButton from './CustomButton';
import expCard1 from "../../../assets/experience-card1.png"
import expCard2 from "../../../assets/experience-card2.png"
import { greenBgL, pinkBgR } from '../../../utils/constants';

const Experience = () => {
    const expCard = [
        {
            title: "Bring the STEAM Experience to Your Next Celebration!",
            text: ["Looking for something different to celebrate your child's birthday? Coderina provides a totally unique party experience with interactive elements that really engage the kids."],
            textType: "span",
            button: "Contact us",
            buttonType: true,
            weight: true,
            color: pinkBgR,
            image: expCard1
        },
        {
            title: "Our Job Readiness Programs",
            text: [
                "Full Stack Web design (6 Months)",
                "Zero - Full Stack App Development",
                "JAVA, HTML and Python",
                "Software Testing and Certification",
                "Mentoring"
            ],
            textType: "li",
            button: "Register",
            color: greenBgL,
            image: expCard2
        },

    ]

    return (
        <Box className="exp__container">
            <Grid container>
                {expCard.map((card, i) => (
                    <Grid key={i} bgcolor={card.color} size={{ xs: 12, md: 6 }}>
                        <Container maxWidth={"sm"} className='exp__card'>
                            <Stack>
                                <Typography variant='h4' fontSize={{ xs: "20px", md: "32px" }}>{card.title}</Typography>
                                <Stack>
                                    {card.text.map((t, i) => (
                                        <Typography fontSize={{ xs: "14px", md: "18px" }} component={card.textType} key={i}>{t}</Typography>
                                    ))}
                                </Stack>
                                <CustomButton orange={card.buttonType} bold={card.weight}>{card.button}</CustomButton>
                            </Stack>
                            <Card>
                                <CardMedia component="img" image={card.image} />
                            </Card>
                        </Container>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Experience









{/* <Grid bgcolor={"red"} size={{ xs: 12, md: 6 }}>
        <Stack>
        <Typography></Typography>
            <Typography></Typography>
            </Stack>
            <CustomButton></CustomButton>
            <Card>
            <CardMedia component="img" image='' />
            </Card>
            </Grid>
            <Grid bgcolor={"green"} size={{ xs: 12, md: 6 }}>
            <Container maxWidth="sm">dd</Container>
            </Grid> */}