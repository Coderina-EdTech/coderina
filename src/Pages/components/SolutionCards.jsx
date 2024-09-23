import React from 'react'
import Grid from '@mui/material/Grid2';
import { Card, CardMedia, Typography } from '@mui/material';


const SolutionCards = ({ img, text, childern, childern2 }) => {
    return (
        <Grid size={{ xs: 12, md: 2.85 }} key={text}>
            <Card>
                <CardMedia component={"img"} image={img} width={"320px"} />
            </Card>
            <Typography>{childern}</Typography>
            <Typography>{text}</Typography>
            <Typography>{childern2}</Typography>
        </Grid>
    )
}

export default SolutionCards