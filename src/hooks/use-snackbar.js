import { useContext } from 'react';
import { SnackbarContext } from '../contexts/snackbar-context';

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;
