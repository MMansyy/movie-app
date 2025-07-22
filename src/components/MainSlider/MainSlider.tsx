import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay, Mousewheel } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import './MainSlider.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader.tsx';
import axiosInstance from '../../utils/axios.global.ts';
import { Link } from 'react-router-dom';

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name?: string;
    first_air_date?: string;
}





export default function MainSlider({ url }: { url: string }) {

    async function fetchMovies() {
        return axiosInstance.get(url)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['topMovies', url],
        enabled: !!url,
        queryFn: fetchMovies,
        refetchOnWindowFocus: false,
    })

    const movies: Movie[] = data?.data?.results

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const totalSlides = movies?.length || 0;


    useEffect(() => {
        if (movies && movies.length > 0) {
            setActiveIndex(0);
        }
    }, [movies]);


    return (
        <>
            <div className='w-full h-[90vh] main-slider relative'>
                <div className="absolute inset-y-0 right-24 z-10 bottom-1/4 hidden gap-4 lg:flex lg:flex-col lg:items-center lg:justify-end">
                    <span className='text-white font-semibold text-lg'>{totalSlides}</span>
                    <div className="relative h-44 w-1.5 overflow-hidden rounded-full bg-white/30">
                        <div
                            className="absolute bottom-0 left-0 w-full rounded-full bg-white transition-all duration-300"
                            style={{
                                height: `${((activeIndex + 1) / totalSlides) * 100}%`
                            }}
                        ></div>
                    </div>
                    <span className='text-white font-semibold text-lg'>{activeIndex + 1}</span>
                </div>
                {movies?.length > 0 &&
                    <Swiper
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        className='w-full h-full'
                        navigation={true}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, EffectFade, Autoplay, Mousewheel]}
                        effect='fade'
                        mousewheel={{ forceToAxis: true }}
                        spaceBetween={0}
                        speed={800}
                    >
                        {movies?.map((slide) => (
                            <SwiperSlide key={slide.id} className='relative'
                            >
                                <img
                                    src={slide.backdrop_path ? `https://image.tmdb.org/t/p/original${slide.backdrop_path}` : ''}
                                    alt={slide.title}
                                    className='w-full h-full object-cover'
                                />
                                <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary  to-transparent z-10'></div>
                                <div className='absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-primary  to-transparent z-10'></div>
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute bottom-1/3  right-1/5 2xl:right-1/4 z-40 hidden lg:block">
                                    <Link to={`/${slide.first_air_date ? 'series' : 'movie'}/${slide.id}`} className="group flex items-center gap-4 cursor-pointer">
                                        <span className="grid h-32 w-32 place-content-center rounded-full border-2 border-[#38BDF8] transition-all duration-300 ease-in-out group-hover:bg-[#38BDF8]">
                                            <svg
                                                className="w-11 h-11 text-[#38BDF8] group-hover:text-white transition-colors duration-300"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 384 512"
                                                fill="currentColor"
                                            >
                                                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                                            </svg>
                                        </span>
                                        <span className="text-white text-3xl font-semibold uppercase tracking-wider transition-colors duration-300 group-hover:text-[#38BDF8]">
                                            Watch Now!
                                        </span>
                                    </Link>
                                </motion.div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -40, transition: { duration: 0 } }}
                                        transition={{ duration: 0.8 }}
                                        className='absolute bottom-1/4 md:bottom-1/3 md:left-20 px-4  text-center md:text-left z-20 text-white flex flex-col items-center lg:items-start'
                                    >
                                        <h2 className='text-3xl font-extrabold mb-2'>{slide.title || slide?.name}</h2>
                                        <p className='text-xl  font-semibold mt-5 mb-5 flex gap-4'><span className='text-yellow-400'> ★ <span className='text-white'>{slide.vote_average.toString().length > 4 ? slide.vote_average.toString().slice(0, 4) : slide.vote_average.toString()}</span></span>  | <span>{slide.release_date || slide?.first_air_date.slice(0, 4)}</span>   |  <span>{slide.original_language.toUpperCase()}</span>  </p>
                                        <p className='text-lg mb-4 line-clamp-2  md:w-2/5'>{slide.overview}</p>
                                        <Link to={`/${slide.first_air_date ? 'series' : 'movie'}/${slide.id}`} className='text-black bg-[#38BDF8] lg:hidden hover:underline px-5 py-2 font-bold  rounded-4xl'>
                                            <span>
                                                Watch Now
                                            </span>
                                        </Link>
                                    </motion.div>
                                </AnimatePresence>

                            </SwiperSlide>
                        ))}
                    </Swiper>}
            </div>
            {isLoading && <Loader />}
        </>
    )
}
