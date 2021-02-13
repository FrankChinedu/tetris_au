import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ReactGA from 'react-ga';

import ROUTES from '../../utils/constants/routes';
import { TShape, OShape, IShape } from '../../components/Tetriminoes';


const PageNotFound: React.FC = () => {
    let history = useHistory();
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, []);
    return (
        <div className="h-screen text-white text-center flex flex-col justify-center items-center">
            <div className="flex">
                <div className="my-1">
                    <TShape />
                    <OShape />
                    <IShape />
                </div>
            </div>
            <div>
                <p className="mx-3 text-3xl md:text-5xl">We couldn't find that page</p>
                <p onClick={() => history.push(ROUTES.home)} className="text-sm cursor-pointer montserrat mt-10 border p-4 border-blue-500">Click here to go back to the game app</p>
            </div>
        </div>
    );
}

export default PageNotFound;