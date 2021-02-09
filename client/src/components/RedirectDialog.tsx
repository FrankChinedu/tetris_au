import React, { useState } from 'react';
import { Dialog, } from '@material-ui/core';
import useWindowSize from '../hooks/useWindowSize';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimesCircle, } from '@fortawesome/free-solid-svg-icons';

interface IGameOverPrompt {
    open: boolean;
    message: string;
    close: () => void;
}


const RedirectDialog: React.FC<IGameOverPrompt> = ({open, message, close}) => {

  const [windowWidth, setWidth] = useState<any>('sm');

  const { width } = useWindowSize();

  if(width && width < 400) {
    setWidth('xs');
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={windowWidth}
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
