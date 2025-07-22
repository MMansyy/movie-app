import React, { useEffect } from 'react'
import MainSlider from '../../components/MainSlider/MainSlider'
import Slider from '../../components/Slider/Slider'
import { Link } from 'react-router-dom'



const MovieBatman = {
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    id: 414906,
    name: "The Batman",
    original_language: "en",
    original_name: "The Batman",
    overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    popularity: 23.7013,
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    logo_path: "/2VxAPay1i8pkrORgfqmCaBKX09q.png"
};


export default function Movies() {


    useEffect(() => {
        document.title = 'Movies - Movie App'
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <MainSlider url='/movie/popular' />
            <Slider type='top10' url='trending/movie/day?language=en-US' path='movie' selector={true} />
            <Slider url='/movie/upcoming' text='Coming soon' path='movie' />
            <div>
                <div className='md:px-14 flex flex-col items-center gap-4'>
                    <h3 className="text-7xl  font-bold lg:text-9xl flex">
                        {'TOP RATED'.split('').map((char, idx) => (
                            <span
                                key={idx}
                                className={`relative letter-shadow-r  text-outline   ${idx === 4 ? 'ml-5' : 'lg:-ml-5 -ml-3'}
                                }`}
                            >
                                {char}
                            </span>
                        ))}
                    </h3>
                </div>
                <Slider url='/movie/top_rated' path='movie'  />
            </div>
            <div className='h-screen my-20 relative overflow-hidden'>
                <img
                    src={`https://image.tmdb.org/t/p/original${MovieBatman.backdrop_path}`}
                    alt={MovieBatman.name}
                    className='w-full h-full object-cover'
                />
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary to-transparent z-10'></div>
                <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary to-transparent z-10'></div>
                <div className='absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary to-transparent z-10'></div>
                <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent z-10'></div>
                <div className='absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-end px-20 text-right'>
                    <img
                        src={`https://image.tmdb.org/t/p/original${MovieBatman.logo_path}`}
                        alt={MovieBatman.name}
                        className='w-64 rounded-lg shadow-lg'
                    />
                    <p className='text-white text-lg md:max-w-1/2 font-bold mt-4'>
                        {MovieBatman.overview}
                    </p>
                    <Link to={`series/${MovieBatman.id}`} className=' flex items-center gap-2 outline-1 outline-secondary text-secondary px-4 py-3 rounded-full mt-4 hover:bg-secondary hover:text-black transition-colors'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 384 512" height={18} width={18} xmlns="http://www.w3.org/2000/svg"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                        <p className='text-xl'>Watch Now</p>
                    </Link>


                </div>
            </div>


        </>
    )
}
