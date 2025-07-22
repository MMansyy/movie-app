import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Fav() {

    const [favourites, setfavourites] = useState<[]>(JSON.parse(localStorage.getItem('favourites')) || []);

    useEffect(() => {
        document.title = 'Favourites - Movie App'
        window.scrollTo(0, 0)
    }, [])

    
    return (
        <div className='container mx-auto px-4 md:px-10'>
            <div className='min-h-screen flex flex-col justify-center items-center mt-15'>

                <h1 className='text-3xl md:text-3xl font-bold text-left mb-6'>Favourites</h1>
                <div className='flex flex-wrap gap-7 items-center justify-center min-h-[60vh]'>
                    {
                        favourites.length > 0 ? (
                            favourites.map((movie: any) => (
                                <Link
                                    to={`/${movie.last_air_date ? 'series' : 'movie'}/${movie.id}`}
                                    className="relative w-fit flex flex-col items-center justify-center group"
                                >
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'}
                                        alt={movie.title}
                                        loading='lazy'
                                        className="rounded-2xl border-[3px] border-transparent group-hover:border-secondary max-w-52 min-h-[309px] object-cover transition-all duration-500 group-hover:scale-105"
                                    />
                                    <div className='absolute w-0 h-0 z-50 group-hover:w-10 group-hover:h-10 transition-all duration-300 flex items-center justify-center bg-secondary text-black rounded-full'>
                                        <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                    </div>
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 group-hover:scale-[103%] transition-all duration-300 rounded-2xl"></div>
                                </Link>
                            ))
                        ) : (
                            <p className='text-xl text-gray-500'>No favourites added yet.</p>
                        )
                    }

                </div>
            </div>

        </div>
    )
}
