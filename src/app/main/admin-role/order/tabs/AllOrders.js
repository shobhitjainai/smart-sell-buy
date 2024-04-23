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
import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from 'app/store/admin/CategorySlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { Link } from 'react-router-dom';

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
        label: 'Order ID',
    },
    {
        id: 'gender',
        numeric: false,
        disablePadding: false,
        label: 'Item',
    },
    {
        id: 'phoneNumber',
        numeric: true,
        disablePadding: false,
        label: 'Date & Time',
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Customer Name',
    },
    {
        id: 'Actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },

];


const dummyData = [
    {
      "email": "user1@gmail.com",
      "first_name": "John",
      "last_name": "Doe",
      "gender": "male",
      "phone_number": "1234567890"
    },
    {
      "email": "user2@gmail.com",
      "first_name": "Jane",
      "last_name": "Smith",
      "gender": "female",
      "phone_number": "2345678901"
    },
    {
      "email": "user3@gmail.com",
      "first_name": "Michael",
      "last_name": "Johnson",
      "gender": "male",
      "phone_number": "3456789012"
    },
    {
      "email": "user4@gmail.com",
      "first_name": "Emily",
      "last_name": "Brown",
      "gender": "female",
      "phone_number": "4567890123"
    },
    {
      "email": "user5@gmail.com",
      "first_name": "David",
      "last_name": "Martinez",
      "gender": "male",
      "phone_number": "5678901234"
    },
    {
      "email": "user6@gmail.com",
      "first_name": "Sarah",
      "last_name": "Garcia",
      "gender": "female",
      "phone_number": "6789012345"
    },
    {
      "email": "user7@gmail.com",
      "first_name": "Christopher",
      "last_name": "Lopez",
      "gender": "male",
      "phone_number": "7890123456"
    }
  ]
  

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
//                         // align={headCell.numeric ? 'right' : 'left'}
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
                    All Orders
                </Typography>

            )}
            <Link to="/admin/category/newCategory">
            <Button variant='outlined' color='primary' sx={{
                width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#3180FC", color: '#3180FC', '&:hover': {
                    backgroundColor: '#3180FC', // Change this to the desired hover background color
                    color: '#fff', borderColor: "#3180FC" // Change this to the desired hover text color
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

    const { category, loading } = useSelector((state) => state.admin.CategorySlice)

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

                        <TableBody className='p-52'>
                            {dummyData.map((row, index) => {
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
                                            sx={{ paddingBlock: 3 }}
                                        >
                                            <Grid container alignItems="center">
                                                <img src={row.picture} width="70px" height='50px' alt={row.first_name} className='pr-24' />
                                                <Typography className='text-xl' >{`${row.first_name} ${row.last_name}`}</Typography>
                                            </Grid>
                                        </TableCell>
                                        <TableCell id={labelId} align="left">{row.gender}</TableCell>
                                        <TableCell align="left">{row.phone_number}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left" >
                                            <EditIcon fontSize='small' sx={{ color: "green", }} />
                                            <DeleteIcon fontSize='small' sx={{ color: "red" }} />
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={category.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}