import React from 'react'

interface Props {
    title: string;
    isActive: boolean;
}

function NavButton({title, isActive}:Props) {
  return (
    <button className={`${isActive && "bg-[#036756]"} rounded-lg font-bold hover:bg-[#036756] text-white py-2 px-4`}>{title}</button>
  )
}

export default NavButton