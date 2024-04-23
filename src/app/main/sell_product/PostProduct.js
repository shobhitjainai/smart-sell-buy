import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { TextField, Button, Grid, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { Formik, Form, Field } from 'formik';
import { createProduct } from 'app/store/userSlices/userSellingSlice';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from 'app/store/fuse/messageSlice';
import { useNavigate } from 'react-router-dom';


const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
    },
    '& .FusePageSimple-toolbar': {},
    '& .FusePageSimple-content': { display: 'block' },
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {},
}));

const PostProduct = () => {
    const { t } = useTranslation();
    const [photos, setPhotos] = useState([]); // State for uploaded photos
    const [error, setError] = useState('');
    const { latlong } = useSelector((state) => state.userSlices.userSellingSlice)

    const { subcategory } = useSelector((state) => state.userSlices.userSellingSlice)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    // Function to handle photo selection
    const handlePhotoChange = (e, setFieldValue) => {
        const files = Array.from(e.target.files);
        setPhotos(prevPhotos => [...prevPhotos, ...files.slice(0, 6 - prevPhotos.length)]);
        setFieldValue('photos', [...files]);
    };



    const handleCreateProduct = async (productData) => {
        try {
            await dispatch(createProduct({ productData }));
            const role = localStorage.getItem('auth_role') === 'user' ? navigate('/user/home') : navigate('/admin/products/productslist');
            // navigate('/home');
            dispatch(showMessage({ message: "Product Created Successfully", variant: 'success' }));

        } catch (error) {
            console.error("Error creating property:", error);
        }
    };


    const validationSchema = Yup.object().shape({
        // property_name: Yup.string().min(3, t("Minimum")).required(t("Required")),
        // total_rooms: Yup.number()
        //   .integer(t("Integer")) // Add parentheses here
        //   .required(t("Required")),
        // price: Yup.number().positive(t("Positive")).required(t("Required")),
        // property_capacity: Yup.number()
        //   .integer(t("Integer")) // Add parentheses here
        //   .required(t("Required")),
        // address1: Yup.string().required(t("Required")),
        // address2: Yup.string().required(t("Required")),
        // city: Yup.string().required(t("Required")), // Add comma here
        // postcode: Yup.string().required(t("Required")),
        // description: Yup.string().required(t("Required")),
        // state: Yup.string().required(t("Required")),
    });
    return (
        <Root
            header={<div className="p-24 ">
                <h1 className='font-bold'>{t('Product Info')}</h1>
                <p>{t('Please fill product information')}</p></div>}
            content={
                <Grid className="flex justify-center item-center">
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            price: '',
                            condition: '',
                            photos: [],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            // Handle form submission here

                            const productData = {
                                name: values.title,
                                description: values.description,
                                price: values.price,
                                seller: values.property_capacity,
                                subcategory: subcategory,
                                address: latlong.address,
                                longitude: latlong.lat,
                                latitude: latlong.lng,
                                photos: values.photos,
                            };

                            handleCreateProduct(productData);
                            setSubmitting(false);

                            if (values.photos.length < 6) {
                                setError('Please upload at least 6 images.');
                                setSubmitting(false);
                                return;
                            }
                            setError('');
                            // Submit values to backend or do further processing
                            console.log('Form values:', values);
                            // Reset form
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className="p-28">
                                    {/* Upload photos field */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 20 }}>
                                        {photos.map((photo, index) => (
                                            <div key={index} style={{ width: 100, height: 100, margin: 5, overflow: 'hidden', position: 'relative' }}>
                                                <img
                                                    src={URL.createObjectURL(photo)}
                                                    alt={`Uploaded Image ${index}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handlePhotoChange(e, setFieldValue)}
                                    />
                                    <Field
                                        name="title"
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('Title')}
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                        )}
                                    />
                                    <Field
                                        name="description"
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('Description')}
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                margin="normal"
                                                inputProps={{ maxLength: 200 }}
                                                required
                                            />
                                        )}
                                    />
                                    <Field
                                        name="price"
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('Price')}
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                        )}
                                    />
                                    {/* Radio buttons for condition */}
                                    <FormLabel id="demo-row-radio-buttons-group-label">Condition</FormLabel>
                                    <Field
                                        name="condition"
                                        render={({ field }) => (
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                aria-label="condition"
                                                {...field}
                                            >
                                                <FormControlLabel value="new" control={<Radio />} label={t('New')} />
                                                <FormControlLabel value="used" control={<Radio />} label={t('Used')} />
                                                <FormControlLabel value="used-like-new" control={<Radio />} label={t('Used-Like New')} />
                                            </RadioGroup>
                                        )}
                                    />
                                    {/* Display error message if any */}
                                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                                    <Button className='text-white' type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                        Create Product
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            }
            scroll="content"
        />
    );
};

export default PostProduct;
