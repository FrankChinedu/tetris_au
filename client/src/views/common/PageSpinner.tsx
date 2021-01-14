import React from 'react';


const PageSpinner: React.FC = () => (
    <div className="relative flex justify-center items-center h-screen">
        <div className="inline-block animate-ping ease duration-300 w-5 h-5 bg-white mx-2"></div>
    </div>
);

export default PageSpinner;