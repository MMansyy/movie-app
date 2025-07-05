import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import './Slider.css';
import axiosInstance from '../../utils/axios.global';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { Movie } from '../MainSlider/MainSlider';


interface SliderProps {
    text: string;
}

async function fetchMovies() {
    return axiosInstance.get('trending/movie/week?language=en-US')
}

export default function Slider({ text }: SliderProps) {

    const [trendingMovies, settrendingMovies] = useState<Movie[]>([])

    const { data } = useQuery({
        queryKey: ['trendingMovies'],
        queryFn: fetchMovies,
        refetchOnWindowFocus: false,
    })



    useEffect(() => {
        if (data) {
            settrendingMovies(data.data.results);
        }
    }, [data]);


    return (
        <div className='bg-primary overflow-hidden relative'>
            <div className='container mx-auto px-4 md:px-10 py-10'>
                <h1 className='text-2xl md:text-3xl font-bold text-left mb-6'>{text}</h1>
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
                    {trendingMovies.map((movie) => (
                        <SwiperSlide key={movie.id} className="mx-6 md:mx-0 group">
                            <div className="relative w-fit flex flex-col items-center justify-center">
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'}
                                    alt={movie.title}
                                    loading='lazy'
                                    className="rounded-2xl border-[3px] border-transparent group-hover:border-secondary max-w-52 object-cover transition-all duration-500 group-hover:scale-105"
                                />
                                <div className='absolute w-0 h-0 z-50 group-hover:w-10 group-hover:h-10 transition-all duration-300 flex items-center justify-center bg-secondary text-black rounded-full'>
                                    <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                </div>
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 group-hover:scale-[103%] transition-all duration-300 rounded-2xl"></div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
        </div>
    );
}
