import React from 'react'

export const TetrisWrapper: React.FC <any> = (props) => {

  return (
    <div className=" w-full h-full overflow-hidden" {...props} >
      {props.children}
    </div>
  )
};

export const StyledTetris: React.FC = ({ children}) => {

  return (
    <div className="flex p-4  justify-center">
      {children}
    </div>
  )
};
