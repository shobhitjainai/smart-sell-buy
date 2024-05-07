import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import Items from './Items'
import { useDispatch, useSelector } from 'react-redux';
import { getBannerImages } from 'app/store/userSlices/userHomeSlice';
import { Grid, Typography } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeCaraousel(){

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };



    const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getBannerImages());
  }, []);


const  {bannerImages} = useSelector((state) => state.userSlices.userHomeSlice);    
    return (

        <>
        <Grid className='w-full'>
          <Grid>
            <Slider {...settings}>
          {
                bannerImages?.map( (item) => (
                  <div className='bg-white h-288  text-black reltive'>
                    <img src={item.images[0].image} alt='caraousel-item' className='h-288 w-full object-center '/>
                    <div className='absolute bottom-10 ml-4 '>
                    <Typography>{item.price}</Typography>
                    </div>
                  </div>
                )

            )
            }
            </Slider>
          </Grid>

        </Grid>
        </>
       
       
    )
}

export default HomeCaraousel;