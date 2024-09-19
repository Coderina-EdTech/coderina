import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import slide from '../../../assets/image.png'
import slide1 from '../../../assets/image1.png'
import slide2 from '../../../assets/image2.png'
import slide3 from '../../../assets/image3.png'
import { Box, Stack } from '@mui/material';

const ImgSlider = () => {
    const slideImg = [
        {
            image: slide
        },
        {
            image: slide1
        },
        {
            image: slide2
        },
        {
            image: slide3
        },
    ]

    let settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
    }

    return (
        <Box overflow={"hidden"}>
            <Slider className='header__carousel' {...settings}>
                {slideImg.map((slide, index) => (
                    <Stack key={index}>
                        <Box component={"img"} src={slide.image} alt="" />
                    </Stack>
                ))}
            </Slider>
        </Box>
    )
}

export default ImgSlider