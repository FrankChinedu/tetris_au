import React, { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../../context/user';

import PageSpinner from '../common/PageSpinner';

import ROUTES from '../../utils/constants/routes';

const AddUsername: React.FC = () => {

    const url = process.env.REACT_APP_API_URL;

    const location = useLocation();
    const history = useHistory();
    
    const { setTwitterName, score, setScore } = useContext(UserContext);

    
    useEffect(() => {
        let val = location.search as string;
        val = val.trim();
        const _username = val.split('=');

        if(!val ||!_username[1]) {
           return history.push(ROUTES.home);
        }
        history.replace(ROUTES.addUsername)
        addUsername(_username[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addUsername = (username: string) => {
        axios.post(`${url}/leader-board?username=${username}`, {
            username: username,
            score: score
        }).then((res) => {
            setTwitterName(username);
            setScore(undefined);
            history.push(ROUTES.leaderboard);
        }).catch((err) => {
            history.push(ROUTES.home);
        })
    }

    return (
        <div className="h-screen text-white text-center flex flex-col justify-center items-center">
            <PageSpinner />
        </div>
    );
}

export default AddUsername;
