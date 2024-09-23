import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import newsImg1 from "../../../assets/newsImg1.png"
import newsImg2 from "../../../assets/newsImg2.png"
import newsImg3 from "../../../assets/newsImg3.png"
import newsImg4 from "../../../assets/newsImg4.png"
import SolutionCards from '../../components/SolutionCards';

const MediaBody = () => {
    const newsArticles = [
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
        },
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
        },
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
        },
    ]

    return (
        <Box mt={13} className='media__container'>
            <Stack>
                <Typography variant='h4'>Media</Typography>
                <Stack>
                    <Button variant='contained' sx={{ bgcolor: "white" }}>News Articles</Button>
                    <Button>Publications</Button>
                    <Button>Gallery</Button>
                </Stack>
            </Stack>
            <Grid container className="news__cards">
                {newsArticles.map((newArticle, i) => (
                    <SolutionCards key={i} {...newArticle}
                        childern={"Sep 2, 2023"}
                    />
                ))}
            </Grid>
        </Box>
    )
}

export default MediaBody