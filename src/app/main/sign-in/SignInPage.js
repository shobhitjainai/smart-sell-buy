import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import jwtService from "../../auth/services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {
    setValue("email", "admin@gmail.com", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "Asdf@123", { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  // admin@gmail.com
  // Asdf@123



  function onSubmit({ email, password }) {
    const fcmToken = 'DemoToken';
    jwtService
      .signInWithEmailAndPassword(email, password, fcmToken)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        console.log("🚀 ~ file: SignInPage.js:60 ~ onSubmit ~ _errors:", _errors)
        dispatch(showMessage({ message: "Invalid Credentials", variant: 'error' }));
      });
  }



  return (

    <div className="flex justify-center h-screen items-center w-full">
      <Paper sx={{ width: { xs: '95%', sm: '80%', md: '60%', lg: '33%' } }} className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center p-35 w-3/4 mx-auto sm:mx-0  ">
          <img
            className="w-60 h-30 mt-32"
            src="assets/images/logo/Smart_buy_sells_logo.png"
            alt="logo"
          />

          <Typography className="mt-32 text-2xl tracking-tight leading-tight">
            Log In to Your Account
          </Typography>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link
                className="text-md font-medium"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              sx={{ color: 'white' }}
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Log In
            </Button>

            <Typography fontSize={14} sx={{ fontWeight: 400 }} className="mb-32 mt-10 mx-auto mt-10 tracking-tight leading-tight">
              Don't have an account?
              <Link className="cursor-pointer pl-4 hover:text-blue-500 hover:underline color-black" to="/sign-up">
                Create account
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default SignInPage;
