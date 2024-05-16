import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Grid, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import {

    TextField,

    Divider
} from "@mui/material";
import { Link } from 'react-router-dom';
import { deleteItem, getProductSelling, updateProduct } from 'app/store/userSlices/userSellingSlice';
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { showMessage } from 'app/store/fuse/messageSlice';
const SellingProductCard = ({ image, name, price, id ,product}) => {
    const { t } = useTranslation("sellingPage");
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
        // <Link to={`/product-details/${id}`} style={{ textDecoration: "none" }}>
        <>
            <Card sx={{ width: "100%", borderRadius: 2 }}>
                <CardMedia
                    sx={{ height: "200px", width: "100%", objectFit: "cover", padding: 1, borderRadius: 3 }}
                    component="img"
                    image={image}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='font-semibold'>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        ₹ {price}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" size="small" sx={{
                        border: '1px solid #818CF8', borderRadius: 2, color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                            backgroundColor: '#fff', color: '#818CF8',
                        },
                    }} onClick={() => handleUpdateProduct(product)}>
                        <EditIcon sx={{ width: '0.8em' }} /> &nbsp;{t("Edit")}
                    </Button>
                    <Button variant="contained" size="small" sx={{
                        border: '1px solid #818CF8', borderRadius: 2, color: '#818CF8', backgroundColor: '#fff', '&:hover': {
                            backgroundColor: '#818CF8', color: '#fff'
                        },
                    }} onClick={() => handleClickOpen()} >
                        <DeleteIcon sx={{ width: '0.8em' }} /> &nbsp;                  
                          {t('Remove')}

                    </Button>
                </CardActions>
            </Card>
            {/* // </Link> */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{t('Remove_Product')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                      {  t('Do_you_want_to_remove_product')}??
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>{t('Cancel')}</Button>
                    <Button onClick={() => handleDelete(id)} autoFocus>
                    {t('Remove')}
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
                                <Button type="submit" variant="contained" disabled={isSubmitting}>Update Product</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};

export default SellingProductCard;
