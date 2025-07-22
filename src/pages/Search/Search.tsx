import { useQuery } from '@tanstack/react-query'
import React, { use, useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/axios.global'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('query') || '')
    const pageNumber = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputRef.current) {
            setSearchQuery(inputRef.current.value)
            inputRef.current.blur()
            setSearchParams({ query: inputRef.current.value })
        }
    }

    const { data } = useQuery({
        queryKey: ['search', searchQuery, pageNumber],
        queryFn: async () => {
            if (!searchQuery) return []
            const response = await axiosInstance.get(`/search/multi?query=${searchQuery}&include_adult=true&page=${pageNumber}`)
            return response.data
        },
        enabled: !!searchQuery,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        document.title = `Search - ${searchQuery} - Movie App`
    }, [searchQuery])

    return (
        <div className='max-w-7xl mx-auto min-h-[72vh] flex flex-col items-center justify-start pt-20'>
            <div className='flex items-center justify-center relative mt-20 md:w-2/3 w-4/5'>
                <input
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    placeholder='Search for everything you want and we will get it for you...'
                    type="text"
                    className='w-full outline-1 outline-secondary focus:outline-2 rounded-full py-3 pr-24 pl-5 bg-[#0F172A] text-white'
                />
                <button
                    onClick={() => {
                        if (inputRef.current) {
                            setSearchQuery(inputRef.current.value)
                            setSearchParams({ query: inputRef.current.value })
                            inputRef.current.blur()
                        }
                    }}
                    className='absolute right-1 top-1 cursor-pointer bg-secondary text-black px-5 py-2 rounded-full hover:bg-secondary/80 transition-all duration-300'
                >
                    Search
                </button>
            </div>

            <div className='w-full min-h-[40vh] mt-10'>
                {!data?.results || data?.results.length === 0 ? (
                    <p className='w-1/2 text-xl text-gray-300 my-6 font-light text-center mx-auto'>
                        Find your favorite movie and TV show easily. Type in the title or keyword and discover detailed information. Explore our catalog and find what to watch in seconds!
                    </p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-5'
                    >
                        {data?.results?.sort((a, b) => b.vote_average - a.vote_average)
                            .map((movie: any) => {
                                if (movie.vote_average === 0 || movie.vote_average === null || isNaN(movie.vote_average)) return null;

                                return (
                                    <Link
                                        to={`/${movie.media_type === 'movie' ? 'movie' : 'series'}/${movie.id}`}
                                        key={movie.id}
                                        className='relative group w-72 mx-auto h-40 hover:scale-105 transition-all duration-300'
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                            alt={movie.name || movie.title}
                                            className='w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300'
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all duration-300 rounded-lg"></div>
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg'></div>
                                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-50 group-hover:w-10 group-hover:h-10 transition-all duration-300 flex items-center justify-center bg-secondary text-black rounded-full'>
                                            <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                        </div>
                                        <div className='absolute bottom-2 inset-x-2 flex justify-between items-center text-white font-semibold z-50'>
                                            <p>{parseFloat(movie?.vote_average).toFixed(1)} <span className='text-yellow-400'>★</span></p>
                                            <p>{movie?.release_date?.slice(0, 4) || movie?.first_air_date?.slice(0, 4)}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-1'>
                                            <h5 className='text-white group-hover:text-secondary transition-all duration-300 line-clamp-1 font-semibold'>
                                                {movie.name || movie.title}
                                            </h5>
                                        </div>
                                    </Link>
                                );
                            })}


                    </motion.div>
                )}
                <div className='flex justify-center items-center space-x-4 mt-20'>
                    {pageNumber > 1 && <button onClick={() => {
                        const prevPage = pageNumber - 1;
                        setSearchParams({ query: searchQuery, page: prevPage.toString() });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} className='px-4 py-2 text-secondary hover:bg-secondary hover:text-black transition-all font-bold duration-300 outline-1 rounded-full text-lg disabled:opacity-50'>
                        Previous
                    </button>}
                    {pageNumber < data?.total_pages && (
                        <button
                            onClick={() => {
                                const nextPage = pageNumber + 1;
                                setSearchParams({ query: searchQuery, page: nextPage.toString() });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className='px-4 py-2 text-secondary hover:bg-secondary hover:text-black transition-all font-bold duration-300 outline-1 rounded-full text-lg'
                        >
                            Next
                        </button>
                    )}

                </div >
            </div>
        </div>
    )
}
