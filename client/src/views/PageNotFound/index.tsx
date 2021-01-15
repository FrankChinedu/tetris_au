import React from 'react';
import { useHistory } from "react-router-dom";


const PageNotFound: React.FC = () => {
    let history = useHistory();
    return (
        <div className="h-screen text-white text-center flex flex-col justify-center items-center">
            <div className="flex">
                <div className="my-1">
                    <div className="mt-1 w-20 transform -rotate-45">
                        <div className="flex mt-1">
                            <div className="h-6 w-6 mr-1 rounded bg-pink-700"></div>
                            <div className="h-6 w-6 mr-1 rounded bg-pink-700"></div>
                            <div className="h-6 w-6 mr-1 rounded bg-pink-700"></div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="h-6 w-6 mr-1 rounded bg-pink-700 my-1"></div>
                        </div>
                    </div>

                    <div className="flex transform">
                        <div className="grid gap-1">
                            <div className="h-6 w-6 mr-1 rounded bg-purple-700"></div>
                            <div className="h-6 w-6 mr-1 rounded bg-purple-700"></div>
                        </div>
                        <div className="grid gap-1">
                            <div className="h-6 w-6 mr-1 rounded bg-purple-700"></div>
                            <div className="h-6 w-6 mr-1 rounded bg-purple-700"></div>
                        </div>
                    </div>

                    <div className="flex transform">
                        <div className="h-6 w-6 mr-1 rounded bg-blue-500"></div>
                        <div className="h-6 w-6 mr-1 rounded bg-blue-500"></div>
                        <div className="h-6 w-6 mr-1 rounded bg-blue-500"></div>
                        <div className="h-6 w-6 mr-1 rounded bg-blue-500"></div>
                    </div>
                </div>
            </div>
            <div>
                <p className="mx-3 text-3xl md:text-5xl">We couldn't find that page</p>
                <p onClick={() => history.push('/')} className="text-sm cursor-pointer">Click here to go back to the game app</p>
            </div>
        </div>
    );
}

export default PageNotFound;