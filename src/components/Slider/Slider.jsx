import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IconButton, Box } from "@mui/material";
import main1 from '../../assets/main1.jpg'
import main2 from '../../assets/main2.jpg'
import main3 from '../../assets/main3.jpg'

const arr = [main1, main2, main3];

export default function Slider() {
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler,hasPrev,label)=>(
        <IconButton
        onClick={onClickHandler}
        className=" absolute z-10 top-[50%] left-0 text-white hover:bg-blue-100 cursor-pointer"
        >
            <NavigateBeforeIcon className="text-[40px]"/>
        </IconButton>
      )}

      renderArrowNext={(onClickHandler,hasPrev,label)=>(
        <IconButton
        onClick={onClickHandler}
        className=" absolute z-10 top-[50%] right-0 text-white hover:bg-blue-100"
        >
            <NavigateNextIcon className="text-[40px]"/>
        </IconButton>
      )}
    >
{arr.map((item,index)=>(
    <Box key={index} >
        <img src={item} alt="" className=" object-cover w-[100%] h-[750px] bg-fixed cursor-pointer"/>
    </Box>
))}

    </Carousel>
  );
}
