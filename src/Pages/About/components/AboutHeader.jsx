import { Box, Button, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

const AboutHeader = () => {
    return (
        <Box component={"header"} className='about__header'>
            <Stack>
                <Stack>
                    <Button variant='outlined'>About us</Button>
                    <Stack>
                        <Typography variant='h4'>Coderina is an independent <br />Non-profit organisation Ed-Tech</Typography>
                        <Typography>Working to promote ICT development, Youth Innovation and Entrepreneurship in Africa</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default AboutHeader