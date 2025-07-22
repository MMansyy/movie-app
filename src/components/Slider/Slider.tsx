import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import './Slider.css';
import axiosInstance from '../../utils/axios.global';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import type { Movie } from '../MainSlider/MainSlider';
import { Link } from 'react-router-dom';


interface SliderProps {
    text?: string;
    url: string;
    init?: 'movie' | 'tv';
    selector?: boolean
    type?: 'top10'
    path: 'movie' | 'tv';
}



export default function Slider({ text, url, type, path, init, selector }: SliderProps) {
    async function fetchMovies() {
        if (category === 'tv') {
            return axiosInstance.get(`trending/tv/week?language=en-US`);
        }
        return axiosInstance.get(url)
    }

    const [trendingMovies, settrendingMovies] = useState<Movie[]>([])
    const [category, setCategory] = useState<'movie' | 'tv'>(init || 'movie');
    const categoryRef = useRef<HTMLSelectElement>(undefined);

    const { data } = useQuery({
        queryKey: ['trendingMovies', url, category],
        queryFn: fetchMovies,
        refetchOnWindowFocus: false,
        enabled: !!url
    })



    useEffect(() => {
        if (data) {
            settrendingMovies(data.data.results);
        }
    }, [data, url]);


    return (
        <div className='bg-primary overflow-hidden relative'>
            <div className='container mx-auto px-4 md:px-10 py-10'>
                {(type !== 'top10' && text) && <h1 className='text-3xl md:text-3xl font-bold text-left mb-6'>{text}</h1>}
                {type === 'top10' &&
                    <div className="flex items-center justify-between gap-8 px-4 mb-7 sm:px-7 max-sm:flex-col">

                        <div className=" flex items-center justify-center gap-4 max-sm:flex-col">

                            <h3 className="text-8xl font-bold   lg:text-9xl flex">
                                {['T', 'O', 'P', '1', '0'].map((char, idx) => (
                                    <span
                                        key={idx}
                                        className={`relative letter-shadow-r  text-outline  ${idx === 4 ? 'lg:-ml-8 -ml-2.5' : idx === 3 ? 'ml-0 ' : 'lg:-ml-7 -ml-3'
                                            }`}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </h3>

                            <div className="flex flex-col gap-2 max-sm:text-center">
                                <h3 className="text-xl font-semibold uppercase tracking-[10px]">{category === 'movie' ? 'Movies' : 'TV SHOWS'}</h3>
                                <h3 className="text-xl font-semibold tracking-[10px]">TODAY</h3>
                            </div>
                        </div>

                        <div>
                            {!selector && <select
                                ref={categoryRef}
                                onChange={() => {
                                    setCategory(categoryRef?.current?.value as 'movie' | 'tv');
                                }}
                                value={category}
                                className="px-3 py-2  rounded-full w-max max-w-xs">
                                <option value="movie">Movies</option>
                                <option value="tv">Series</option>
                            </select>}
                        </div>

                    </div>
                }
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode]}
                    freeMode={true}
                    navigation
                    mousewheel={{ forceToAxis: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: -20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: -40,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: -50,
                        },
                        1536: {
                            slidesPerView: 6,
                            spaceBetween: -90,

                        },
                    }}
                    className="w-full Slider"
                >
                    {type !== 'top10' && trendingMovies.map((movie) => (
                        <SwiperSlide key={movie.id} className="mx-6 md:mx-0 group">
                            <Link to={`/${path === 'movie' ? path : 'series'}/${movie.id}`} className="relative w-fit flex flex-col items-center justify-center">
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
                        </SwiperSlide>
                    ))}
                    {type === 'top10' && trendingMovies.slice(0, 10).map((movie, index) => (
                        <SwiperSlide key={movie.id} className="mx-6 md:mx-0 group">
                            <Link to={`/${category === 'movie' ? 'movie' : 'series'}/${movie.id}`} className="relative w-fit flex flex-col items-center justify-center">
                                <div className="flex group items-baseline">
                                    <p className="-z-10 translate-x-6 text-8xl -translate-y-1 font-bold sm:text-9xl group-hover:translate-x-2 group-hover:scale-110 group-hover:text-secondary transition-all duration-300 ease-in-out">
                                        {index === 9 ? <>
                                            <span className="text-outline text-shadow-xs">1</span>
                                            <span className="text-outline text-shadow-xs -ml-6">0</span>
                                        </>
                                            :
                                            <span className="text-outline text-shadow-xs">{index + 1}</span>

                                        }
                                    </p>
                                    <div className=' relative'>
                                        <img
                                            className="object-cover transition-all duration-300 ease-in-out group w-[150px] h-[225px] rounded-xl group-hover:ring-2 ring-secondary shadow-[-5px_10px_20px_0px_rgba(0,0,0,0)] group-hover:shadow-[-5px_10px_20px_6px_rgba(0,0,0,1)]"
                                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                                        <div className='absolute top-1/2 left-1/2 -translate-1/2  w-0 h-0 z-50 group-hover:w-10 group-hover:h-10 transition-all duration-300 flex items-center justify-center bg-secondary text-black rounded-full'>
                                            <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                        </div>
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50  transition-all duration-300 rounded-2xl"></div>
                                    </div>
                                </div>

                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
