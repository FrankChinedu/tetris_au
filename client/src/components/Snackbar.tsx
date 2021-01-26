import React from 'react';
import MUISnackbar from '@material-ui/core/Snackbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface ISnackbar {
    open: boolean,
    message?: string,
    handleClose: (...arg:any) => void,
  }
  

const Snackbar: React.FC<ISnackbar> = ({ open, handleClose, message }) => {
    return (
        <MUISnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        action={
            <div onClick={handleClose}>
                <FontAwesomeIcon icon={faTimesCircle} />
            </div>
        }
    />
    )
}

export default Snackbar;