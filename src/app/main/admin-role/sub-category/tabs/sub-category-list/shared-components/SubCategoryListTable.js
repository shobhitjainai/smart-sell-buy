import FuseLoading from '@fuse/core/FuseLoading';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { deleteSubCategory, getSubCategories, updateSubCategory } from 'app/store/admin/SubCategorySlice'
import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getCategory } from 'app/store/admin/CategorySlice';
import { get } from 'lodash';
import useDialogState from 'src/app/utils/hooks/useDialogState';
import { showMessage } from 'app/store/fuse/messageSlice';
import InfoIcon from '@mui/icons-material/Info';
import * as Yup from "yup";

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

const SubCategoryListTable = () => {
  const dispatch = useDispatch()
  const { loading, subCategories } = useSelector(state => state.admin.SubCategory)
  const { category } = useSelector((state) => state.admin.CategorySlice)
  const { dialogState: deleteSubCategoryDialog, handleOpen: handleDeleteSubCategoryDialogOpen, handleClose: handleDeleteSubCategoryDialogClose } = useDialogState()
  const { dialogState: updateSubCategoryDialog, handleOpen: handleUpdateSubCategoryDialogOpen, handleClose: handleUpdateSubCategoryDialogClose } = useDialogState()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteSubCategory = () => {
    dispatch(deleteSubCategory(deleteSubCategoryDialog?.data)).then((res) => {
      console.log("🚀 ~ dispatch ~ res:", res)
      handleDeleteSubCategoryDialogClose()
      dispatch(getSubCategories())
      dispatch(showMessage({ message: "Sub-Category Deleted Successfully", variant: 'success' }));
    })
  }

  const handleUpdateSubCategory = ({ data, id }) => {
    dispatch(updateSubCategory({ data, id })).then((res) => {

    })
  }

  useEffect(() => {
    dispatch(getCategory()).then(() => {
      dispatch(getSubCategories())
    })
  }, [])
  return (
    <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
      <Grid className='px-24 pt-32' container xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <Typography
            variant="h6"
            id="tableTitle"
          >
            Sub-Category
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/admin/sub-category/new-sub-category">
            <Button variant='outlined' color='primary' sx={{
              width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#818CF8", color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                backgroundColor: '#fff', // Change this to the desired hover background color
                color: '#818CF8', borderColor: "#818CF8" // Change this to the desired hover text color
              },
            }}>Add New</Button>
          </Link>
        </Grid>


      </Grid>
      <Grid container className='p-24'>
        <TableContainer className='justify-between'>
          <Table
            sx={{ width: "100%" }}
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                      scope="row"
                      align='left'
                      sx={{ padding: '16px 24px' }}
                    >
                      <Grid container alignItems="center">
                        <Avatar className='mr-10' sx={{ bgcolor: '#F2F7FB', height: '60px', width: '60px' }} variant="rounded">
                          <Avatar variant="rounded" alt={row?.name} src={row.image} />
                        </Avatar>
                        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{row?.name}</Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{category?.find(({ id }) => id == row?.category)?.name}</TableCell>
                    <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.description}</TableCell>
                    <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="center" >
                      <IconButton onClick={() => handleUpdateSubCategoryDialogOpen(row)}>
                        <EditIcon fontSize='small' sx={{ color: "gray", cursor: 'pointer' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSubCategoryDialogOpen(row?.id)}>
                        <DeleteIcon fontSize='small' sx={{ color: "red", cursor: 'pointer' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {loading.subCategoriesLoading && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
            <Grid item><FuseLoading /></Grid>
          </Grid>}
          {(subCategories.length <= 0 && !loading.subCategoriesLoading) && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
            <Grid item>
              <InfoIcon sx={{ color: '#818CF8', fontSize: 40 }} />
            </Grid>
            <Grid item>
              <Typography fontSize={18} fontWeight={600}>No Sub-categories are there!!</Typography>
            </Grid>
          </Grid>}
        </TableContainer>
      </Grid>
      {subCategories.length > 0 && <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={subCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}


      {/* CATEGORY EDIT DIALOG */}
      <Dialog open={updateSubCategoryDialog.isOpen} onClose={handleUpdateSubCategoryDialogClose} >
        <Formik
          initialValues={{
            name: updateSubCategoryDialog?.data ? updateSubCategoryDialog?.data?.name : "",
            description: updateSubCategoryDialog?.data ? updateSubCategoryDialog?.data?.description : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const data = {
              name: values.name,
              description: values.description,
            };
            handleUpdateSubCategory({ data, id: updateSubCategoryDialog?.data?.id });
          }}
        >
          {(formik) => (
            <Form >
              <DialogTitle>Edit Sub-Category</DialogTitle>
              <Divider variant="middle" />
              <DialogContent>
                <TextField
                  name='name'
                  varient='contained'
                  label='Name'
                  type='text'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='name'
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ marginBottom: '20px' }}
                  fullWidth
                  required
                />
                <TextField
                  name='description'
                  varient='contained'
                  label='Description'
                  type='text'
                  placeholder='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  fullWidth
                  required
                />

              </DialogContent>
              <DialogActions className='pr-24 pb-12'>
                <Button onClick={handleUpdateSubCategoryDialogClose} variant="contained" sx={{
                  backgroundColor: "#2275fc", borderRadius: 2, color: "#fff", "&:hover": {
                    backgroundColor: "#1953d6" // Change to your desired hover background color
                  }
                }} >Cancel</Button>
                <Button type="submit" variant="contained" sx={{
                  backgroundColor: "#2275fc", borderRadius: 2, color: "#fff", "&:hover": {
                    backgroundColor: "#1953d6" // Change to your desired hover background color
                  }
                }} disabled={formik.isSubmitting}>Edit</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* CATEGORY DELETE DIALOG */}
      <Dialog open={deleteSubCategoryDialog.isOpen} onClose={handleDeleteSubCategoryDialogClose}>
        <DialogTitle>Delete Sub-category</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to delete this Sub-category?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteSubCategoryDialogClose} variant="contained" sx={{
            backgroundColor: "#2275fc", borderRadius: 2, color: "#fff", "&:hover": {
              backgroundColor: "#1953d6" // Change to your desired hover background color
            }
          }} >Cancel</Button>
          <Button type="submit" variant="contained" sx={{
            backgroundColor: "#2275fc", borderRadius: 2, marginRight: 2, color: "#fff", "&:hover": {
              backgroundColor: "#1953d6" // Change to your desired hover background color
            }
          }} onClick={() => handleDeleteSubCategory()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box >
  )
}

export default SubCategoryListTable