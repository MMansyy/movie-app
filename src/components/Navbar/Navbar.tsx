import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css' // Import your custom CSS for Navbar

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleScroll = () => {
        const middle = window.innerHeight / 4
        setScrolled(window.scrollY > middle)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out 
        ${scrolled ? 'bg-primary/70 backdrop-blur-sm' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 md:px-10 py-5">
                    <div className="relative flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <h1 className="text-2xl md:text-3xl font-extrabold hover:scale-110 transition-all duration-300 hover:animate-bounce bg-gradient-to-r from-blue-500 via-violet-500  to-red-500 bg-clip-text text-transparent">NOTFLIX</h1>
                        </Link>
                        <ul className="hidden md:flex space-x-6 text-lg absolute left-1/2 -translate-x-1/2 main">
                            <li><NavLink to="/" className="text-white">Home</NavLink></li>
                            <li><NavLink to="/movies" className="text-white">Movies</NavLink></li>
                            <li><NavLink to="/tv-shows" className="text-white">TV Shows</NavLink></li>
                            <li><NavLink to="/about" className="text-white">About</NavLink></li>
                        </ul>

                        <div className="flex items-center gap-3">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"
                                className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
                  c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
                  M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02z">
                                </path>
                            </svg>

                            <button onClick={() => setIsMenuOpen(true)} className="text-white md:hidden">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 bg-black/50 z-[90]"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-screen w-2/3 bg-primary/60 backdrop-blur-sm z-[100] p-6 transition-all duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end mb-4">
                    <button onClick={() => setIsMenuOpen(false)} className="text-white text-2xl">✕</button>
                </div>
                <ul className="space-y-2 text-white text-xl">
                    <li className=' bg-transparent hover:bg-gray-800 transition-all duration-300  rounded-4xl py-2 px-4 text-lg'><NavLink to="/">Home</NavLink></li>
                    <li className=' bg-transparent hover:bg-gray-800 transition-all duration-300  rounded-4xl py-2 px-4 text-lg'><NavLink to="/movies">Movies</NavLink></li>
                    <li className=' bg-transparent hover:bg-gray-800 transition-all duration-300  rounded-4xl py-2 px-4 text-lg'><NavLink to="/tv-shows">TV Shows</NavLink></li>
                    <li className=' bg-transparent hover:bg-gray-800 transition-all duration-300  rounded-4xl py-2 px-4 text-lg'><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </>
    )
}
