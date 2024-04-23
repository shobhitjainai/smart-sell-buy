import { React, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    Grid, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import {



    TextField,

    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    TablePagination,
    Box,
    TableSortLabel,
    Divider
} from "@mui/material";
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItem, getProductSelling, updateProduct } from 'app/store/userSlices/userSellingSlice';
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import { showMessage } from 'app/store/fuse/messageSlice';


export default function ImgMediaCard({ item }) {
    const { t } = useTranslation("propertyPage");
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [addDialog, setAddDialog] = useState(false);
    const [updateproductId, setUpdateproductId] = useState(null);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
        // handleDelete(id);
    };

    const handleDelete = (id) => {
        dispatch(deleteItem(id)).then((res) => {
            res.payload.success && dispatch(getProductSelling());
        });
        setOpen(false);
    };


    const handleClose = () => {
        setAddDialog(false);
        // setEditData(null);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("Required")),
        description: Yup.string().required(t("Required")),
        price: Yup.string().required(t("Required")),
    });

    const handleUpdateProduct = (data = null) => {
        if (data) {
            setEditData(data);
        } else {
            setEditData(null);
        }
        setAddDialog(true);
        setUpdateproductId(data ? data.id : null);
    };

    const handleUpdate = (productData) => {
        dispatch(updateProduct({ productData, updateproductId })).then((res) => {
            res.payload.success && dispatch(getProductSelling())
                && dispatch(showMessage({ message: "Product Updated Successfully", variant: 'success' }))
        });
        setAddDialog(false);
    };


    return (
        <>
            <Card className='flex w-1/2 rounded-lg mb-12'>

                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={item.images[0].image}
                    className='w-1/6'
                />
                <Grid className='w-5/6'>

                    <CardContent>

                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>

                    </CardContent>
                    <CardActions>

                        <Link
                            to={`/product-details/${item.id}`}
                            style={{ textDecoration: "none" }}>
                            <Button size="small" variant='contained' className='rounded-none mr-10'>View Product</Button>
                        </Link>
                        <Button size="small" variant='contained' className='rounded-none' onClick={() => handleUpdateProduct(item)}>Edit Product</Button>

                        <IconButton onClick={() => handleClickOpen()}
                            aria-label="delete" style={{ top: 0, right: 0 }}>
                            <DeleteIcon />
                        </IconButton>

                    </CardActions>
                </Grid>
            </Card>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete product??
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleDelete(item.id)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* UPDATE PRODUCT */}

            <Dialog open={addDialog} onClose={handleClose}>
                <Formik
                    initialValues={{
                        name: editData ? editData.name : "",
                        description: editData ? editData.description : "",
                        price: editData ? editData.price : "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const productData = {
                            name: values.name,
                            description: values.description,
                            price: values.price,
                        };
                        handleUpdate(productData);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <DialogTitle>Update Product</DialogTitle>
                            <Divider variant="middle" />
                            <DialogContent>
                                <Field
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                />
                                <ErrorMessage name="name" />
                                <Field
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="description"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                />
                                <ErrorMessage name="description" />
                                <Field
                                    margin="dense"
                                    id="price"
                                    name="price"
                                    label="price"
                                    type="text"
                                    fullWidth
                                    as={TextField}
                                />
                                <ErrorMessage name="price" />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} variant="contained">{t("Cancel")}</Button>
                                <Button type="submit" variant="contained"  disabled={isSubmitting}>Update Product</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>

        </>
    );
}