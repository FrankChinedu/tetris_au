import React from 'react';

interface ILevel {
    level: number,
}

const Level: React.FC <ILevel> = ({level}) => {
  
  return (
  <div className="border p-3 mr-auto w-20 border-red-300 border-opacity-20 rounded-bl-3xl rounded-tl-3xl text-center">
        <p className="montserrat text-sm">Level</p>
        
        <p className="text-2xl">{level}</p>
  </div>
)};

export default React.memo(Level);