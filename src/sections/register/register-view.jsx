import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  // STATE VARIABLES
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // COMMON VARIABLES
  const formMaxLength = {
    firstName: 20,
    lastName: 20,
    email: 30,
    password: 10,
    confirmPassword: 10,
  };
  const isPasswordConfirmed = formValues.password === formValues.confirmPassword;

  const handleClick = () => {
    // router.push('/dashboard');
    console.log(formValues);

    // ? RESETTING THE FORM
    setFormValues((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {})
    );
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          type="text"
          name="firstName"
          label="First Name"
          value={formValues.firstName}
          onChange={({ target: { value } }) =>
            value.length !== formMaxLength.firstName &&
            setFormValues((prev) => ({ ...prev, firstName: value }))
          }
        />

        <TextField
          type="text"
          name="lastName"
          label="Last Name"
          value={formValues.lastName}
          onChange={({ target: { value } }) =>
            value.length !== formMaxLength.lastName &&
            setFormValues((prev) => ({ ...prev, lastName: value }))
          }
        />

        <TextField
          type="email"
          name="email"
          label="Email address"
          value={formValues.email}
          onChange={({ target: { value } }) =>
            value.length !== formMaxLength.email &&
            setFormValues((prev) => ({ ...prev, email: value }))
          }
        />

        <TextField
          name="password"
          label="Password"
          type={show.password ? 'text' : 'password'}
          value={formValues.password}
          onChange={({ target: { value } }) =>
            value.length !== formMaxLength.password &&
            setFormValues((prev) => ({ ...prev, password: value }))
          }
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

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={show.confirmPassword ? 'text' : 'password'}
          value={formValues.confirmPassword}
          onChange={({ target: { value } }) =>
            value.length !== formMaxLength.confirmPassword &&
            setFormValues((prev) => ({ ...prev, confirmPassword: value }))
          }
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
          error={!isPasswordConfirmed}
          helperText={isPasswordConfirmed ? '' : "Password doesn't match"}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        disabled={!isPasswordConfirmed}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
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
    </Box>
  );
}
