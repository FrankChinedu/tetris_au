import React from 'react';

interface IFirstStep {
    setAction: (value: string) => void
  }
  

const FirstStep: React.FC <IFirstStep> = ({ setAction }) => {

  const gameId = localStorage.getItem('gameId') || undefined;

  const deleteGameSession = () => {
    localStorage.clear();
    window.location.reload();

  }

  return (
    <div className="text-white montserrat">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center content-center text-center gap-10 w-11/12 mx-auto">
          <p className="md:col-span-2">What do you want to do?</p>
        <button onClick={() => setAction('create')} className="border-2 border-purple-600 px-7 py-4 transform transition duration-500 hover:scale-75">Create a game</button>
        <button onClick={() => setAction('join')} className="border-2 border-blue-500 px-7 py-4 transform transition duration-500 hover:scale-75">Join a game</button>
        {gameId && (
          <button onClick={deleteGameSession} className="border-2 border-blue-500 px-7 py-4 transform transition duration-500 hover:scale-75">Delete Last game session</button>
        )}
      </div>
    </div>
  );
}


export default FirstStep;
