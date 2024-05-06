import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import { getProductSelling } from 'app/store/userSlices/userSellingSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import SellingProductCard from './SellingProductCard';

const SellingTab = () => {
    const { productSelling, loading } = useSelector((state) => state.userSlices.userSellingSlice)
    const { productSellingLoading } = loading
    const { t } = useTranslation()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductSelling())
    }, [])
    return (
        <Grid container spacing={2}>
            {productSellingLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
                        <Card key={index} sx={{ alignContent: "center", alignItems: "center" }}>
                            <Skeleton variant="rectangular" width={'100%'} height={200} />
                            <CardContent>
                                <Skeleton />
                                <Skeleton />
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (productSelling.length > 0 ? productSelling?.map((product, index) =>
                <Grid item xs={6} sm={4} md={3.6} lg={2.6} xl={1.8}>
                    <SellingProductCard id={product?.id} image={product?.images[0]?.image} name={product?.name} price={product?.price} />
                </Grid>)
                : <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
                    <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
                        <Grid item>
                            <InfoIcon sx={{ color: '#818CF8', fontSize: 40 }} />
                        </Grid>
                        <Grid item>
                            <Typography fontSize={18} fontWeight={600}>{t('No Selling products found.')}</Typography>
                        </Grid>
                    </Grid>
                </Box>)
            }
        </Grid>
    )
}

export default SellingTab