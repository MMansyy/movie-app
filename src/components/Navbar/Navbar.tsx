import { useEffect, useState } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    const handleScroll = () => {
        const middle = window.innerHeight / 4;
        if (window.scrollY > middle) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] ${scrolled ? 'bg-primary opacity-95' : 'bg-transparent'} transition-all duration-300 ease-in-out`}>
            <div className="container mx-auto px-4 md:px-10 py-5">
                <div className="flex items-center justify-between ">
                    <h1 className="text-2xl md:text-3xl font-bold text-red-400">NOTFLIX</h1>
                    <ul className="space-x-4 text-2xl hidden md:flex">
                        <li><a href="/" className="text-white">Home</a></li>
                        <li><a href="/movies" className="text-white">Movies</a></li>
                        <li><a href="/tv-shows" className="text-white">TV Shows</a></li>
                        <li><a href="/about" className="text-white">About</a></li>
                    </ul>
                    <div className="flex items-center justify-center mx-5 ">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" id="search" x="0px" y="0px" viewBox="0 0 24 24" className="w-8" height="40" width="40" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
		c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
        M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
		z"></path></g></svg>
                    </div>
                </div>
            </div>


        </nav>
    )
}
