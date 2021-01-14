import React from 'react';
import PageSpinner from '../common/PageSpinner';

const cells = 200;
const items: number[] = [];
for (let i = 1; i <= cells; i++) {
  items.push(i);
}

const Home: React.FC = () => {
  return (
        <PageSpinner />
  );
};


export default Home;
