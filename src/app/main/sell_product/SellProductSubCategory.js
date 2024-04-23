import { styled } from '@mui/material/styles';
// import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { getSubCategories } from 'app/store/userSlices/userHomeSlice';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Cards from "../home/components/categories/Cards";
import { Link } from 'react-router-dom';
import { handleSubcategory } from 'app/store/userSlices/userSellingSlice';


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
    const { subcategories } = useSelector((state) => state.userSlices.userHomeSlice);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubCategories());
    }, []);


    return (


        <>
            <Grid margin={3}>
                <Typography variant="h6" className="text-2xl font-bold">Sub Category</Typography>


                <Grid sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 4 }} marginTop={3}>
                    {subcategories?.map((item, index) => (
                        <Grid sx={{ width: "15%" }} key={index} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300'>
                            <Link
                                to='/location'
                                style={{ textDecoration: "none" }}
                                onClick={() => dispatch(handleSubcategory(item.id))}
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
            </Grid>
        </>

    );
}

export default HomePage;
