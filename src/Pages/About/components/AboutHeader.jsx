import { Box, Button, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

const AboutHeader = () => {
    return (
        <Box component={"header"} className='about__header'>
            <Stack>
                <Stack>
                    <Button variant='outlined' sx={{ fontSize: { xs: "12px", md: "14px" }, whiteSpace: "nowrap" }}>About us</Button>
                    <Stack>
                        <Typography variant='h4' fontSize={{ xs: "20px", md: "35px" }}>Coderina is an independent <br />Non-profit organisation Ed-Tech</Typography>
                        <Typography fontSize={{ xs: "15px", md: "21px" }}>Working to promote ICT development, Youth Innovation and Entrepreneurship in Africa</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default AboutHeader