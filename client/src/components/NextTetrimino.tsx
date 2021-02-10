import React, {useMemo, useState} from 'react';

const tet =  (() =>
  Array.from(Array(4), () => Array(4).fill(0)))();

interface INextShape {
    nextShape: any
}

const NextTetrimino: React.FC<INextShape> = ({ nextShape }) => {
    const [stage] = useState(tet);

    const shape = useMemo(() => {

        // console.log('main nextshape', nextShape);
        const map: {[key: string]: string} = {}
        const m = nextShape.tetromino?.shape ?? [];
        
        for(let i = 0; i < m.length; i++) {
          for(let j  = 0; j < m[i].length; j++) {
            if(m[i][j] !== 0) {
              map[`${i}-${j}`] = m[i][j];
            }
          }
        }
        
        const stageCopy = JSON.parse(JSON.stringify(stage));
        
        for(let i = 0; i < stage.length; i++) {
          for(let j = 0; j < stage[i].length; j++) {
            if(map[`${i}-${j}`]) {
                stageCopy[i][j] = map[`${i}-${j}`]
            }
          }
        }
        return stageCopy;

    }, [nextShape, stage]);
 
    
    return (
        <>
        <div className="grid grid-cols-4 grid-rows-4 w-16 h-16">
            {shape.map((tetrimino: Array<[]>, j: number) => tetrimino.map((t, i) => <div className={`h-4 w-4 ${shape[j][i] !== 0 && `${nextShape.tetromino.color} border-2 border-gray-700 border-opacity-50 rounded`}`} key={i}></div>
            ))}

        </div>
        </>
    );
}

export default React.memo(NextTetrimino);


