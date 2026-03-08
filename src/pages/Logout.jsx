import { useAppContext } from '@/store/store'
import React from 'react'

const Logout = () => {
    const {logoutHandler}= useAppContext()
  return(<button onClick={logoutHandler} className=" cursor-pointer  rounded-2xl px-8 py-1 bg-cyan-700 hover:bg-cyan-500 transform transition-all delay-100 text-white ">Logout</button>)
}

export default Logout
