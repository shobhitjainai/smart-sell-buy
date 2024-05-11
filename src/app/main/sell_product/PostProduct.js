import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { TextField, Button, Grid, Radio, RadioGroup, FormControlLabel, Typography, Box, Breadcrumbs, Divider, InputAdornment } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { Formik, Form, Field } from 'formik';
import { createProduct } from 'app/store/userSlices/userSellingSlice';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from 'app/store/fuse/messageSlice';
import { useNavigate, Link } from 'react-router-dom';
import SearchLocationInput from './Location';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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
    const { t } = useTranslation('addProduct');
    const imageRef = useRef()
    const { subcategory, category } = useSelector((state) => state.userSlices.userSellingSlice)
    const breadcrumbs = [
        <Link style={{ color: 'gray' }} to='/user/sell-product'>
            {category?.name ?? t('PLEASE_SELECT_CATEGORY')}
        </Link>,
        <Link style={{ color: 'gray' }} to={`/sellproductsubcategory/${category?.id}`}>
            {subcategory?.name ?? t('PLEASE_SELECT_SUBCATEGORY')}
        </Link>,
        <Typography
            key="3"
            color="#7588A3 !important"
            sx={{
                textDecoration: 'none !important', '&:hover': {
                    textDecoration: 'underline !important',
                    color: '#111827 !important'
                },
            }}
        >
            {t('DETAILS')}
        </Typography>,
    ];
    const [photos, setPhotos] = useState([]); // State for uploaded photos
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handlePhotoChange = (e, formik) => {
        const files = Array.from(e.target.files);
        setPhotos(prevPhotos => [...prevPhotos, ...files.slice(0, 6 - prevPhotos.length)]);
        formik.values.photos ? formik.setFieldValue('photos', [...files, ...formik.values.photos]) : formik.setFieldValue('photos', [...files]);
    };
    const handleCreateProduct = (productData) => {
        dispatch(createProduct({ productData })).then((res) => {
            const role = localStorage.getItem('auth_role') === 'user' ? navigate('/user/home') : navigate('/admin/products/productslist');
            dispatch(showMessage({ message: "Product Created Successfully", variant: 'success' }));
        })
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('REQUIRED')),
        description: Yup.string().required(t('REQUIRED')),
        price: Yup.number().required(t('REQUIRED')),
        condition: Yup.string().required(t('REQUIRED')),
        photos: Yup.array()
            .of(
                Yup.mixed().test(
                    'fileType',
                    'Invalid file type',
                    (value) => value && value instanceof File
                )
            ).nullable().required(t('PHOTOS_ARE_REQUIRED')),
        address: Yup.mixed().required(t('REQUIRED'))
    });
    return (
        <div className="p-24">
            <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
                <Grid container display={'flex'} justifyContent={'space-between'}>
                    <Grid item xs={12} sx={{ padding: '28px 28px 0px 28px' }}>
                        <Typography fontSize={24} fontWeight={500} className='pb-5'>{t('SELECTED_CATEGORY')}</Typography>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Grid>
                    <Grid xs={12} item className='mt-20'>
                        <Divider />
                    </Grid>
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            price: '',
                            condition: '',
                            photos: null,
                            address: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            // Handle form submission here
                            const productData = {
                                name: values.name,
                                description: values.description,
                                price: values.price,
                                condition: values.condition,
                                subcategory: subcategory?.id,
                                address: values.address.address,
                                longitude: values.address.lat,
                                latitude: values.address.lng,
                                photos: values.photos,
                            };
                            handleCreateProduct(productData);
                            setSubmitting(false);

                            if (values.photos.length < 6) {
                                setError('Please upload at least 6 images.');
                                setSubmitting(false);
                                return;
                            }
                            setSubmitting(false);
                        }}
                    >
                        {(formik) => {
                            return (<Form>
                                <Grid container>
                                    <Grid container item xs={12} spacing={2} sx={{ margin: "15px 28px 15px 28px" }}>
                                        <Grid xs={12} sx={{ paddingBottom: '15px !important' }}>
                                            <Typography fontSize={24} fontWeight={500}>{t('UPLOAD_UPTO_6_IMAGES')}</Typography>
                                        </Grid>
                                        <Grid item sx={{ border: '1px solid', width: '100px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', padding: '0 !important' }} onClick={() => imageRef.current.click()} className='mr-8'>
                                            {formik.values.photos?.length > 6
                                                ?
                                                <Typography>Done</Typography>
                                                :
                                                <>
                                                    <AddAPhotoIcon />
                                                    <Typography>{t('ADD_PHOTO')}</Typography>
                                                </>
                                            }
                                        </Grid>
                                        <Grid display={'flex'} spacing={2} item sx={{ padding: '0 !important', gap: '8px' }}>
                                            {photos.map((photo, index) => (
                                                <div key={index} style={{ width: 100, height: 100 }}>
                                                    <img
                                                        src={URL.createObjectURL(photo)}
                                                        alt={`Uploaded Image ${index}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            ))}
                                        </Grid>
                                        <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}><Typography color='lightslategray'>{t('SELECT_AT_LEAST_1_IMAGE')}</Typography></Grid>
                                    </Grid>
                                    <Grid xs={12} item sx={{ margin: '15px 0' }}>
                                        <Divider />
                                    </Grid>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        multiple
                                        ref={imageRef}
                                        onChange={(e) => handlePhotoChange(e, formik)}
                                    />
                                    <Grid container item xs={12} spacing={2} gap={2} sx={{ margin: "15px 28px 15px 28px" }}>
                                        <Grid xs={12}>
                                            <Typography fontSize={24} fontWeight={500}>{t('INCLUDE_SOME_DETAILS')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ padding: '0 !important' }}>
                                            <TextField
                                                name='name'
                                                varient='contained'
                                                type='text'
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('PRODUCT_NAME')}
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sx={{ padding: '0 !important' }}>
                                            <TextField
                                                name='description'
                                                varient='contained'
                                                type='text'
                                                placeholder={t('PRODUCT_DESCRIPTION')}
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.description && Boolean(formik.errors.description)}
                                                helperText={formik.touched.description && formik.errors.description}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} item sx={{ margin: '15px 0' }}>
                                        <Divider />
                                    </Grid>
                                    <Grid container item xs={12} spacing={2} gap={2} sx={{ margin: "15px 28px 15px 28px" }}>
                                        <Grid xs={12}>
                                            <Typography fontSize={24} fontWeight={500}>{t('SET_A_PRICE')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ padding: '0 !important' }}>
                                            <TextField
                                                name='price'
                                                varient='contained'
                                                type='number'
                                                value={formik.values.price}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t('PRODUCT_PRICE')}
                                                error={formik.touched.price && Boolean(formik.errors.price)}
                                                helperText={formik.touched.price && formik.errors.price}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                }}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} item sx={{ margin: '15px 0' }}>
                                        <Divider />
                                    </Grid>
                                    <Grid container item xs={12} spacing={2} sx={{ margin: "15px 28px 15px 28px" }}>
                                        <Grid xs={12}>
                                            <Typography fontSize={24} fontWeight={500}>{t('CONDITION_OF_THE_PRODUCT')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ padding: '0 !important' }}>
                                            <Field
                                                name="condition"
                                                render={({ field }) => (
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        aria-label="condition"
                                                        {...field}
                                                    >
                                                        <FormControlLabel value="new" control={<Radio />} label={t('NEW')} />
                                                        <FormControlLabel value="used" control={<Radio />} label={t('USED')} />
                                                        <FormControlLabel value="used-like-new" control={<Radio />} label={t('USED_LIKE_NEW')} />
                                                    </RadioGroup>
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} item sx={{ margin: '15px 0' }}>
                                        <Divider />
                                    </Grid>
                                    <Grid container item xs={12} spacing={2} sx={{ margin: "15px 28px 15px 28px" }}>
                                        <Grid xs={12}>
                                            <Typography fontSize={24} fontWeight={500}>{t('SELECT_YOUR_LOCATION')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ padding: '15px 0 15px 0 !important' }}>
                                            <SearchLocationInput formik={formik} />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} spacing={2} sx={{ margin: "15px 28px 15px 28px" }}>
                                        <Grid xs={12}>
                                            <Button type="submit" variant="contained" color="primary" sx={{
                                                width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#818CF8", color: '#fff', backgroundColor: '#818CF8', border: 1, '&:hover': {
                                                    backgroundColor: '#fff', // Change this to the desired hover background color
                                                    color: '#818CF8', borderColor: "#818CF8"// Change this to the desired hover text color
                                                },
                                            }} disabled={Object.keys(formik.errors).length > 0 || formik.isSubmitting}>
                                                {t('CREATE_PRODUCT')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                            )
                        }
                        }
                    </Formik>
                </Grid>
            </Box>
        </div>
    );
};

export default PostProduct;
