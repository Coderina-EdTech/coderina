import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import CustomButton from './CustomButton'
import { FaArrowRightLong } from "react-icons/fa6";
import newsImg1 from "../../../assets/newsImg1.png"
import newsImg2 from "../../../assets/newsImg2.png"
import newsImg3 from "../../../assets/newsImg3.png"
import newsImg4 from "../../../assets/newsImg4.png"
import newsLgImg from "../../../assets/news-ImgLg.png"
import SolutionCards from '../../components/SolutionCards';


const News = () => {
    const newsCard = [
        {
            img: newsImg1,
            text: "Africa Code Week: Empowering Educators and Youth for a Digital Future"
        },
        {
            img: newsImg2,
            text: "Nigeria Embraces the Future: Robotics and AI in Basic Education"
        },
        {
            img: newsImg3,
            text: "Introducing the First Lego League Challenge Masterpiece",
        },
        {
            img: newsImg4,
            text: "Educating the Educators: Coderina's FIRST LEGO League (FLL) Explore and Discover Workshop in Nigeria"
        }
    ]

    const newsLgCard = [
        "Opening Hours: Monday to Friday 9:00 AM - 5:00 PM",
        "High-Speed Internet Service",
        "Co office space / Co-working space",
        "Serviced Office / Office Rental Meeting",
        "Venue / Seminar / Workshop"
    ]

    return (
        <Box className="news__container sec__container">
            <Stack className="news__header">
                <Stack>
                    <Typography variant='h6'>News & Updates</Typography>
                    <CustomButton orange >View all <FaArrowRightLong /></CustomButton>
                </Stack>
                <Grid container className="news__cards">
                    {newsCard.map((cardInfo, i) => (
                        <SolutionCards key={i} {...cardInfo}
                            childern={
                                <Typography>Sep 2, 2023</Typography>
                            }
                        />
                    ))}
                </Grid>
            </Stack>
            <Stack className="news__lgCard">
                <Grid container>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant='h4'>Looking for a co-working space or where to host your meeting or training?</Typography>
                        <Stack>
                            {newsLgCard.map((list) => (
                                <Typography component={"li"} key={list}>{list}</Typography>
                            ))}
                        </Stack>
                        <Stack>
                            <CustomButton>Book Space</CustomButton>
                            <CustomButton orange>Book STEAM Classes</CustomButton>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box component={"img"} src={newsLgImg} />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}

export default News