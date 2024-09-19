import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import sap from "../../../assets/Sap.png"
import first from "../../../assets/First.png"
import cater from "../../../assets/Caterpillar.png"
import dow from "../../../assets/Dow.png"
import fme from "../../../assets/FME.png"
import lego from "../../../assets/Lego.png"
import ford from "../../../assets/Ford.png"
import nln from "../../../assets/NLN.png"
import nitda from "../../../assets/NITDA.png"
import uol from "../../../assets/UOL.png"
import CustomButton from './CustomButton'
import Grid from '@mui/material/Grid2';
import { Input } from 'antd'


const Partners = () => {
    const partnerLogos = [sap, first, cater, dow, fme, lego, ford, nln, nitda, uol]

    return (
        <Box className="partner__container sec__container">
            <Typography variant='h6'>Our Partners</Typography>
            <Stack className='partner__card'>
                <Grid container>
                    {partnerLogos.map((logo) => (
                        <Grid key={logo} size={{ xs: 12, md: 1.6 }}>
                            <img src={logo} alt="Partner logo" />
                        </Grid>
                    ))}
                </Grid>
                <Stack>
                    <CustomButton>Partner with us</CustomButton>
                    <CustomButton>Become a Sponsor</CustomButton>
                </Stack>
            </Stack>
            <Grid container className="partner__signup">
                <Grid size={{ xs: 12, md: 4.8 }}>
                    <Typography variant='h4'>Sign up for our Newsletter to receive news and updates.</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4.8 }}>
                    <form action="submit">
                        <Input type="email" placeholder='Enter email address' />
                        <CustomButton orange>Subscribe</CustomButton>
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Partners