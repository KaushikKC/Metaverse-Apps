import React from 'react'
import NavButton from './NavButton' 
import {Bars3BottomRightIcon} from '@heroicons/react/24/solid'

function Header() {
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
        <div className="flex items-center space-x-2">
            <img className="rounded-full h-20 w-20" src="https://media.istockphoto.com/vectors/futuristic-golden-bitcoin-digital-currency-computer-circuit-board-vector-id1299615596?k=20&m=1299615596&s=612x612&w=0&h=1gdFjyFsd9VWObs0VE-iic41Az3uzfuYVRTNEj_4G2I=" alt="" />
            <div>
              <h1 className='text-white text-lg'>PAPAFAM DRAW</h1>
              <p className="text-xs text-emerald-500 truncate">User Loged in ...</p>
            </div>
        </div>
        <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
          <div className='bg-[#0A1F1C] p-4 space-x-2'>
            <NavButton isActive title="Buy Tickets"/>
            <NavButton title="Logout"/>
            {/* button */}
          </div>
        </div>
        <div className="flex flex-col ml-auto text-right">
          <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white cursor-pointer" />
          <span className="md:hidden">
            <NavButton title='Logout'/>
          </span>
        </div>

        
        
        
    </header>
  )
}

export default Header