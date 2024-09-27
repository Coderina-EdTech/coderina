import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import sap from "../../../assets/Sap.png"
import first from "../../../assets/First.png"
import cater from "../../../assets/Caterpillar.png"
import dow from "../../../assets/Dow.png"
import fme from "../../../assets/FME.png"
import lego from "../../../assets/Lego.png"
import legoi from "../../../assets/lego-icon.png"
import ford from "../../../assets/Ford.png"
import nln from "../../../assets/NLN.png"
import nitda from "../../../assets/NITDA.png"
import uol from "../../../assets/UOL.png"
import CustomButton from './CustomButton'
import Grid from '@mui/material/Grid2';
import Subscribe from './Subscribe'
import Resources from '../../FirstLego/components/Resources'


const Partners = ({ sponsor }) => {

    const partnerLogos = [sap, first, cater, dow, fme, lego, ford, nln, nitda, uol]

    const legoLogos = [sap, first, legoi, lego]

    if (sponsor) return (
        <Box className="partner__container sec__container">
            {/* <Resources /> */}
            <Stack className='partner__card'>
                <Grid container sx={{ p: "0 8em" }}>
                    {legoLogos.map((logo) => (
                        <Grid key={logo} size={{ xs: 12, md: 2 }}>
                            <img src={logo} alt="Partner logo" />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <Subscribe />
        </Box>
    )
    else return (
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
            <Subscribe />
        </Box>
    )
}

export default Partners