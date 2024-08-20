import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

export default function MYTextField({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} error={!!error} helperText={error && error.message} {...other} />
      )}
    />
  );
}

MYTextField.propTypes = {
  name: PropTypes.string,
};
