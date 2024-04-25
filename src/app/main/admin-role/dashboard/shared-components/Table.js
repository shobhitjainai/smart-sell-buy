import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Grid, Typography, Button, Toolbar, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'app/store/admin/DashboardSlice';
import { useEffect } from 'react';
import { fontSize, fontWeight, padding } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#F2F7FB',
        color: theme.palette.common.black,
        fontSize: 16,
        fontWeight: 600,
        padding: '16px 24px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        padding: '16px 24px'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    //   '&:nth-of-type(odd)': {
    //     backgroundColor: "#F2F7FB",
    //   },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
    const { products } = useSelector((state) => state.admin.DashboardSlice)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [])
    return (
        <>
            <Grid container component={Paper}>
                <Toolbar sx={{ justifyContent: "space-between !important", display: "flex", width: "100% !important", padding: '0 30px 0 20px' }}>
                    <Typography variant='h6' >Top Products</Typography>
                    <Link to="/admin/products/productslist">
                        <Button sx={{ color: "blue" }}>See All</Button>
                    </Link>
                </Toolbar>
                <TableContainer>
                    <Table sx={{ minWidth: 640 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Condition</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
                                <StyledTableCell align="right">Price</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row, index) => (
                                <StyledTableRow key={row.name} className={` hover:bg-[#F2F7FB] transition duration-300 ease-in-out`}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align='left'
                                        sx={{ padding: '5px 10px' }}
                                    >
                                        <Grid container alignItems="center">
                                            <Avatar className='mr-10' sx={{ bgcolor: '#F2F7FB', height: '60px', width: '60px' }} variant="rounded">
                                                <Avatar variant="rounded" alt={row?.name} src={row?.images[0].image} />
                                            </Avatar>
                                            <Typography sx={{ fontWeight: 600 }} fontSize={18}>{row.name}</Typography>
                                        </Grid>
                                    </TableCell>
                                    <StyledTableCell align='right' component="th" scope="row" >
                                        {row.condition}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.description}</StyledTableCell>
                                    <StyledTableCell align="right">Rs.{row.price}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
}