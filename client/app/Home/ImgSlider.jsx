import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide from "../../public/hero1.jpg";
import slide1 from "../../public/hero2.jpg";
import slide2 from "../../public/hero3.jpg";
import slide3 from "../../public/hero4.jpg";
import slide4 from "../../public/hero5.jpg";
import slide5 from "../../public/hero6.jpg"
import Image from "next/image";

const ImgSlider = () => {
  const slideImg = [slide, slide1, slide2, slide3, slide4, slide5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds interval
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider className="" {...settings}>
        {slideImg.map((slide, index) => (
          <div key={index}>
            <Image src={slide} alt="slideImage" className="w-full md:w-[90%] object-cover h-72 rounded-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImgSlider;
