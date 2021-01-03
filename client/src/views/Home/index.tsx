import React from 'react';

const cells = 200;
const items: number[] = [];
for (let i = 1; i <= cells; i++) {
  items.push(i);
}

const Home: React.FC = () => {
  return (
        <div className="grid grid-cols-10 w-3/12 m-auto mt-8">
            {items.map(item => <div className=" border-2 border-black h-10" key={item}>{item}</div>)}
        </div>
  );
};


export default Home;
