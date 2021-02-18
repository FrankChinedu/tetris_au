const AddUsername: React.FC = () => {
    // /add-username?userName=frankieetchy 
    // redirect user if user comes to view and no userName query parameter
    //extract user name from url and clear url and save user name for use later
    //before now store last highest score to send later when user name is available
    //update leader board with
    //after info has been received and add leader board updated redirect user to leaderboard

    return (
        <div className="h-screen text-white text-center flex flex-col justify-center items-center">
            <div className="flex">
                <div className="my-1">
                </div>
            </div>
            <div>
                <p className="mx-3 text-3xl md:text-5xl">inside life</p>
                <p className="text-sm cursor-pointer montserrat mt-10 border p-4 border-blue-500">Add Username</p>
            </div>
        </div>
    );
}

export default AddUsername;
