
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';import { getSingleProductDetail } from "app/store/userSlices/userHomeSlice";
import { use } from "i18next";
import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': { display: 'block' },
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));


const ProductDetails = () => {
  const { t } = useTranslation();
  const { singleProductDetail } = useSelector(
    (state) => state.userSlices.userHomeSlice
  );

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProductDetail(id));
    console.log(singleProductDetail.image);
  }, []);
  return (
    <Root
      header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      content={
        <>
      <div className="p-28 h-full w-1/3">
        <Typography className="text-4xl py-10">Product Details</Typography>
        <div className="bg-white  w-full">
        <div className="h-2/5 w-full">
          <Carousel className="h-full w-full">
            
            {singleProductDetail?.images?.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={`product-image-${index}`}
                className=" w-full object-cover"
                sx={{height: "90%"}}
              />
            ))}
            
            
          </Carousel>
          </div>
          <div className="p-24">
            <div className="text-2xl h-1/2 font-bold">{singleProductDetail.name}</div>
            <Typography className="text-gray-600 mb-11 text-sm">
              Posted on wed, 11:59am {singleProductDetail?.address}
            </Typography>
            <Divider className="h-1" />

            <Typography className="mt-11 text-2xl text-green-500 font-bold">₹{singleProductDetail.price}</Typography>
            <Typography className="mb-11">
              <span className="text-sm">For Sale by</span> <span className="font-semibold">{singleProductDetail?.seller?.first_name} {singleProductDetail?.seller?.last_name}</span>
            </Typography>
            <Divider className="h-1" />

            <Typography className="mt-11 text-2xl font-bold">Feature</Typography>

            <Typography>{singleProductDetail.description}</Typography>
          </div>
        </div>
      </div>
      </>
    }
    scroll="content"
  />
  );
};

export default ProductDetails;
