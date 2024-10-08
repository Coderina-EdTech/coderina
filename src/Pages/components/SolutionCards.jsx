import React from 'react'
import Grid from '@mui/material/Grid2';
import { Card, CardMedia, Typography } from '@mui/material';


const SolutionCards = ({ img, text, childern, childern1, childern2 }) => {
    return (
        <Grid size={{ xs: 12, sm: 5.8, md: 2.85 }} key={text}>
            <Card sx={{ borderRadius: {} }}>
                <CardMedia component={"img"} image={img} width={"320px"} />
            </Card>
            <Typography>{childern}</Typography>
            <Typography>{childern1}</Typography>
            <Typography>{text}</Typography>
            <Typography>{childern2}</Typography>
        </Grid>
    )
}

export default SolutionCards