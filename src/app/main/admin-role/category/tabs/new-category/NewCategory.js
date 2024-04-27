import { useState } from 'react'; // Import useState hook
import { useTranslation } from 'react-i18next';
import { Grid, Typography, TextField, Paper, Button, Box } from '@mui/material';
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

    const handleCreateCategory = (data) => {
        dispatch(createCategory(data)).then((res) => {
            if (res?.payload?.success) {
                dispatch(showMessage({ message: "Category Created Successfully", variant: 'success' }));
                navigate('/admin/category/categorylist');
            } else {
                if (res.payload.error) {
                    const msg = Object.values(res.payload.error)
                    dispatch(showMessage({ message: msg[0], variant: 'error' }));
                } else {
                    dispatch(showMessage({ message: "Something went wrong", variant: 'error' }));
                }
            }
        })
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        image: Yup.mixed().nullable(),
    });
    return (
        <div className="p-24">
            <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
                <Grid container display={'flex'} justifyContent={'space-between'}>
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            image: [],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const data = {
                                name: values.name,
                                description: values.description,
                                image: values.image,
                            };
                            handleCreateCategory(data);
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <Grid className='p-36' spacing={3} rowSpacing={4} container item>
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>Name of Category</Typography></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name='name'
                                                varient='contained'
                                                type='text'
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder='name'
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>Add Description</Typography></Grid>
                                        <Grid item xs={6}><TextField
                                            name='description'
                                            varient='contained'
                                            type='text'
                                            placeholder='description'
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                            fullWidth
                                            required
                                        /></Grid>
                                    </Grid>
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>Upload Image</Typography></Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                name="image"
                                                render={({ field }) => (
                                                    <TextField
                                                        varient='contained'
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => {
                                                            formik.setFieldValue("image", event.currentTarget.files[0]);
                                                        }}
                                                        fullWidth
                                                        required
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item container alignItems={'center'} className='mt-20' justifyContent={'center'}>
                                        <Button type='submit' disabled={formik?.isSubmitting} variant='outlined' color='primary' sx={{
                                            width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#818CF8", color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                                                backgroundColor: '#fff', // Change this to the desired hover background color
                                                color: '#818CF8', borderColor: "#818CF8" // Change this to the desired hover text color
                                            },
                                        }}>Create Category</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Box>
        </div >
    );
}

export default NewCategoryPage;
