import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import Items from './Items'
import { useDispatch, useSelector } from 'react-redux';
import { getBannerImages } from 'app/store/userSlices/userHomeSlice';
import { Grid, Typography } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeCaraousel() {

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


  const { bannerImages } = useSelector((state) => state.userSlices.userHomeSlice);
  return (
    <>
      <Grid className='w-full'>
        <Grid>
          <Slider {...settings}>
            {
              bannerImages?.map((item) => (
                <div className='relative' key={item.id}>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent'></div>
                  <img src={item.images[0].image} alt='carousel-item' className='h-288 w-full object-center' />
                  <div className='absolute bottom-10 ml-36 '>
                    <Typography className='text-white font-bold '>{item.name}</Typography>
                    <Typography className='text-white font-bold text-xl'>₹ {item.price}</Typography>
                    <Typography className='text-white  '>{item.address}</Typography>
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