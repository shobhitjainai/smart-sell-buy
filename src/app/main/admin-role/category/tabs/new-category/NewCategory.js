import { useState } from 'react'; // Import useState hook
import { useTranslation } from 'react-i18next';
import { Grid, Typography, TextField, Paper, Button } from '@mui/material';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCategory } from 'app/store/admin/CategorySlice';
import { showMessage } from 'app/store/fuse/messageSlice';

function NewCategoryPage(props) {
    const { t } = useTranslation('examplePage');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateCategory = async (categoryData) => {

        dispatch(createCategory(categoryData));
        navigate('/admin/category/categorylist');
        dispatch(showMessage({ message: "Category Created Successfully", variant: 'success' }));
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
        <Grid container justifyContent="center" sx={{ my: 6, background: "#fff", borderRadius: 4 }} spacing={0} className='w-11/12 mx-auto'>

            <Grid item xs={6} md={4} sx={{ paddingLeft: "23px" }}>
                <Typography variant="h5" component="h5" sx={{ my: 6 }} className='semi-bold'>
                    Product name
                </Typography>
                <Typography variant="h5" component="h5" sx={{ my: 6 }} className='semi-bold'>
                    Upload image
                </Typography>

                <Typography variant="h5" component="h5" sx={{ my: 8 }} className='semi-bold'>
                    Description
                </Typography>
            </Grid>
            <Grid container xs={6} md={8} direction="column" sx={{ paddingLeft: "18px" }}>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        photos: [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        // Handle form submission here

                        const categoryData = {
                            name: values.name,
                            description: values.description,
                            photos: values.photos,
                        };

                        handleCreateCategory(categoryData);
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
                            <Field
                                name="name"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={t('Category Name')}
                                        variant="outlined"
                                        sx={{ my: 6, width: "80%" }}
                                        // fullWidth
                                        required
                                    />

                                )}
                            />

                            {/* Image upload input */}
                            <Field
                                name="photos"
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            setFieldValue("photos", event.currentTarget.files[0]);
                                        }}
                                        sx={{ my: 6 }}
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
                                        required
                                        sx={{ mt: 6, mb: 2, width: "80%" }}
                                        fullWidth />

                                )}
                            />

                            <Button type="submit" variant="contained" sx={{ marginRight: 90, background: "#818CF8", my: 3 }}>Create</Button>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

export default NewCategoryPage;
