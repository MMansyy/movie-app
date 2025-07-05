import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import './Slider.css';
import axiosInstance from '../../utils/axios.global';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { Movie } from '../MainSlider/MainSlider';




async function fetchMovies() {
    return axiosInstance.get('trending/movie/week?language=en-US')
}

export default function Slider() {

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
        <div className="">
            <Swiper
                modules={[Navigation, Mousewheel, FreeMode]}
                freeMode={true}
                navigation
                mousewheel={{ forceToAxis: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 100,      
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,      
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: -140,     
                    },
                }}
                className="w-full relative Slider "
            >
                {trendingMovies.map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'}
                            alt={movie.title}
                            loading='lazy'
                            className="rounded-2xl  max-w-52 object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
