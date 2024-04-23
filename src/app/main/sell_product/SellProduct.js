import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { getUserProducts, getSearchProducts } from "app/store/userSlices/userHomeSlice";
import SellProductCategory from "./SellProductCategory";
import { Grid } from "@mui/material";

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

const SellProduct = () => {
    const { t } = useTranslation(); // Use t from useTranslation hook
    const { userProducts, searchInput } = useSelector((state) => state.userSlices.userHomeSlice);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProducts());
    }, [dispatch]);


    return (
        <Root
            content={
                <>
                <Grid  margin={2}>
                    <SellProductCategory />
                </Grid>
                </>
            }
            scroll="content"
        />
    );
};

export default SellProduct;
