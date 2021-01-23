import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// interface IFirstStep {
//     setAction: (value: string) => void
//   }
  

const JoinGame: React.FC  = () => {

    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState('');
    const history = useHistory();

    const playGame = () => {
        history.push('/game');
    }
    
    return (
        <div className="text-white montserrat w-11/12 mx-auto mt-10">
          <form className="grid md:grid-cols-2 grid-cols-1 gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="bg-indigo-600 py-2 px-5">
                <input
                    type="text"
                    className="focus:outline-none bg-transparent placeholder-white w-full"
                    placeholder="Please enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="bg-indigo-600 py-2 px-5">
                <input
                    type="text"
                    className="focus:outline-none bg-transparent placeholder-white w-full"
                    placeholder="enter the ID shared with you"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                />
              </div>
            <button
                className="bg-transparent border border-indigo-600 mt-2 py-2 focus:outline-none rounded disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={username === '' || gameId === ''}
                onClick={playGame}
            >
                Join Game
            </button>
          </form>
        </div>
      );
}


export default JoinGame;
