import React  from 'react';
import { Dialog, } from '@material-ui/core';

interface IGameOverPrompt {
    open: boolean;
    message: string;
    close: () => void;
}


const RedirectDialog: React.FC<IGameOverPrompt> = ({open, message, close}) => {

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        aria-labelledby="game-over-dialog"
        onClose={close}
      >
        <div className="bg-gray-900 montserrat p-2 text-white">
            <div className="p-5">{message}</div>
            <div className="text-right">
                <button onClick={close}>Close</button>
            </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


export default RedirectDialog;
