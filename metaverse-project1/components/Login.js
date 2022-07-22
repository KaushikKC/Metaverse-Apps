/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import React from 'react'
import { useMoralis } from 'react-moralis'

function Login() {
  const {authenticate} = useMoralis();

  return (
    <div className='bg-black relative'>
      <h1>I'm the login screen</h1>

      <div className='z-50 flex flex-col absolute items-center justify-center 
      h-4/6 w-full space-y-4'>

        <Image
          className='object-cover rounded-full'
          src="https://links.papareact.com/3pi"
          height={200}
          width={200}
        />

        <button onClick={authenticate} className='bg-yellow-500 rounded-lg p-5 font-bold animate-pulse'>
          Login To the metaverse
        </button>

      </div>
      <div className='w-full h-screen'>
        <Image src="https://links.papareact.com/55n" layout='fill' objectFit='cover' />
      </div>
    </div>

  )
}

export default Login