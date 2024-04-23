import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Cards from "../home/components/categories/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "app/store/userSlices/userHomeSlice";
// import SubCategory from "./SubCategory";
import { Link } from "react-router-dom";

const Categories = () => {
    const { Categories } = useSelector((state) => state.userSlices.userHomeSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={8}>
                    <Typography variant="h6" className="text-2xl font-bold">Categories</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }} marginTop={1}>
                    <Button sx={{ color: "blue" }}>See All</Button>
                </Grid>
            </Grid>

            <Grid container flexWrap="wrap" sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
                {Categories?.map((item, index) => (
                    <Grid sx={{ width: "15%" }} key={index} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 '>
                        <Link
                            to={`/sellproductsubcategory/${item.id}`}
                            style={{ textDecoration: "none" }}
                            className="w-full"
                        >
                            <Cards
                                sx={{ cursor: "pointer" }}
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
