import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategoryCount } from 'app/store/admin/DashboardSlice';
import { useEffect } from 'react';
import { getProduct } from 'app/store/admin/productSlice';
import { getCustomers } from 'app/store/admin/userSlice';
import { getCategory } from 'app/store/admin/CategorySlice';
import ReactApexChart from 'react-apexcharts';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
    const { t } = useTranslation('dashboardPage');
    const state = {
        series: [
            {
                name: 'series-1',
                data: [20, 50, 7, 100, 30, 80, 100],
                stroke: {
                    width: 4
                }
            },
        ],
        options: {
            chart: {
                type: 'area',
                width: '100%', // Set width to 100% to ensure all labels are visible
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false // Hide chart download options
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false, // Hide y-axis labels
                },
                axisBorder: {
                    show: false
                },
                type: 'category',
                opposite: false
            },
            yaxis: {
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false, // Hide y-axis labels
                },
                axisBorder: {
                    show: false
                },
                type: 'category',
                opposite: false
            },
            legend: {
                horizontalAlign: 'left',
                showForSingleSeries: false
            },
            markers: {
                size: 0,
                hover: {
                    size: 0
                }
            },
            tooltip: {
                enabled: false,
            },
            grid: {
                padding: {
                    top: 0
                },
                show: false,
                xaxis: {
                    lines: {
                        show: false  //or just here to disable only x axis grids
                    },
                },
                xaxis: {
                    lines: {
                        show: false  //or just here to disable only x axis grids
                    },
                },
            }
        },
    };
    const { subCategoryCount } = useSelector((state) => state.admin.DashboardSlice)
    const { product } = useSelector((state) => state.admin.productSlice);
    const { category } = useSelector((state) => state.admin.CategorySlice);
    const { customers, loading } = useSelector((state) => state.admin.userSlice)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomers())
    }, [])

    useEffect(() => {
        dispatch(getCategory())
    }, [])
    useEffect(() => {
        dispatch(getProduct());
    }, []);
    useEffect(() => {
        dispatch(getSubCategoryCount())
    }, [])
    const headingData = [
        { heading: t('TOTAL_PRODUCT'), numbers: product.length, lineColor: '#22C55E', icon: 'heroicons-outline:shopping-cart' },
        { heading: t('Total_Category'), numbers: category.length, lineColor: '#FF5200', icon: 'material-solid:category' },
        { heading: t('Total_User'), numbers: customers.length, lineColor: '#CBD5E1', icon: 'heroicons-outline:user' },
        { heading: t('Total_SubCategory'), numbers: subCategoryCount.length, lineColor: '#2377FC', icon: 'material-solid:dynamic_feed' }
    ];
    return (
        <>
            <Box sx={{ flexGrow: 1, margin: 4 }}>
                <Grid container spacing={2}>
                    {headingData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                            <Card sx={{ width: '100%' }}>
                                <CardContent sx={{ padding: '16px 20px 0 20px' }}>
                                    <Grid container spacing={2} alignItems='center'>
                                        <Grid item>
                                            <Typography sx={{ backgroundColor: item?.lineColor, width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                                                <FuseSvgIcon color='white' size={25}>{item?.icon}</FuseSvgIcon>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h6' sx={{ fontSize: 14, fontWeight: 400 }}>
                                                {item.heading}
                                            </Typography>
                                            <Typography variant='h4'>
                                                {item.numbers}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions sx={{ padding: 0 }}>
                                    <ReactApexChart
                                        options={{ ...state.options, colors: [item?.lineColor] }}
                                        series={state.series}
                                        type="area"
                                        height={80}
                                    />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </>
    );
}
