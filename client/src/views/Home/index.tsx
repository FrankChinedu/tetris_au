import React from 'react';


const Home: React.FC = () => {
  return (
    <div className="text-white h-full">
      <nav className="p-4">
        <h3 className="text-5xl text-center">Tetris</h3>
      </nav>
      <main className="w-11/12 md:w-7/12 my-16 grid grid-cols-1 md:grid-cols-2 justify-center content-center text-center h-80 gap-10 mx-auto">
        <div className="border-2 border-white px-7 py-4 transform transition duration-500 hover:scale-75">Play Single Player</div>
        <div className="border-2 border-white px-7 py-4 transform transition duration-500 hover:scale-75">Play Multiple Players</div>
        <div className="border-2 border-white px-7 py-4 transform transition duration-500 hover:scale-75">How to Play tetris</div>
        <div className="border-2 border-white px-7 py-4 transform transition duration-500 hover:scale-75">Settings</div>
      </main>
    </div>
  );
};


export default Home;
