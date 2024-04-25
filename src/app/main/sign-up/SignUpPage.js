import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from '../../auth/services/jwtService';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from "react-redux";
import { Grid } from '@mui/material';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  first_name: yup.string().required('You must enter first name'),
  last_name: yup.string().required('You must enter last name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  phone_number: yup.number().nullable().positive("Positive").typeError('Required').required("Required").test('len', 'Phone Number should be in 10 digits', val => val && val.toString().length === 10),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: "",
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function SignUpPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  const dispatch = useDispatch()

  function onSubmit({ first_name, last_name, password, email, phone_number }) {
    jwtService
      .createUser({
        first_name,
        last_name,
        email,
        phone_number,
        password,
        gender: 'male',
        country_code: '91',
        platform: 'null',
        provider: 'web',
        role: 'user',
      })
      .then((user) => {
      })
      .catch((_errors) => {
        console.log("🚀 ~ file: SignInPage.js:60 ~ onSubmit ~ _errors:", _errors)
        dispatch(showMessage({ message: "Email Already Exist", variant: 'error' }));
      });
  }

  return (
    <div className="flex justify-center h-screen items-center w-full">
      <div className="flex justify-center items-center w-full h-1/2">
        <Paper sx={{ width: { xs: '95%', sm: '80%', md: '80%', lg: '60%' } }} className="flex justify-center items-center">
          <Grid item container xs={12} sm={12} md={6} lg={6} className="flex flex-col justify-center items-center p-32  mx-auto sm:mx-0">
            {/* <img className=" h-64" src="assets/images/logo/smartB&S_logo.webp" alt="logo" /> */}
            <Typography sx={{ fontSize: { xs: '20px', sm: '24px' } }} className='text-red-500 font-bold h-36'>Smart Buy & Sales</Typography>

            <Typography sx={{ fontSize: { xs: '17px', sm: '20px' } }} className="mt-12 tracking-tight leading-tight">
              Get Started With FREE Website, Sign up
            </Typography>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full  p-32"
              onSubmit={handleSubmit(onSubmit)}
            >

              {/* FIRST NAME */}
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="First name"
                    type="text"
                    error={!!errors.first_name}
                    helperText={errors?.first_name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              {/* LAST NAME */}
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Last name"
                    type="text"
                    error={!!errors.last_name}
                    helperText={errors?.last_name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              {/* EMAIL */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              {/* PHONE NUMBER */}
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Phone Number"
                    type="number"
                    error={!!errors.phone_number}
                    helperText={errors?.phone_number?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              {/* PASSWORD */}
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

              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Password (Confirm)"
                    type="password"
                    error={!!errors.passwordConfirm}
                    helperText={errors?.passwordConfirm?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                className="flex items-center "
                name="acceptTermsConditions"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.acceptTermsConditions}>
                    <FormControlLabel
                      label="I agree to the Terms and Privacy Policy."
                      control={<Checkbox size="small" {...field} />}
                    />
                    <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className="w-full mt-24"
                aria-label="Register"
                sx={{ color: 'white' }}
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Create your free account
              </Button>
              <div className="flex justify-center items-center mt-10 font-medium">
                <Typography>Already have an account?</Typography>
                <Link className="ml-4" to="/sign-in">
                  Sign in
                </Link>
              </div>
            </form>
          </Grid>

          <Grid item container xs={6} sx={{ display: { xs: 'none !important', sm: 'none !important', md: 'flex !important', lg: 'flex !important' } }} className='flex justify-center items-center' >
            <img className="max-w-320" src="assets/images/signup/pixabay_signup.webp" alt="logo" />
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default SignUpPage;
