import React from 'react'
// import img  from '../assets/logo.png' 
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <header className='bg-green-600'>
        {/* <Link to={'/'}><img src={img} alt="logo" height={60} width={60}/></Link> */}
        {/* <span className='mt-4 font-semibold'>Fund Me</span>
        <nav className="m-2 pl-2 mt-4">
            <Link to={'/'} className=" pl-[68rem]">Home</Link>
            <Link to={'/signup'} className=" pl-[2rem]">Sign Up</Link>
        </nav> */}


          {/* Navbar */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-blue-400">FUND ME</div>
        <ul className="hidden md:flex space-x-8">
          <li><a href="/home" className="hover:text-blue-400">HOME</a></li>
          {/* <li><a href="#about" className="hover:text-blue-400">ABOUT</a></li>
          <li><a href="#pages" className="hover:text-blue-400">PAGES</a></li>
          <li><a href="#explore" className="hover:text-blue-400">EXPLORE</a></li>
          <li><a href="#shop" className="hover:text-blue-400">SHOP</a></li>
          <li><a href="#blog" className="hover:text-blue-400">BLOG</a></li>
          <li><a href="#contact" className="hover:text-blue-400">CONTACT</a></li> */}
        </ul>
        <a href="/home"><button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Get Started</button></a>
      </nav>


    </header>
    </>
  )
}

export default Navbar