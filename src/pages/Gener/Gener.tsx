import React from 'react'
import { motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import MainSlider from '../../components/MainSlider/MainSlider';
import Slider from '../../components/Slider/Slider';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios.global';

export default function Gener() {
    const { type, id } = useParams<{ type: string; id: string }>()
    const [searchParams] = useSearchParams()
    const pageNum = searchParams.get('page') || '1';
    const isMovieEnabled = (type === 'both' || type === 'movie') && !!id;
    const isTvEnabled = (type === 'both' || type === 'tv') && !!id;
    const targetRef = React.useRef<HTMLDivElement>(null);

    async function fetchGenerMovies() {
        return axiosInstance.get(`discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc&with_genres=${id}`)
    }

    async function fetchGenerSeries() {
        return axiosInstance.get(`discover/tv?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc&with_genres=${id}`)
    }

    const scrollToSection = () => {
        targetRef.current?.scrollIntoView({ behavior: "smooth" });
    };


    const { data: MovieData } = useQuery({
        queryKey: ['gener', 'movie', id, pageNum],
        queryFn: fetchGenerMovies,
        enabled: isMovieEnabled,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const { data: SeriesData } = useQuery({
        queryKey: ['gener', 'tv', id, pageNum],
        queryFn: fetchGenerSeries,
        enabled: isTvEnabled,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <>
            <MainSlider url={`discover/${type === 'both' ? 'movie' : type}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`} />
            {(type === 'both' || type === 'tv') && <Slider text={`Popular ${searchParams.get('name') ? searchParams.get('name') : ''} Series`} path='tv' url={`discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`} />}
            {(type === 'both' || type === 'movie') && <Slider text={`Popular ${searchParams.get('name') ? searchParams.get('name') : ''} Movies`} path='movie' url={`discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`} />}
            <div ref={targetRef} className='flex flex-col justify-center items-center space-y-2 mt-10 mb-10'>
                <h3 className='text-4xl font-bold'>Category</h3>
                <h2 className="text-7xl font-bold lg:text-8xl flex flex-wrap">
                    {searchParams.get('name').toUpperCase().split('').map((char, idx) => (
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            key={idx}
                            className={`relative letter-shadow-r ${char === '&' ? 'mx-6' : 'lg:-ml-3 -ml-3'} text-secondary '`}
                        >
                            {char}
                        </motion.span>
                    ))}
                </h2>
            </div>
            {isMovieEnabled &&
                <div className='container mx-auto px-4 mb-20 max-w-7xl'>
                    <h4 className='text-3xl font-semibold border-b-2 border-secondary mx-auto w-fit'>Movies</h4>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
                        {MovieData?.data?.results?.map((movie: any) => (
                            <Link
                                to={`/movie/${movie.id}`}
                                key={movie.id}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className='relative group w-72 mx-auto h-40 hover:scale-105 transition-all duration-300'>
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
                                        <p>{movie?.vote_average.toFixed(1)} <span className='text-yellow-400'>★</span></p>
                                        <p>{movie?.release_date?.slice(0, 4) || movie?.first_air_date?.slice(0, 4)}</p>
                                    </div>

                                    <div className='flex justify-between items-center mt-1'>
                                        <h5 className='text-white group-hover:text-secondary transition-all duration-300 line-clamp-1  font-semibold'>{movie.name || movie.title}</h5>
                                    </div>
                                </motion.div>
                            </Link>

                        ))}
                    </motion.div>
                </div>}
            {isTvEnabled &&
                <div className='container mx-auto  max-w-7xl'>
                    <h4 className='text-3xl font-semibold border-b-2 border-secondary mx-auto w-fit'>Series</h4>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
                        {SeriesData?.data?.results?.map((movie: any) => (
                            <Link
                                to={`/series/${movie.id}`}
                                key={movie.id}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className='relative group w-72 mx-auto h-40 hover:scale-105 transition-all duration-300'>
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
                                        <p>{movie?.vote_average.toFixed(1)} <span className='text-yellow-400'>★</span></p>
                                        <p>{movie?.release_date?.slice(0, 4) || movie?.first_air_date?.slice(0, 4)}</p>
                                    </div>

                                    <div className='flex justify-between items-center mt-1'>
                                        <h5 className='text-white group-hover:text-secondary line-clamp-1 transition-all duration-300  font-semibold'>{movie.name || movie.title}</h5>
                                    </div>
                                </motion.div>
                            </Link>

                        ))}
                    </motion.div>
                </div>}
            <div className='flex justify-center items-center space-x-4 mt-20'>
                {parseInt(pageNum) > 1 && <Link onClick={() => scrollToSection()} to={`/gener/${type}/${id}?name=${searchParams.get('name')}&page=${parseInt(pageNum) - 1}`} className='px-4 py-2 text-secondary hover:bg-secondary hover:text-black transition-all font-bold duration-300 outline-1 rounded-full text-lg disabled:opacity-50'>
                    Previous
                </Link>}
                <Link onClick={() => scrollToSection()} to={`/gener/${type}/${id}?name=${searchParams.get('name')}&page=${parseInt(pageNum) + 1}`} className='px-4 py-2 text-secondary hover:bg-secondary hover:text-black transition-all font-bold duration-300 outline-1 rounded-full text-lg'>
                    Next
                </Link>
            </div >
        </>
    )
}
