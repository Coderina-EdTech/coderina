import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { blueColor, darkGreenColor, redColor, yellowColor } from '../../../utils/constants'
import CustomButton from './CustomButton'
import { FaArrowRightLong } from "react-icons/fa6";
import ImgSlider from './ImgSlider'

const Header = () => {
    const tags = [
        {
            tag: "Youth. ",
            color: darkGreenColor
        },
        {
            tag: "Innovation. ",
            color: blueColor
        },
        {
            tag: "Entrepreneurships. ",
            color: redColor
        },
        {
            tag: "Empowerment. ",
            color: yellowColor
        }
    ]

    return (
        <Box className="header__container">
            <Stack gap={3}>
                <Stack>
                    <Typography className='header__tags' width={["default", "65%"]}>
                        {tags.map(({ tag, color }) => (
                            <Typography fontSize={{ xs: "24px", md: "50px" }} component={"span"} key={tag} color={color}>
                                {tag}
                            </Typography>
                        ))}
                    </Typography>
                </Stack>
                <Stack>
                    <CustomButton isLarge >Get Started <FaArrowRightLong /></CustomButton>
                </Stack>
                <ImgSlider />
            </Stack>
        </Box>
    )
}

export default Header