import React, { useEffect } from 'react'
import MainSlider from '../../components/MainSlider/MainSlider'
import Slider from '../../components/Slider/Slider'
import { Link } from 'react-router-dom'

const strangerThing = {
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    id: 66732,
    name: "Stranger Things",
    original_language: "en",
    original_name: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    popularity: 166.0623,
    poster_path: "/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    logo_path: "/uyVM5qGksUzCgwo6UU0UrHex8Oj.png"
};

export default function Series() {

    useEffect(() => {
        document.title = 'Series - Movie App'
    }, [])

    return (
        <>
            <MainSlider url='/tv/popular' />
            <Slider type='top10' url='trending/tv/day?language=en-US' selector={true} path='tv' init='tv' />
            <Slider url='/tv/on_the_air' text='Now Streaming' path='tv' />
            <div>
                <div className='md:px-14 flex flex-col items-center gap-4'>
                    <h3 className="text-7xl  font-bold lg:text-9xl flex">
                        {'TOP RATED'.split('').map((char, idx) => (
                            <span
                                key={idx}
                                className={`relative letter-shadow-r text-outline ${idx === 4 ? 'ml-5' : 'lg:-ml-5 -ml-3'}`}
                            >
                                {char}
                            </span>
                        ))}
                    </h3>
                </div>
                <Slider url='/tv/top_rated' path='tv' />
            </div>
            <div className='h-screen my-20 relative overflow-hidden'>
                <img
                    src={`https://image.tmdb.org/t/p/original${strangerThing.backdrop_path}`}
                    alt={strangerThing.name}
                    className='w-full h-full object-cover'
                />
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary to-transparent z-10'></div>
                <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary to-transparent z-10'></div>
                <div className='absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary to-transparent z-10'></div>
                <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent z-10'></div>
                <div className='absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-end px-20 text-right'>
                    <img
                        src={`https://image.tmdb.org/t/p/original${strangerThing.logo_path}`}
                        alt={strangerThing.name}
                        className='w-64 rounded-lg shadow-lg'
                    />
                    <p className='text-white text-lg md:max-w-1/2 font-bold mt-4'>
                        {strangerThing.overview}
                    </p>
                    <Link to={`/series/${strangerThing.id}`} className='flex items-center gap-2 outline-1 outline-secondary text-secondary px-4 py-3 rounded-full mt-4 hover:bg-secondary hover:text-black transition-colors'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 384 512" height={18} width={18} xmlns="http://www.w3.org/2000/svg"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                        <p className='text-xl'>Watch Now</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
