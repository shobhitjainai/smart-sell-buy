import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import Items from './Items'
import { useDispatch, useSelector } from 'react-redux';
import { getBannerImages } from 'app/store/userSlices/userHomeSlice';
import { Grid } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const images = [
    {
        id: 1,
      title: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        id: 2,
        title: 'Bird',
      imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        id: 3,
        title: 'Bali, Indonesia',
        imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
        id: 4,
        title: 'Goč, Serbia',
        imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
  ];

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

        // <Carousel>
        //     {
        //         bannerImages?.map( (item) => 
        //         <Items item={item.images[0]} />
        //     )
        //     }
        // </Carousel>

        <>
        <Grid className='w-full'>
          <Grid>
            <Slider {...settings}>
          {
                bannerImages?.map( (item) => (
                  <div className='bg-white h-288  text-black'>
                    <img src={item.images[0].image} alt='caraousel-item' className='h-288 w-full object-center '/>
                  </div>
                )
                // <Items item={item.images[0]} />
            )
            }
            </Slider>
          </Grid>

        </Grid>
        </>
       
       
    )
}

export default HomeCaraousel;