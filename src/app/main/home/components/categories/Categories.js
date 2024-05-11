import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "app/store/userSlices/userHomeSlice";
import SubCategory from "./SubCategory";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';

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


const Categories = () => {
  const { Categories } = useSelector((state) => state.userSlices.userHomeSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <Grid container spacing={2} className="mt-8">
        <Grid item>
          <Typography sx={{ fontWeight: 'bold', fontSize: '2.4rem' }} className="my-8">Categories</Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} spacing={3}>
        {Categories?.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Link
              to={`/subcategory/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <Cards
                sx={{ width: "50px", cursor: "pointer" }}
                title={item.name}
                image={item.image}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Categories;
