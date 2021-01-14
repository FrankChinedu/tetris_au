import React from 'react';


const PageNotFound: React.FC = () => (
    <div className="relative flex justify-center items-center h-screen text-white">
        <div className="inline-block animate-ping ease duration-300 w-5 h-5 bg-white mx-2"></div>
        <p>Page not found</p>
    </div>
);

export default PageNotFound;