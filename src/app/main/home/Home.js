import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import HomeCaraousel from "./components/carousel/HomeCaraousel";
import Categories from "./components/categories/Categories";
import { Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSearchProducts, getUserProducts } from "app/store/userSlices/userHomeSlice";

const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.divider,
    },
    "& .FusePageSimple-toolbar": {},
    "& .FusePageSimple-content": { display: "block" },
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
}));

function HomePage(props) {
    const { t } = useTranslation("HomePage");
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
            // header={
            //     <div className="p-24">
            //         <h4>{t("TITLE")}</h4>
            //     </div>
            // }
            content={
                <div className="p-24 h-320">
                    <div className="">
                        <Link to="/"></Link>
                        <HomeCaraousel />
                        <h2>Categories</h2>
                        <Categories />

                        {/* FRESH RECOMMENDATION */}
                        <Grid className="flex flex-col">
                            <Typography className="text-lg font-bold">
                                Fresh Recommendation
                            </Typography>

                            <Grid className="text-gray-600 body-font">
                            <Grid className="container px-5 py-24 mx-auto ">
                                <Grid className="flex flex-wrap -m-4 ">
                                {productsToDisplay.map((item, index) => (
                                    
                                        <Link key={index} to={`/product-details/${item.id}`} style={{ textDecoration: "none" }} className="lg:w-1/5 md:w-1/5 p-4 w-full ">
                                            <ProductCard
                                                // sx={{ width: "100%", cursor: "pointer" }}
                                                image={item.images[0]}
                                                title={item.name}
                                                address={item.address}
                                                price={item.price}
                                            />
                                        </Link>
                                   
                                ))}
                                </Grid>
                            </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            }
            
        />
    );
}

export default HomePage;
