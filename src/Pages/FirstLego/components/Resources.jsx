import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import edit from '../../../assets/edit.png'
import pic from '../../../assets/pic.png'
import set from '../../../assets/setting.png'
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom'


const Resources = () => {

    const cardContent = [
        {
            img: edit,
            description: "Discover FIRST Tech Challenge's impact on our community",
            link: "Read Blog",
            gap: 13
        },
        {
            img: pic,
            description: "Take a look at what FIRST Tech Challenge is all about",
            link: "View Gallery",
            gap: 18.5
        },
        {
            img: set,
            description: "Discover FIRST Tech Challenge's impact on our community",
            link: "View Resource Library",
            gap: 13
        }
    ]

    return (
        <Box className="resource__container">
            <Typography variant='h4'>Resources</Typography>
            <Stack>
                {cardContent.map((content, i) => (
                    <Stack key={i} gap={content.gap}>
                        <Stack>
                            <img src={content.img} alt="" />
                            <Typography>{content.description}</Typography>
                        </Stack>
                        <Stack>
                            <Link>{content.link}<BsArrowRight size={23} /></Link>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Box>
    )
}

export default Resources