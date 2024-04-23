import { styled } from '@mui/material/styles';
// import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { getSubCategories } from 'app/store/userSlices/userHomeSlice';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {  Grid } from "@mui/material";
import Cards from "./Cards";

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {display: 'block'},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function HomePage(props) {
    const { subcategories } = useSelector((state) => state.userSlices.userHomeSlice);
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getSubCategories());
    }, []);
  

  return (
    <Root
      header={
        <div className="p-24">
          <h4>Sub Categories</h4>
        </div>
      }
      content={
        <>
        <Grid sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {subcategories?.map((item, index) => (
          <Grid xs={6} key={index} className="w-1/6">
            {/* <Link
              to={`/subcategory/${item.id}`}
              style={{ textDecoration: "none" }}
            > */}
              <Cards
                sx={{ width: "50px", cursor: "pointer" }}
                title={item.name}
                image={item.image}
              />
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>
        </>
      }
      scroll="content"
    />
  );
}

export default HomePage;
