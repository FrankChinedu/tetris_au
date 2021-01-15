import React from 'react';


const PageSpinner: React.FC = () => (
    <div className="relative flex justify-center items-center h-screen">
        <div className="mt-1 w-20 animate-spin">
            <div className="flex flex-col justify-center items-center">
                <div className="h-6 w-6 mr-1 rounded bg-pink-700 mt-1"></div>
            </div>
           <div className="flex mt-1">
                <div className="h-6 w-6 mr-1 rounded bg-pink-700"></div>
                <div className="h-6 w-6 mr-1 rounded bg-pink-700"></div>
                <div className="h-6 w-6 mr-1 rounded bg-pink-700"></div>
           </div>
        </div>
    </div>
);

export default PageSpinner;