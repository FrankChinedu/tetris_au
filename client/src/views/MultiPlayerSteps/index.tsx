import React, { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga';
import {useHistory, useLocation} from 'react-router';
import { MobileStepper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import ROUTES from '../../utils/constants/routes';
import SOCKET_EVENTS from '../../utils/constants/socketEvent';

import { UserContext } from '../../context/user';
import { SocketContext } from '../../context/socket';

import FirstStep from './FirstStep';
import JoinGame from './JoinGame';
import CreateGame from './CreateGame';
import StartGame from './StartGame';

import RedirectDialog from '../../components/RedirectDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    padding: theme.spacing(3)
  },
}));

const MultiPlayerSteps: React.FC = () => {
  const classes = useStyles();
  const location = useLocation()
  const history = useHistory()
  const [activeStep, setActiveStep] = React.useState(0);
  const [totalSteps, setTotalSteps] = React.useState(3);
  const [action, setAction] = useState('');
  const [message, setMessage] =useState<string>('');
  const [openDialog, setOpenDialog] =useState<boolean>(false);

  const { gameId, username, gameInfo, setGameInfo, initGameInfo, setGameId, setUsername } = useContext(UserContext);
    const { socket } = useContext(SocketContext);

    const deleteGameSession = () => {
      socket?.emit(SOCKET_EVENTS.DELETE_GAME_SESSION, gameId, username, gameInfo.username);
      setGameInfo(initGameInfo);
      setGameId('');
      setUsername('');
    }

  useEffect(() => {
    let val = location.search as string;
    val = val.trim();

    if (val) {
      setOpenDialog(true)
      deleteGameSession()
      if (val === '?cancel=true') {
        //game session was cancelled server reloaded
        setMessage("Sorry! You were kicked out of the game. This is from our end please try creating or joining a new game")
      }
      if (val === '?redirect=true') {
        //user was redirected because the trying to access invalid or ended game session refresh or something.
        setMessage("Sorry! You were kicked out of the game. This may be because you refreshed this page. Please try creating or joining a new game")
      }

      if (val === '?endGame=true') {
        setMessage("The game has ended thank you for playing");
      }
      //show user a modal of reason for redirect
    }
    
    history.replace(ROUTES.multiGameSteps);
    
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

useEffect(() => {
  ReactGA.pageview(window.location.pathname + window.location.search);
}, []);

  useEffect(() => {
    if(action) {
      handleAction();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  const handleAction = () => {
    action === 'join' ? setTotalSteps(2) : setTotalSteps(3);
    handleNext();
  };

 const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <FirstStep setAction={setAction} />;
      case 1:
        return action === 'create' ? <CreateGame /> : <JoinGame />;
      case 2:
        return <StartGame />;
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className="text-white h-full">
      <nav className="grid grid-cols-3 md:py-10 py-2 md:px-14 px-5">
        <Link to="/" className="mr-auto p-3">
          <FontAwesomeIcon className="md:text-6xl" icon={faArrowLeft} />
        </Link>
        <h3 className="md:text-5xl text-lg col-span-2 mr-auto p-3">Play MultiPlayer</h3>
      </nav>
      <main className="md:max-w-3xl max-w-lg mx-auto px-1 montserrat">
        <MobileStepper
          variant="dots"
          steps={totalSteps}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          nextButton={
            <button onClick={handleNext} disabled={activeStep === (totalSteps - 1)} className="focus:outline-none text-white text-xl disabled:text-gray-500 disabled:cursor-not-allowed">
              Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
          }
          backButton={
            <button onClick={handleBack} disabled={activeStep === 0} className="focus:outline-none text-white text-xl disabled:text-gray-500 disabled:cursor-not-allowed">
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>
          }
        />
        <div>
          {getStepContent(activeStep)}
        </div>
      </main>
      {openDialog && (
        <RedirectDialog open={openDialog} message={message} close={() => setOpenDialog(false)} />
      )}
    </div>
  );
};


// step 1: create or join game
// if user creates a came
// step 2: Enter username and select game options (send a post request to the server)
// step 3: Get the game ID

// if user joins a game
// step 2: enter username and game ID



export default MultiPlayerSteps;
