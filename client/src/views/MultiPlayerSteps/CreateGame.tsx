import React, { useState, useContext } from 'react';
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCopy } from '@fortawesome/free-solid-svg-icons';

import PageSpinner from '../common/PageSpinner';
import { UserContext } from '../../context/user';
// interface IFirstStep {
//     setAction: (value: string) => void
//   }

const url = process.env.REACT_APP_API_URL;
  

const CreateGame: React.FC  = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [copied, setCopied] = React.useState<boolean>(false);
    const {gameId, setGameId, setUsername, username } = useContext(UserContext);


    const clearError = () => {
        setErrorMsg('');
    }

    const  preventSpace = (e: any) => {
        if (e.key === " ") {
            e.preventDefault();
          }
    }

    const create = async () => {
        try {
                clearError();
                setLoading(true);
                const response = await 
                axios.post(`${url}/tetris?username=${username}`)
                const { gameId } = response.data.data
                setGameId(gameId);
                // setUsername(_username);
        } catch (er) {
            const { error } = er.response.data;
            const err = error.split(':');
            setErrorMsg(err[1]);
        } finally {
            setLoading(false);
        }
    }

    const copyToClipboard = () => {
        const shareMessage = `Hey play tetris with me at game_url use this ID ${gameId} to join, gameID`;
        const permissionName = "clipboard-write" as PermissionName;
        navigator.permissions.query({name: permissionName}).then(result => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(shareMessage).then(function() {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000)
                  }, function() {
                    console.log('Copy failed');
                  });
            }
          });
        }


    return (
        <div className="text-white montserrat w-11/12 mx-auto mt-10">
            {!loading ? (
                <div>
                    {errorMsg && (
                        <div className="bg-red-300 p-3 flex justify-between my-7 transition duration-500 ease-in-out">
                            <p>{errorMsg}</p>
                            <button onClick={clearError}><FontAwesomeIcon className="md:text-2xl" icon={faTimesCircle} /></button>
                        </div>
                    )}
                    <form className="grid md:grid-cols-2 grid-cols-1 gap-3" onSubmit={(e) => e.preventDefault()}>
                        <div className="bg-indigo-600 py-2 px-5">
                            <input
                                type="text"
                                className="focus:outline-none bg-transparent placeholder-white w-full"
                                placeholder="Please enter your username"
                                value={username}
                                onChange={(e) => {
                                    if (e.currentTarget.value.includes(" ")) {
                                        e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
                                    }
                                    setUsername(e.target.value)
                                }}
                                onKeyDown={(e) => preventSpace(e)}
                                disabled={gameId !== ''}
                            />
                        </div>
                        <button
                            className="bg-transparent border border-indigo-600 py-2 focus:outline-none rounded disabled:text-gray-500 disabled:cursor-not-allowed"
                            disabled={username.trim() === '' || gameId !== ''}
                            onClick={create}
                        >
                            Create Game
                        </button>
                    </form>
                    {gameId && (
                        <div className="my-7 bg-blue-500 rounded-sm p-3 flex items-center">
                            <p className="col-span-2">
                                Your game has been created and your game id is <span className="font-semibold">{gameId}</span> share your game ID with your frends to join your game
                            </p>
                            <div className="relative">
                                <button onClick={copyToClipboard} className="px-2 focus:outline-none"><FontAwesomeIcon icon={faCopy} /></button>
                                {copied && (
                                    <p className="inline absolute bg-gray-400 rounded-sm -top-10 left-0 p-2">Copied</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <PageSpinner />
            )}
        </div>
      );
}


export default CreateGame;
