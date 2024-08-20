import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
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

export default function RegisterView() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const theme = useTheme();

  // STATE VARIABLES
  const [show, setShow] = useState({ password: false, confirmPassword: false });

  // HANDLER FUNCTIONS
  const onSubmit = (data) => {
    console.log(data);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => <TextField {...field} required type="text" label="First Name" />}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => <TextField {...field} required type="text" label="Last Name" />}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField {...field} required type="email" label="Email Address" />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={show.password ? 'text' : 'password'}
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
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              type={show.password ? 'text' : 'password'}
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
