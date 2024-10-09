import { Box, CardContent, Paper, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';


const AboutMV = () => {
    const mvCard = [
        {
            item: "Our Mission",
            detail: "At Coderina, our mission is to empower Africa's youth by fostering digital literacy, innovation, and entrepreneurship."
        },
        {
            item: "Our Vision",
            detail: "A digitally inclusive Africa where every young person has the opportunity to innovate, create, and transform their communities through technology and entrepreneurship."
        }
    ]

    return (
        <Box>
            <Grid container className="mv__card">
                {mvCard.map((mv, i) => (
                    <Grid key={i} size={{ xs: 12, md: 5.8 }}>
                        <CardContent>
                            <Paper elevation={2}>{mv.item}</Paper>
                            <Typography fontSize={{ xs: "20px", md: "28px" }}>{mv.detail}</Typography>
                        </CardContent>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default AboutMV