import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import edit from '../../../assets/edit.png'
import pic from '../../../assets/pic.png'
import set from '../../../assets/setting.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom'


const Resources = () => {

    const cardContent = [
        {
            img: edit,
            description: "Discover FIRST Tech Challenge's impact on our community",
            link: "Read Blog"
        },
        {
            img: pic,
            description: "Take a look at what FIRST Tech Challenge is all about",
            link: "View Gallery"
        },
        {
            img: set,
            description: "Discover FIRST Tech Challenge's impact on our community",
            link: "View Resource Library"
        }
    ]

    return (
        <Box className="resource__container">
            <Typography variant='h4'>Resources</Typography>
            {cardContent.map((content, i) => (
                <Stack key={i}>
                    <Stack>
                        <img src={content.img} alt="" />
                        <Typography>{content.description}</Typography>
                    </Stack>
                    <Stack>
                        <Link>{content.link}<FaArrowRightLong /></Link>
                    </Stack>
                </Stack>
            ))}
        </Box>
    )
}

export default Resources