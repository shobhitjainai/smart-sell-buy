import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { getSubCategoriesById } from 'app/store/userSlices/userHomeSlice';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link, useParams } from 'react-router-dom';
import { handleSubcategory } from 'app/store/userSlices/userSellingSlice';
import Skeleton from '@mui/material/Skeleton';
import Cards from '../home/components/categories/Cards';
import { useTranslation } from 'react-i18next';

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

function HomePage(props) {
    const { t } = useTranslation('addProduct')
    const { currentSubCategories, loading } = useSelector((state) => state.userSlices.userHomeSlice);
    const { id } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubCategoriesById(id));
    }, []);

    return (
        <>
            <Grid margin={3}>
                <Typography variant="h6" className="text-2xl font-bold">{t('SUB_CATEGORY')}</Typography>

                <Grid container sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 3 }} marginTop={3}>
                    {(loading.currentSubCategoriesLoading ? Array.from(new Array(3)) : currentSubCategories)?.map((item, index) => (
                        <Grid item xs={6} sm={4} md={3.6} lg={2.6} xl={1.8} key={index} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300'>
                            {!loading.currentSubCategoriesLoading ? (
                                <Link
                                    to='/post-product'
                                    style={{ textDecoration: "none" }}
                                    className="w-full"
                                    onClick={() => dispatch(handleSubcategory(item))}
                                >
                                    <Cards
                                        sx={{ cursor: "pointer" }}
                                        title={item.name}
                                        image={item.image}
                                    />
                                </Link>
                            ) : (
                                <Card sx={{ alignContent: "center", alignItems: "center" }}>
                                    <Skeleton variant="rectangular" width={'100%'} height={200} />
                                    <CardContent>
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;
