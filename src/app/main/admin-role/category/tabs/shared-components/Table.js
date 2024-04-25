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
import { Avatar, Button, DialogContentText, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategory, handleDeleteDialog, handleEditDialog, updateCategory } from 'app/store/admin/CategorySlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Divider from "@mui/material/Divider";


import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { showMessage } from 'app/store/fuse/messageSlice';

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
function stableSort(category, comparator) {
    const stabilizedThis = category.map((el, index) => [el, index]);
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
        label: 'Category',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
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
                    Category
                </Typography>
            )}
            <Link to="/admin/category/newCategory">
                <Button variant='outlined' color='primary' sx={{
                    width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#818CF8", color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                        backgroundColor: '#fff', // Change this to the desired hover background color
                        color: '#818CF8', borderColor: "#818CF8" // Change this to the desired hover text color
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
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [editData, setEditData] = React.useState(null);
    const [updateCategoryId, setUpdateCategoryId] = React.useState(null)


    const { category, loading, editCategotyDialog, deleteCategotyDialog } = useSelector((state) => state.admin.CategorySlice)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory())
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - category.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(category, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, category],
    );

    function formatDate(dateString) {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function formatTime(dateString) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    }


    // EDIT DIALOG

    // EDIT DAILOG CLOSE
    const handleClose = () => {
        dispatch(handleEditDialog(false))
        dispatch(handleDeleteDialog(false))
    };

    const handleClickOpenEditCategory = (data = null) => {
        if (data) {
            setEditData(data);

        } else {
            setEditData(null);
        }
        // setAddDialog(true);
        dispatch(handleEditDialog(true))
        setUpdateCategoryId(data.id);
    };


    const handleUpdate = (categoryData) => {
        dispatch(updateCategory({ categoryData, updateCategoryId })).then((res) => {
            res.payload.success && dispatch(getCategory()).then(dispatch(showMessage({ message: "Category Updated Successfully", variant: 'success' })))
        });
        dispatch(handleEditDialog(false))
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
    });

    //   ON DELETING CATEGORY
    const handleDeleteOpen = (categoryId) => {
        dispatch(handleDeleteDialog(true))
        setUpdateCategoryId(categoryId);
    };

    const onDelete = () => {
        handleDelete();
        dispatch(handleDeleteDialog(false))

    };


    const handleDelete = () => {
        dispatch(deleteCategory(updateCategoryId)).then((res) => {
            dispatch(getCategory())
        }).then(dispatch(showMessage({ message: "Category Deleted Successfully", variant: 'success' })));
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
                            rowCount={category.length}

                        />
                        <TableBody>
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
                                        >
                                            <Grid container alignItems="center">
                                                <Avatar className='mr-10' sx={{ bgcolor: '#F2F7FB', height: '60px', width: '60px' }} variant="rounded">
                                                    <Avatar variant="rounded" alt={row?.name} src={row.image} />
                                                </Avatar>
                                                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{row?.name}</Typography>
                                            </Grid>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: 16 }} id={labelId} align="left">{row.description}</TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">{formatDate(row.created_at)}</TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left">{formatTime(row.created_at)}</TableCell>
                                        <TableCell sx={{ fontSize: 16 }} align="left" >
                                            <IconButton onClick={() => handleClickOpenEditCategory(row)}>
                                                <EditIcon fontSize='small' sx={{ color: "gray", cursor: 'pointer' }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteOpen(row.id)}>
                                                <DeleteIcon fontSize='small' sx={{ color: "red", cursor: 'pointer' }} />
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
                    </Table>}

                </TableContainer>
            </Grid>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={category.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


            {/* CATEGORY EDIT DIALOG */}
            <Dialog open={editCategotyDialog} onClose={handleClose} >
                <Formik
                    initialValues={{
                        name: editData ? editData.name : "",
                        description: editData ? editData.description : "",
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const categoryData = {
                            name: values.name,
                            description: values.description,
                            categoryId: editData.id
                            // phoneNumber: values.phoneNumber,
                            // gender: values.gender,
                            // email: values.email,
                        };

                        console.log(editData)


                        handleUpdate(categoryData);

                    }}
                >
                    {({ isSubmitting }) => (
                        <Form >
                            <DialogTitle>Edit Category</DialogTitle>
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

            {/* CATEGORY DELETE DIALOG */}
            <Dialog open={deleteCategotyDialog} onClose={handleClose}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>Do you really want to delete this Category?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" sx={{
                        backgroundColor: "#2275fc", borderRadius: 2, color: "#fff", "&:hover": {
                            backgroundColor: "#1953d6" // Change to your desired hover background color
                        }
                    }} >Cancel</Button>
                    <Button type="submit" variant="contained" sx={{
                        backgroundColor: "#2275fc", borderRadius: 2, marginRight: 2, color: "#fff", "&:hover": {
                            backgroundColor: "#1953d6" // Change to your desired hover background color
                        }
                    }} onClick={() => onDelete()}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}