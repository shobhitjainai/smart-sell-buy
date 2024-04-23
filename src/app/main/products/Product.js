import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getUserProducts, getSearchProducts } from "app/store/userSlices/userHomeSlice";

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
  const { t } = useTranslation(); // Use t from useTranslation hook
  const { userProducts, searchInput } = useSelector((state) => state.userSlices.userHomeSlice);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() !== '') {
      dispatch(getSearchProducts(search));
    }
  }, [dispatch, search]);

  let productsToDisplay = search.trim() !== '' ? searchInput || [] : userProducts || [];

  return (
    <Root
      header={
        <div className="p-24 flex justify-center items-center">
          <TextField
              id="search"
              label="Search"
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      }
      content={
        <>
        <Grid container spacing={3}>
          <Grid item xs>
            <h2>Products</h2>
          </Grid>
          
          <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ color: "blue" }}>See All</Button>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ gap: "20px", alignItems: "center" }}
        >
          {productsToDisplay.map((item, index) => (
            <Grid item key={index} xs={6} md={4} lg={3} xl={2}>
              <Link to={`/product-details/${item.id}`} style={{ textDecoration: "none" }}>
                <ProductCard
                  sx={{ width: "100%", cursor: "pointer" }}
                  image={item.images[0]}
                  title={item.name}
                  address={item.address}
                  price={item.price}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
        </>
      }
      scroll="content"
    />
  );
};

export default Categories;
