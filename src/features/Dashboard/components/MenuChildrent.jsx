import { Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuChildrent = ({ option }) => {
  return (
    <NavLink to={option.link}>
      <div className='pl-4 py-2 border-b flex space-x-1 items-end w-full hover:bg-blue-300 hover:text-white transition duration-300'>
        {option.icon}
        <span className='text-[13px]'>
          {option.name}
        </span>
      </div>
    </NavLink>
  )
}

export default MenuChildrent
