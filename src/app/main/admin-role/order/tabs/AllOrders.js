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
import { Avatar, Button, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { Link } from 'react-router-dom';
import { getactiveProducts } from 'app/store/admin/productStatusSlice';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';


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
function stableSort(activeProducts, comparator) {
  const stabilizedThis = activeProducts.map((el, index) => [el, index]);
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
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Product',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'Date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'Time',
    numeric: true,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'seller_name',
    numeric: true,
    disablePadding: false,
    label: 'Seller Name',
  },
  {
    id: 'seller_contact',
    numeric: true,
    disablePadding: false,
    label: 'Seller Mobile No',
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
          Active Products
        </Typography>

      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const { t } = useTranslation("");
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { activeProducts, loading } = useSelector((state) => state.admin.productStatusSlice)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getactiveProducts())
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - activeProducts.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(activeProducts, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, activeProducts],
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
          <Table
            sx={{ width: "100%" }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={activeProducts.length}
            />
            {(activeProducts?.length > 0 && !loading.activeProductsLoading) && <TableBody >
              {activeProducts?.map((row, index) => {
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
                      sx={{ padding: '16px 24px' }}
                      align='left'
                    >
                      <Grid container alignItems="center">
                        <Avatar className='mr-10' sx={{ bgcolor: '#F2F7FB', height: '60px', width: '60px' }} variant="rounded">
                          <Avatar variant="rounded" alt={row?.name} src={row?.images[0].image} />
                        </Avatar>
                        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{row?.name}</Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ fontSize: 16 }} align="left">₹ {row.price}</TableCell>
                    <TableCell sx={{ fontSize: 16 }} align="left">{formatDate(row.created_at)}</TableCell>
                    <TableCell sx={{ fontSize: 16 }} align="left">{formatTime(row.created_at)}</TableCell>
                    <TableCell sx={{ fontSize: 16 }} align="left">{`${row?.seller?.first_name} ${row?.seller?.last_name}`}</TableCell>
                    <TableCell sx={{ fontSize: 16 }} align="left">{`${row?.seller?.phone_number}`}</TableCell>

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
            </TableBody>}
          </Table>
          {loading.activeProductsLoading && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
            <Grid item><FuseLoading /></Grid>
          </Grid>}
          {(activeProducts?.length <= 0 && !loading.activeProductsLoading) && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
            <Grid item>
              <InfoIcon sx={{ color: '#818CF8', fontSize: 40 }} />
            </Grid>
            <Grid item>
              <Typography fontSize={18} fontWeight={600}>{t('NO_ACTIVE_PRODUCTS_FOUND')}</Typography>
            </Grid>
          </Grid>}
        </TableContainer>
      </Grid>
    </Box>
  );
}