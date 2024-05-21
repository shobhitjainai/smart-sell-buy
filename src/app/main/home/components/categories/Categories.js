import { Button, Divider, Grid, Typography } from "@mui/material";
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
      <Grid container justifyContent="center" alignItems="center" spacing={2} className="mt-8"  >
        <Grid item marginTop={5}>
          <Typography sx={{ fontWeight: 'bold', }} className="my-8 text-3xl">Categories</Typography>
          <Divider variant="middle" sx={{ color: '#818cf8', border: '2px solid', borderRadius: 2 }} />
        </Grid>
      </Grid>
      <Grid>
        <Grid className="flex gap-24 flex-wrap justify-center items-center" sx={{ marginTop: 3 }} >
          {Categories.map((category, index) => (
            <Grid key={index} sx={{
              backgroundColor: '#818CF8', padding: 1, color: '#fff', borderRadius: 1, cursor: "pointer", "&:hover": {
                backgroundColor: "#6b73d1", // Change this to the desired hover background color
              }
            }}>{category.name}</Grid>
          ))}
        </Grid>
      </Grid>

      <Grid container sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} spacing={3} marginTop={3}>
        {Categories?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
