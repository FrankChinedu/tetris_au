import React from 'react';

import Cell from './Cell';

interface IStage {
  stage: any
}
const Stage: React.FC <IStage> = ({ stage }) => (
  <div className={`grid grid-cols-12`}>
    {stage.map((row: any) => row.map((cell:any, x: number) => <Cell key={x} type={cell[0]} />))}
  </div>
);

export default Stage;
