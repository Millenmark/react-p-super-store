// import/no-extraneous-dependencies
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Link,
  Card,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { FormProvider } from 'src/components/hook-form';

// ----------------------------------------------------------------------
const registerSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email must be a valid email address'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
});

export default function RegisterView() {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const theme = useTheme();

  // STATE VARIABLES
  const [show, setShow] = useState({ password: false, confirmPassword: false });

  // HANDLER FUNCTIONS
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!error}
              helperText={error && error.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!error}
              helperText={error && error.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email Address"
              error={!!error}
              helperText={error && error.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Password"
              type={show.password ? 'text' : 'password'}
              error={!!error}
              helperText={error && error.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShow((prev) => ({ ...prev, password: !show.password }))}
                      edge="end"
                    >
                      <Iconify icon={show.password ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Confirm Password"
              type={show.confirmPassword ? 'text' : 'password'}
              error={!!error}
              helperText={error && error.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShow((prev) => ({ ...prev, confirmPassword: !show.confirmPassword }))
                      }
                      edge="end"
                    >
                      <Iconify icon={show.confirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Register
      </LoadingButton>
    </>
  );

  return (
    <FormProvider
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Register to Super Store</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/login">
              Login Here
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </FormProvider>
  );
}
