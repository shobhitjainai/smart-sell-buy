import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Grid, Typography, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'app/store/admin/DashboardSlice';
import { useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
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
        <TableContainer component={Paper}>
            <Toolbar sx={{ justifyContent: "space-between", display: "flex", width: "100% !important" }}>
                <Typography variant='h6' >Top Products</Typography>
                <Link to="/admin/products/productslist">
                    <Button sx={{ color: "blue" }}>See All</Button>
                </Link>
            </Toolbar>
            <Table sx={{ minWidth: 640 }} aria-label="customized table">
                <TableBody>
                    {products.map((row,index) => (
                        <StyledTableRow key={row.name}  className={` hover:bg-[#F2F7FB] transition duration-300 ease-in-out`}>
                            <TableCell
                                component="th"
                                scope="row"
                                align='left'
                                sx={{ paddingBlock: 3 }}
                            >
                                <Grid container alignItems="center">
                                    <img src= {row.images[0].image} width="70px" height='50px' alt="" className='pr-24' />
                                    <Typography className='text-xl' >{row.name}</Typography>
                                </Grid>
                            </TableCell>
                            <StyledTableCell component="th" scope="row" >
                                {row.condition}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.description}</StyledTableCell>
                            <StyledTableCell align="left">{row.price}</StyledTableCell>
                            {/* <StyledTableCell align="left">{row.address}</StyledTableCell>
                            <StyledTableCell align="left">{`${row?.seller.first_name} ${row?.seller.last_name}`}</StyledTableCell>
                            <StyledTableCell align="left">{row?.seller.phone_number}</StyledTableCell>
                            <StyledTableCell align="left">{row?.seller.email}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}