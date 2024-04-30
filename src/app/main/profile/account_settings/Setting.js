import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import Container from "@mui/material/Container";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {
  CardActions,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, getprofile, updateProfile } from "../../../store/userSlices/profileSlice";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { showMessage } from "app/store/fuse/messageSlice";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function ExamplePage(props) {
  const { t } = useTranslation("profilePage");
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [updaterepairerId, setUpdaterepairerId] = useState(null);
  const [editProfile, setEditProfile] = useState(true);
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { profile } = useSelector((state) => state.userSlices.profileSlice);

  // Sample user profile data
  const userProfile = {
    username: "Ishu",
    email: "jainishu52@gmail.com",
    // role: "Admin",
    profilePicture: null,
    phoneNumber: "9806999318",
    gender: "male",
  };

  useEffect(() => {
    dispatch(getprofile());
  }, []);

  // Open update profile dialog
  const handleClickOpenUpdate = (data = null) => {
    if (data) {
      setEditData(data);
    } else {
      setEditData(null);
    }
    setAddDialog(true);
    setEditProfile(true);
    setUpdaterepairerId(data._id);
  };

  // Close dialog
  const handleClose = () => {
    setAddDialog(false);
    setEditData(null);
  };

  // Calling the update profile API
  const handleUpdateProfile = (editData) => {
    if (editProfile) {
      dispatch(updateProfile({ editData, updaterepairerId })).then((res) => {
        res.payload.success && dispatch(getprofile()).then(()=>{
          dispatch(showMessage({ message: res.payload.message, variant: 'success' }))
        });
      });
    } else {
      dispatch(changePassword(editData)).then((res) => console.log(res, 'res is'))
    }
    // After successful creation, refresh the property list

    setAddDialog(false);
    setEditProfile(true);
  };

  const handleUpdatePassword = () => {
    setEditProfile(false);
    setAddDialog(true);
  };

  const handleClickShowOldPassword = () => {
    setOldShowPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const validationSchema = Yup.object().shape(editProfile ? {
    phone_number: Yup.number().positive(t("PHONE_NUMBER_MUST_BE_POSITIVE")).required(t("REQUIRED")),
    first_name: Yup.string().required(t("REQUIRED")),
  } : {
    oldPassword: Yup.string().required(t("REQUIRED")),
    newPassword: Yup
      .string()
      .required(t("PLEASE_ENTER_YOUR_PASSWORD"))
      .min(8, t("PASSWORD_IS_TOO_SHORT")),
  });

  return (
    <Root
      header={
        <div className="p-24" style={{ paddingBottom: "10px" }}>
          <h1 style={{ fontWeight: "900" }}>{t("ACCOUNT_SETTINGS")}</h1>
        </div>
      }
      content={
        <Container>
          <Card
            style={{
              maxWidth: "400px",
              margin: "auto",
              marginTop: "20px",
              borderRadius: "0px",
            }}
          >
            <CardContent sx={{ paddingBottom: "10px" }}>
              <Avatar
                style={{ width: "150px", height: "150px", margin: "auto" }}
              />
              <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
              >
              </Typography>
              <Divider variant="middle" className="mx-5" />
              <Grid className="flex w-full justify-center items-center mx-5 mt-10 gap-20">
                <Grid className="flex flex-col  items-start pb-5">
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("EMAIL")}
                  </Typography>

                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("PHONE")}
                  </Typography>

                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("GENDER")}
                  </Typography>
                </Grid>
                <Grid className="flex  flex-col items-start pb-5">
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {profile.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {profile.phone_number}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {profile.gender}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              style={{ justifyContent: "center", paddingBottom: "20px" }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  border: '1px solid #818CF8', borderRadius: 2, color: '#818CF8', backgroundColor: '#fff', '&:hover': {
                    backgroundColor: '#818CF8', color: '#fff'
                  },
                }}
                onClick={() => handleClickOpenUpdate(profile)}
              >
                <EditIcon sx={{ width: '0.8em' }} /> &nbsp;{t("EDIT_PROFILE")}
              </Button>

              <Button
                variant="contained"
                size="small"
                sx={{
                  border: '1px solid #818CF8', borderRadius: 2, color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                    backgroundColor: '#fff', color: '#818CF8'
                  },
                }}
                onClick={() => handleUpdatePassword(profile)}
              >
                <ChangeCircleIcon sx={{ width: '0.8em' }} /> &nbsp;{t("CHANGE_PASSWORD")}
              </Button>
            </CardActions>
          </Card>

          {/* update profile dialog */}
          <Dialog
            open={addDialog}
            onClose={handleClose}
            sx={{ height: "70%", top: "15%", borderRadius: 0 }}
          >
            <Formik
              initialValues={{
                first_name: editData ? editData.first_name : "",
                email: editData ? editData.email : "",
                phone_number: editData ? editData.phone_number : "",
                gender: editData ? editData.gender : "",
                oldPassword: editData ? editData.oldPassword : "",
                newPassword: editData ? editData.newPassword : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const profileData = {
                  first_name: values.first_name,
                  phone_number: values.phone_number,
                };
                const editPassword = {
                  oldPassword: values.oldPassword,
                  new_password: values.newPassword,
                };
                if (editProfile) {
                  handleUpdateProfile(profileData);
                } else {
                  handleUpdateProfile(editPassword);
                }
                setSubmitting(false);
              }}
            >
              {(formik) => {
                return (
                  <Form>
                    <DialogTitle>
                      {editProfile ? t("EDIT_PROFILE") : t("CHANGE_PASSWORD")}
                    </DialogTitle>
                    <Divider variant="middle" />
                    <DialogContent sx={{ paddingBottom: '0px' }}>
                      {editProfile ? (
                        <>
                          <TextField
                            disabled
                            name='email'
                            variant="filled"
                            type='email'
                            label={t("EMAIL")}
                            defaultValue={editData ? editData.email : ""}
                            sx={{ paddingBottom: "15px" }}
                            fullWidth
                            required
                          />
                          <TextField
                            required
                            disabled
                            id="filled-disabled"
                            label={t("ROLE")}
                            defaultValue={editData ? editData.role : ""}
                            variant="filled"
                            sx={{ paddingBottom: "15px" }}
                            fullWidth
                          />
                          <TextField
                            required
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                            id="filled-disabled"
                            name='first_name'
                            label={t("FIRSTNAME")}
                            variant="filled"
                            sx={{ paddingBottom: "15px" }}
                            fullWidth
                          />
                          <TextField
                            name='phone_number'
                            variant="filled"
                            type='number'
                            label={t("PHONE")}
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                            helperText={formik.touched.phone_number && formik.errors.phone_number}
                            sx={{ paddingBottom: "15px" }}
                            fullWidth
                            required
                          />
                        </>
                      ) : (
                        <>
                          <TextField
                            required
                            name='oldPassword'
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                            id="filled-disabled"
                            label={t("OLD_PASSWORD")}
                            variant="filled"
                            sx={{ paddingBottom: "15px" }}
                            fullWidth
                          />
                          <TextField
                            required
                            name='newPassword'
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                            id="filled-disabled"
                            label={t("NEW_PASSWORD")}
                            variant="filled"
                            sx={{ paddingBottom: "15px" }}
                            fullWidth
                          />
                        </>
                      )}
                    </DialogContent>
                    <DialogActions sx={{ paddingBottom: '10px' }}>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                          backgroundColor: "lightgrey", borderRadius: 2, color: "black", "&:hover": {
                            backgroundColor: "gray", color: '#fff'
                          }
                        }}
                      >
                        {t("CANCEL")}
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          border: '1px solid #818CF8', borderRadius: 2, color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                            backgroundColor: '#fff', color: '#818CF8'
                          },
                        }}
                        disabled={formik.isSubmitting}
                      >
                        {t("EDIT")}
                      </Button>
                    </DialogActions>
                  </Form>
                )
              }}
            </Formik>
          </Dialog>

        </Container>
      }
    />
  );
}

export default ExamplePage;
