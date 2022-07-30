import { 
  Alert,
  Slide,
  Snackbar
} from "@mui/material"


const CustomSnackbar = ({ direction, message, open, onClose, severity }) => {

  const renderTransition = (props) => {
    return <Slide {...props} direction={direction}/>;
  }

  return <Snackbar
    open={open}
    onClose={onClose}
    TransitionComponent={renderTransition}
    autoHideDuration={4000}
  >
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }} elevation={2}>
      {message}
    </Alert>
  </Snackbar>;
}

export default CustomSnackbar;