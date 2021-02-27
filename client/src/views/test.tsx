import React from 'react';

const PageNotFound: React.FC = () => {
    const handleSocials = () => {
        const SERVER_URL = process.env.REACT_APP_SERVER_URL;
        let global = window as Window;
        global.location.href = `${SERVER_URL}/auth/twitter`
    }

    return (
        <div className="h-screen text-white text-center flex flex-col justify-center items-center">
            <div className="flex">
                <div className="my-1">
                </div>
            </div>
            <div>
                <p className="mx-3 text-3xl md:text-5xl">We couldn't find that page</p>
                <p onClick={handleSocials} className="text-sm cursor-pointer montserrat mt-10 border p-4 border-blue-500">socials</p>
            </div>
        </div>
    );
}

export default PageNotFound;