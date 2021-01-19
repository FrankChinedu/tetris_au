import React from 'react'

export const TetrisWrapper: React.FC <any> = (props) => {

  return (
    <div className="w-full min-h-screen overflow-hidden focus:outline-none active:bg-transparent cursor-default flex flex-col p-1 text-white" {...props} >
      {props.children}
    </div>
  )
};

export const StyledTetris: React.FC = ({ children}) => {

  return (
    <div className="flex p-4 justify-evenly md:w-10/12 md:m-auto">
      {children}
    </div>
  )
};
