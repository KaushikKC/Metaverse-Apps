import React from 'react'
import { useMoralis } from 'react-moralis'

function ChangeUsername() {

    const {setUserData, isUserUpdating, userError, user} = useMoralis();

    const setUsername = () => {
        const username = prompt(`Enter your username (current: ${user.getUsername()})`
        )
        if (!username) return;

        setUserData({
            username,
        });
    };

    
  return (
    <div className="text-sm absolute top-5 right-5">
        <button dissabled={isUserUpdating} 
        onClick={setUsername}
        className="hover:text-pink-700">Change User name</button>
    </div>
  )
}

export default ChangeUsername