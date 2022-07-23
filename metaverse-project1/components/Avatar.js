import Image from 'next/image';
import React from 'react'
import { useMoralis } from 'react-moralis'

function Avatar({username, logoutOnPress}) {
    

    const {user, logout} = useMoralis();
    console.log(username)
  return (
    
  <Image 
    className='rounded-full bg-black cursor-pointer hover:opacity-75' 
    src="https://avatars.dicebear.com/api/pixel-art/kaushik.svg" 
    layout="fill" 
    onClick={() => logoutOnPress && logout()} 
    alt=""/>
  );
}

export default Avatar