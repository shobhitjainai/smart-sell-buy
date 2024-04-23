import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts'; // Changed import statement
import { useState } from 'react';
import { ChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategoryCount } from 'app/store/admin/DashboardSlice';
import { useEffect } from 'react';
import { getProduct } from 'app/store/admin/productSlice';
import { getCustomers } from 'app/store/admin/userSlice';
import { getCategory } from 'app/store/admin/CategorySlice';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
    const {  subCategoryCount} = useSelector((state) => state.admin.DashboardSlice)
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

    const [state] = useState({
        options: {},
        series: [
            {
                name: 'series-1',
                data: [30, 40, 25, 50, 49, 21, 70, 51]
            },
        ]
    });

    const headingData = [
        { heading: 'Total Product', numbers: product.length },
        { heading: 'Total Category', numbers: category.length },
        { heading: 'Total User', numbers: customers.length },
        { heading: 'Total SubCategory', numbers: subCategoryCount.length }
    ];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    return (
        <>
            <Box sx={{ flexGrow: 1, margin: 4 }}>
                <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {headingData.map((item, index) => (
                        <Grid item xs={2} sm={4} md={3} key={index}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant='h6'>
                                        {item.heading}
                                    </Typography>
                                    <Typography variant='h6'>
                                        {item.numbers}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                    <ChartContainer
                                        width={500}
                                        height={170}
                                        series={[{ type: 'line', data: pData }]}
                                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                                        sx={{
                                            '.MuiLineElement-root': {
                                                stroke: '#8884d8',
                                                strokeWidth: 2,
                                            },
                                            '.MuiMarkElement-root': {
                                                stroke: '#8884d8',
                                                scale: '0.6',
                                                fill: '#fff',
                                                strokeWidth: 2,
                                            },
                                            backgroundColor: '#F2F7FB', // Set background color here
                                        }}
                                        disableAxisListener
                                    >
                                        <LinePlot />
                                        <MarkPlot />
                                    </ChartContainer>

                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </>
    );
}
