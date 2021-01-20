import React from 'react';

const tet =  (() =>
  Array.from(Array(4), () => Array(4).fill([0, 'clear'])))();

interface INextShape {
    nextShape: any
}

const NextTetrimino: React.FC<INextShape> = ({ nextShape }) => {
    console.log('nextShape', nextShape);
    
    return (
        <>
        <div className="grid grid-cols-4 grid-rows-4 border border-white w-16 h-16">
            {tet.map((tetrimino) => tetrimino.map((t, i) => {
                return <div className="border border-gray-500 border-opacity-5 h-4 w-4" key={i}></div>
            }))}

        </div>
        </>
    );
}

export default React.memo(NextTetrimino);
