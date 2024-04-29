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
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Divider from "@mui/material/Divider";
import {
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { handleEditProductDialog } from 'app/store/admin/productSlice';
import { getCustomers } from 'app/store/admin/userSlice';



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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(customers, comparator) {
    const stabilizedThis = customers.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



// function EnhancedTableHead(props) {
//     const { order, orderBy, onRequestSort } =
//         props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };
//     return (
//         <TableHead className='bg-[#F8F9FC]' >
//             <TableRow>
//                 {headCells.map((headCell, index) => (
//                     <TableCell
//                         key={headCell.id}
//                         align='left'
//                         // padding={headCell.disablePadding ? 'none' : 'normal'}
//                         className={`${index === 0 ? 'pl-52' : ''} font-bold`}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}

//             </TableRow>
//         </TableHead>

//     );
// }

function EnhancedTableHead(props) {
    const { t } = useTranslation('customerPage');
    const headCells = [
        {
            id: 'user',
            numeric: false,
            disablePadding: true,
            label: t('User'),
        },
        {
            id: 'Phone_number',
            numeric: true,
            disablePadding: false,
            label: t('Phone_Number'),
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: t('Email'),
        },
    
        {
            id: 'gender',
            numeric: true,
            disablePadding: false,
            label: t('Gender'),
        },
    
    ];
    return (
        <TableHead className='bg-[#F8F9FC]'>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        className={`${index === 0 ? 'pl-52' : ''} font-bold`}
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
    const { t } = useTranslation('customerPage');
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
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {t('Customers')}
                </Typography>

            )}

        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [editData, setEditData] = React.useState(null);


    const { customers, loading } = useSelector((state) => state.admin.userSlice)
    const { editDialog } = useSelector((state) => state.admin.productSlice);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomers())
    }, [])


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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(customers, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, customers],
    );

    function formatDate(dateString) {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function formatTime(dateString) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    }

    // EDIT CUSTOMER DIALOG

    // EDIT CUSTOMER CLOSE
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
        // dispatch(updateProperty({  propertyData, updatepropertyId })).then((res) => {
        //   res.payload.success && dispatch(getadminLandlords());
        // });
        setAddDialog(false);
    };





    return (
        <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <Grid container className='p-24'>
                <TableContainer className='justify-between'>
                    {loading ? <FuseLoading /> : <Table
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
                            rowCount={customers.length}

                        />

                        <TableBody className='p-52'>
                            {visibleRows.map((row, index) => {
                                // const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
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
                                            sx={{ paddingBlock: 2 }}
                                        >
                                            <Grid container alignItems="center" sx={{ height: '50px' }}>
                                                <img src={row?.picture} width="40px" alt={row?.picture ? row.first_name : "NA"} className='pr-12' />
                                                <Typography className='text-xl' >
                                                    {`${row.first_name.charAt(0).toUpperCase()}${row.first_name.slice(1)} ${row.last_name.charAt(0).toUpperCase()}${row.last_name.slice(1)}`}
                                                </Typography>
                                            </Grid>
                                        </TableCell>
                                        <TableCell id={labelId} align="left">{row?.phone_number ? row.phone_number : "Not Available"}</TableCell>
                                        <TableCell align="left">{row?.email}</TableCell>
                                        <TableCell align="left">{row?.gender ? row.gender : "Not Available"}</TableCell>
                                      
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
                    </Table>}

                </TableContainer>
            </Grid>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* CUSTOMER EDIT DIALOG */}
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

                            <DialogTitle>Edit Customer</DialogTitle>
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


