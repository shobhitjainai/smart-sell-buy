import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Avatar, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, handleEditProductDialog } from 'app/store/admin/productSlice';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Divider from "@mui/material/Divider";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { Link } from 'react-router-dom';


function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    if (orderBy === 'price') {
        return (a, b) => {
            const valueA = parseFloat(a.price);
            const valueB = parseFloat(b.price);

            if (valueA < valueB) {
                return order === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        };

    } else {
        return (a, b) => {
            if (a[orderBy] < b[orderBy]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[orderBy] > b[orderBy]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        };
    }
}





// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(product, comparator) {
    const stabilizedThis = product.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Product',
    },
    {
        id: 'description',
        numeric: true,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'time',
        numeric: true,
        disablePadding: false,
        label: 'Time',
    },
    {
        id: 'Actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {
    return (
        <TableHead className='bg-[#F8F9FC]'>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        className={`${index === 0 ? 'pl-52' : ''} font-bold`}
                        sx={{ fontSize: 16 }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                marginInline: 2,
                paddingTop: 4
            }}
        >

            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Product
            </Typography>



            <Link to="/user/sell-product">
                <Button variant='outlined' color='primary' sx={{
                    width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#3180FC", color: '#fff', backgroundColor: '#3180FC', '&:hover': {
                        backgroundColor: '#fff', // Change this to the desired hover background color
                        color: '#3180FC', borderColor: "#3180FC" // Change this to the desired hover text color
                    },
                }}>Add New</Button>
            </Link>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [editData, setEditData] = React.useState(null);


    const { product, loading, editDialog } = useSelector((state) => state.admin.productSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - product.length) : 0;



    const visibleRows = React.useMemo(
        () =>
            stableSort(product, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, product],
    );



    function formatDate(dateString) {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function formatTime(dateString) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    }

    // EDIT PRODUCT DIALOG

    // EDIT DAILOG CLOSE
    const handleClose = () => {
        dispatch(handleEditProductDialog(false))
    };

    const handleClickOpencreate = (data = null) => {
        if (data) {
            setEditData(data);
        } else {
            setEditData(null);
        }
        // setAddDialog(true);
        dispatch(handleEditProductDialog(true))
        // setUpdatePropertyId(data ? data._id : null);
    };


    const handleUpdate = (propertyData) => {
        setAddDialog(false);
    };




    return (
        <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
            {/* <Paper sx={{ width: '100%', mb: 2 }}> */}
            <EnhancedTableToolbar numSelected={selected.length} />
            <Grid container className='p-24'>
                <TableContainer className='justify-between'>
                    <Table
                        sx={{ width: "100%" }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}

                    >

                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={product.length}

                        />

                        <TableBody >
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (

                                    <TableRow
                                        // hover
                                        className={`${index % 2 !== 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-[#F2F7FB] transition duration-300 ease-in-out`}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ marginInline: 4 }}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            className='pl-52'
                                            align='left'

                                        >
                                            <Grid container alignItems="center">
                                                <Avatar className='mr-10' sx={{ bgcolor: '#F2F7FB', height: '60px', width: '60px' }} variant="rounded">
                                                    <Avatar variant="rounded" alt={row?.name} src={row?.images[0].image} />
                                                </Avatar>
                                                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{row?.name}</Typography>
                                            </Grid>

                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">{row.description}</TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">{row.price}</TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">{formatDate(row.created_at)}</TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">{formatTime(row.created_at)}</TableCell>
                                        <TableCell align="left" >
                                            <IconButton onClick={() => handleClickOpencreate(row)}>
                                                <EditIcon fontSize='small' sx={{ color: "gray" }} />
                                            </IconButton>
                                            <IconButton>
                                                <DeleteIcon fontSize='small' sx={{ color: "red" }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={product.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* PRODUCT EDIT DIALOG */}
            <Dialog open={editDialog} onClose={handleClose}>
                <Formik
                    initialValues={{
                        name: editData ? editData.name : "",
                        description: editData ? editData.description : "",
                        phoneNumber: editData ? editData.phoneNumber : "",
                        gender: editData ? editData.gender : "",
                        email: editData ? editData.email : "",
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const propertyData = {
                            name: values.name,
                            description: values.description,
                            phoneNumber: values.phoneNumber,
                            gender: values.gender,
                            email: values.email,
                        };

                        handleUpdate(propertyData);

                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <DialogTitle>Edit Product</DialogTitle>
                            <Divider variant="middle" />
                            <DialogContent>
                                <Field
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="NAME"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                />
                                <ErrorMessage name="name" />
                                <Field
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                />
                                <ErrorMessage name="description" />
                                {/* <Field
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    label="EMAIL"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                />
                                <ErrorMessage name="email" />
                                <Field
                                    margin="dense"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="phoneNumber"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                />
                                <ErrorMessage name="phoneNumber" />
                                <Field
                                    margin="dense"
                                    id="gender"
                                    name="gender"
                                    label="gender"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                /> */}
                                <ErrorMessage name="gender" />
                            </DialogContent>
                            <DialogActions className='pr-24 pb-12'>
                                <Button onClick={handleClose} variant="contained" sx={{
                                    backgroundColor: "#2275fc", borderRadius: 2, color: "#fff", "&:hover": {
                                        backgroundColor: "#1953d6" // Change to your desired hover background color
                                    }
                                }} >Cancel</Button>
                                <Button type="submit" variant="contained" sx={{
                                    backgroundColor: "#2275fc", borderRadius: 2, color: "#fff", "&:hover": {
                                        backgroundColor: "#1953d6" // Change to your desired hover background color
                                    }
                                }} disabled={isSubmitting}>Edit</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </Box>
    );
}