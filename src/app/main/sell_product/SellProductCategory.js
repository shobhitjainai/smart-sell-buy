import { Button, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Cards from "../home/components/categories/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "app/store/userSlices/userHomeSlice";
// import SubCategory from "./SubCategory";
import { Link } from "react-router-dom";
import { handleCategory } from "app/store/userSlices/userSellingSlice";
import { useTranslation } from "react-i18next";

const Categories = () => {
    const { t } = useTranslation('addProduct')
    const { Categories, loading } = useSelector((state) => state.userSlices.userHomeSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={8} marginTop={1}>
                    <Typography variant="h6" className="text-2xl font-bold">{t('SELECT_CATEGORY')}</Typography>
                </Grid>

            </Grid>

            <Grid container sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 3 }} marginTop={1}>
                {(loading.categoriesLoading ? Array.from(new Array(7)) : Categories)?.map((item, index) => (
                    <Grid xs={6} sm={4} md={3.6} lg={2.6} xl={1.8} key={index} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 '>
                        {!loading.categoriesLoading ? (<Link
                            to={`/sellproductsubcategory/${item.id}`}
                            style={{ textDecoration: "none" }}
                            className="w-full"
                            onClick={() => dispatch(handleCategory(item))}
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
        </>
    );
};

export default Categories;
