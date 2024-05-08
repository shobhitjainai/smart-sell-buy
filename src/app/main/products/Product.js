import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Grid, TextField, Typography, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getUserProducts, getSearchProducts, handleFilters, filterProducts } from "app/store/userSlices/userHomeSlice";
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getCategory } from "app/store/admin/CategorySlice";

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
  const { t } = useTranslation('productsPage'); // Use t from useTranslation hook
  const { userProducts, searchInput, filterState } = useSelector((state) => state.userSlices.userHomeSlice);
  const [search, setSearch] = useState('');
  const { category } = useSelector((state) => state.admin.CategorySlice)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() !== '') {
      dispatch(getSearchProducts(search));
    }
    dispatch(getCategory());
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(filterProducts(filterState))
  }, [filterState.category_id, filterState.sort])
  // let productsToDisplay = search.trim() !== '' ? searchInput || [] : userProducts || [];
  const handleFilter = (e) => {
    dispatch(handleFilters(e.target))
  }
  return (
    <Root
      content={
        <Grid container spacing={2} sx={{ height: '100%' }} className="p-20">
          <Grid item xs={4}>
            <Box sx={{ width: '100%', background: '#fff', }}>
              <Grid container className="p-20">
                <Grid item className="mb-10">
                  <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', fontSize: '2rem', color: 'grey' }}><TuneIcon sx={{ width: '1.2em', height: '0.8em' }} />{t('FILTERS')}</Typography>
                </Grid>
                <Grid item className="w-full">
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      {t('CATEGORY')}
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        name='category_id'
                        variant='filled'
                        select
                        type='text'
                        value={filterState.category_id == '' ? 1 : filterState?.category_id}
                        onChange={(e) => {
                          handleFilter(e)
                        }}
                        fullWidth
                        SelectProps={{
                          sx: {
                            '& .MuiSelect-select': {
                              paddingTop: '14px'
                            }
                          }
                        }}
                      >
                        <MenuItem value={1} disabled>{t("SELECT_CATEGORY")}</MenuItem>
                        {category?.map((opt) => <MenuItem value={opt.id}>{opt?.name}</MenuItem>)}
                      </TextField>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      {t('BUDGET')}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="pb-10" color="grey">{t('CHOOSE_A_RANGE_BELOW')}</Typography>
                      <Grid container justifyContent={'space-between'} alignItems={'center'}>
                        <Grid item>
                          <TextField
                            name='price_min'
                            sx={{ width: '80px' }}
                            value={filterState?.price_min}
                            onChange={(e) => { handleFilter(e) }}
                            variant='filled'
                            placeholder={t('MIN')}
                            InputProps={{
                              sx: {
                                '& input': {
                                  paddingTop: '7px' // Adjust as needed
                                }
                              }
                            }} />
                        </Grid>
                        <Grid item>
                          <Typography color="grey">to</Typography>
                        </Grid>
                        <Grid item>
                          <TextField
                            name='price_max'
                            sx={{ width: '80px' }}
                            value={filterState?.price_max}
                            onChange={(e) => { handleFilter(e) }}
                            variant='filled'
                            placeholder={t('MAX')}
                            InputProps={{
                              sx: {
                                '& input': {
                                  paddingTop: '7px' // Adjust as needed
                                }
                              }
                            }} />
                        </Grid>
                        <Grid item>
                          <Button sx={{
                            border: '1px solid #818CF8', borderRadius: 2, color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                              backgroundColor: '#fff', color: '#818CF8'
                            },
                          }} onClick={() => dispatch(filterProducts(filterState))}>{t('APPLY')}</Button>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                    >
                      {t('SORT_BY')}
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <TextField
                        name='sort'
                        variant='filled'
                        select
                        type='text'
                        value={filterState.sort == '' ? 1 : filterState?.sort}
                        onChange={(e) => {
                          handleFilter(e)
                        }}
                        fullWidth
                        SelectProps={{
                          sx: {
                            '& .MuiSelect-select': {
                              paddingTop: '14px'
                            }
                          }
                        }}
                      >
                        {sortMenuItems?.map((opt) => <MenuItem value={opt.value}>{opt?.label}</MenuItem>)}
                      </TextField> */}Working on Sorting...
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              {userProducts.map((item, index) => (
                <Grid item key={index} xs={6} md={4} lg={3} xl={3}>
                  {console.log(item)}
                  {/* <Link to={`/product-details/${item.id}`} style={{ textDecoration: "none" }}> */}
                  <ProductCard
                    sx={{ width: "100%", cursor: "pointer" }}
                    image={item.images[0]}
                    title={item.name}
                    address={item.address}
                    price={item.price}
                    id={item.id}
                    archive={item.archive}
                  />
                  {/* </Link> */}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      }
      scroll="content"
    />
  );
};

export default Categories;
