import { useTranslation } from 'react-i18next';
import { Grid, Typography, TextField, Paper, Button, Box, getCardActionAreaUtilityClass, MenuItem } from '@mui/material';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategory } from 'app/store/admin/CategorySlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useEffect } from 'react';
import { addSubCategory } from 'app/store/admin/SubCategorySlice';

function NewSubCategoryPage(props) {
    const { t } = useTranslation('adminSubCategoryPage');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.admin.CategorySlice)

    const handleCreateSubCategory = (data) => {
        dispatch(addSubCategory(data)).then((res) => {
            if (res?.payload?.success) {
                dispatch(showMessage({ message: "Sub-Category Created Successfully", variant: 'success' }));
                navigate('/admin/sub-category/sub-category-list');
            } else {
                dispatch(showMessage({ message: "Something went wrong", variant: 'error' }));
            }
        })
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('REQUIRED')),
        category: Yup.string().nullable().required(t('REQUIRED')),
        description: Yup.string().required(t('REQUIRED')),
        image: Yup.mixed().nullable(),
    });
    useEffect(() => {
        dispatch(getCategory())
    }, [])
    return (
        <div className="p-24">
            <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
                <Grid container display={'flex'} justifyContent={'space-between'}>
                    <Formik
                        initialValues={{
                            name: '',
                            category: null,
                            description: '',
                            image: [],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const data = {
                                name: values.name,
                                category: values.category,
                                description: values.description,
                                image: values.image,
                            };
                            handleCreateSubCategory(data);
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <Grid className='p-36' spacing={3} rowSpacing={4} container item>
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={24} fontWeight={500}>{t("NAME_OF_SUB_CATEGORY")}</Typography></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name='name'
                                                varient='contained'
                                                type='text'
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder={t("NAME")}
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={24} fontWeight={500}>{t("SELECT_CATEGORY")}</Typography></Grid>
                                        <Grid item xs={6}><TextField
                                            name='category'
                                            varient='contained'
                                            select
                                            type='text'
                                            value={formik.values.category ?? 1}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.category && Boolean(formik.errors.category)}
                                            helperText={formik.touched.category && formik.errors.category}
                                            fullWidth
                                            required
                                        >
                                            <MenuItem value={1} disabled>{t("SELECT_CATEGORY")}</MenuItem>
                                            {category?.map((opt) => <MenuItem value={opt.id}>{opt?.name}</MenuItem>)}
                                        </TextField></Grid>
                                    </Grid>
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={24} fontWeight={500}>{t("ADD_DESCRIPTION")}</Typography></Grid>
                                        <Grid item xs={6}><TextField
                                            name='description'
                                            varient='contained'
                                            type='text'
                                            placeholder={t("DESCRIPTION")}
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
                                        <Grid item xs={4}><Typography fontSize={24} fontWeight={500}>{t("UPLOAD_IMAGE")}</Typography></Grid>
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
                                        }}>{t("CREATE_SUB_CATEGORY")}</Button>
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

export default NewSubCategoryPage;
