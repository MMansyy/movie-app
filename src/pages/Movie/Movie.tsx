import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Autoplay, EffectFade, Mousewheel, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Movie } from '../../components/MainSlider/MainSlider'

interface ImageItem {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface LogoItem extends ImageItem { }

interface PosterItem extends ImageItem { }

interface BackdropItem extends ImageItem { }

interface MovieImages {
    id: number;
    backdrops: BackdropItem[];
    logos: LogoItem[];
    posters: PosterItem[];
}

interface MovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    } | null;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}



const movieImages: MovieImages = {
    id: 12345,
    backdrops: [
        {
            "aspect_ratio": 1.778,
            "height": 2160,
            "iso_639_1": "en",
            "file_path": "/q40cm0yiEgsTZNYZpsUULOKzHk5.jpg",
            "vote_average": 3.334,
            "vote_count": 1,
            "width": 3840
        },
        {
            "aspect_ratio": 1.778,
            "height": 2160,
            "iso_639_1": "en",
            "file_path": "/1B7CXnNQbIqPMvYAZrvwEv9563R.jpg",
            "vote_average": 2.542,
            "vote_count": 4,
            "width": 3840
        },
        {
            "aspect_ratio": 1.778,
            "height": 2160,
            "iso_639_1": "en",
            "file_path": "/rIeaf2NLSlw11wT8IoBocHhid1y.jpg",
            "vote_average": 2.278,
            "vote_count": 3,
            "width": 3840
        },
        {
            "aspect_ratio": 1.778,
            "height": 1080,
            "iso_639_1": "en",
            "file_path": "/yUESyc41631HWy5ppT08fYpJKiZ.jpg",
            "vote_average": 1.75,
            "vote_count": 2,
            "width": 1920
        },
        {
            "aspect_ratio": 0.667,
            "height": 3000,
            "iso_639_1": "en",
            "file_path": "/160vKhMhE7K8wiF7oTAwe3tELsH.jpg",
            "vote_average": 1.222,
            "vote_count": 3,
            "width": 2000
        },
        {
            "aspect_ratio": 0.674,
            "height": 1230,
            "iso_639_1": "en",
            "file_path": "/17AjXbJQ12ujLXmxZ2yyhLC92v8.jpg",
            "vote_average": 1.222,
            "vote_count": 3,
            "width": 829
        },
    ],
    logos: [
        {
            "aspect_ratio": 2.214,
            "height": 1285,
            "iso_639_1": "en",
            "file_path": "/jdAWFEuysoBGkzB1MOnHr9qqqqP.png",
            "vote_average": 8.034,
            "vote_count": 5,
            "width": 2845
        }
    ],
    posters: [
        {
            "aspect_ratio": 0.667,
            "height": 3000,
            "iso_639_1": "en",
            "file_path": "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
            "vote_average": 6.346,
            "vote_count": 13,
            "width": 2000
        }
    ]
}



interface MovieVideos {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}


const Film: MovieDetails = {
    adult: false,
    backdrop_path: "/sItIskd5xpiE64bBWYwZintkGf3.jpg",
    belongs_to_collection: {
        id: 1494663,
        name: "Ballerina Collection",
        poster_path: "/xzAyYTHqWtLmqtscUr8cZqaP7lu.jpg",
        backdrop_path: null
    },
    budget: 90000000,
    genres: [
        { id: 28, name: "Action" },
        { id: 53, name: "Thriller" },
        { id: 80, name: "Crime" }
    ],
    homepage: "https://johnwick.movie/film/ballerina",
    id: 541671,
    imdb_id: "tt7181546",
    origin_country: ["US"],
    original_language: "en",
    original_title: "Ballerina",
    overview: "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
    popularity: 759.5684,
    poster_path: "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
    production_companies: [
        {
            id: 3528,
            logo_path: "/cCzCClIzIh81Fa79hpW5nXoUsHK.png",
            name: "Thunder Road",
            origin_country: "US"
        },
        {
            id: 23008,
            logo_path: "/5SarYupipdiejsEqUkwu1SpYfru.png",
            name: "87Eleven",
            origin_country: "US"
        },
        {
            id: 1632,
            logo_path: "/cisLn1YAUuptXVBa0xjq7ST9cH0.png",
            name: "Lionsgate",
            origin_country: "US"
        }
    ],
    production_countries: [
        {
            iso_3166_1: "US",
            name: "United States of America"
        }
    ],
    release_date: "2025-06-04",
    revenue: 100000000,
    runtime: 125,
    spoken_languages: [
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English"
        }
    ],
    status: "Released",
    tagline: "Vengeance has a new face.",
    title: "Ballerina",
    video: false,
    vote_average: 7.338,
    vote_count: 663
};





export default function Movie() {
    const { movieId } = useParams<{ movieId: string }>()



    return (
        <>
            <div className='w-full h-[90vh] main-slider relative'>
                <div className='absolute w-2/3 flex justify-between items-center  bottom-6 left-16 z-20'>
                    <div className='flex items-center gap-8 mb-4'>
                        <div className='hidden lg:block'>
                            <img
                                className='w-44 rounded-xl'
                                src={movieImages.posters[0].file_path ? `https://image.tmdb.org/t/p/original${movieImages.posters[0].file_path}` : ''}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <img className='w-64' src={`https://image.tmdb.org/t/p/original${movieImages?.logos[0].file_path}`} alt="" />
                            <p className='font-base font-semibold mt-5 mb-5 flex gap-4'><span className='text-yellow-400'> ★ <span className='text-white'>{Film.vote_average.toString().length > 3 ? Film.vote_average.toString().slice(0, 3) : Film.vote_average.toString()}</span></span>  <div className='w-0.5 h-6 rounded-2xl bg-white/30'></div> <span>{Film.release_date.split('-')[0]}</span>   <div className='w-0.5 h-6 rounded-2xl bg-white/30'></div>   <span>{Film.runtime + ' min'}</span>   <div className='w-0.5 h-6 rounded-2xl bg-white/30'></div>   <span>{Film.original_language.toUpperCase()}</span>  </p>
                        </div>
                    </div>
                    <div
                        className="hidden  lg:block">
                        <a className="group flex items-center relative right-1/2 gap-4 cursor-pointer">
                            <span className="grid h-20 w-20 place-content-center rounded-full  transition-all duration-300 ease-in-out bg-[#38BDF8]">
                                <svg
                                    className="w-8 h-8 text-black transition-colors duration-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    fill="currentColor"
                                >
                                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                                </svg>
                            </span>
                            <span className="text-white text-2xl font-semibold uppercase tracking-wider transition-colors duration-300 group-hover:text-[#38BDF8]">
                                Play Now!
                            </span>
                        </a>
                    </div>
                </div>
                {movieImages?.backdrops.length > 0 &&
                    <Swiper
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
                        {movieImages?.backdrops.map((slide) => (
                            <>
                                <SwiperSlide key={slide.iso_639_1} className='relative'>
                                    <img
                                        src={slide.file_path ? `https://image.tmdb.org/t/p/original${slide.file_path}` : ''}
                                        className='w-full h-full object-cover'
                                    />
                                    <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary  to-transparent z-10'></div>
                                    <div className='absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-primary  to-transparent z-10'></div>
                                </SwiperSlide>
                            </>
                        ))}
                    </Swiper>}
            </div>
            <div className='flex w-full flex-col lg:flex-row lg:justify-between lg:items-center px-4 lg:px-16 py-16'>
                <div className='flex flex-col self-start gap-4 lg:w-1/2'>
                    <div className='flex flex-col'>
                        <p className='text-gray-400 text-sm'>Original Title</p>
                        <h1 className='text-2xl  font-bold text-white'>{Film.title}</h1>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-gray-400 text-sm'>Overview</p>
                        <p className='text-gray-300 text-md '>{Film.overview}</p>
                    </div>
                    <div className='flex gap-4 mt-2'>
                        {Film.genres.map((genre) => (
                            <span key={genre.id} className='bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs font-semibold'>{genre.name}</span>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <iframe title="Final Trailer" rel="preconnect" src="https://www.youtube-nocookie.com/embed/b9Rr9ygb-ac"
                        allowFullScreen width={1920} height={1080} className="m-auto aspect-video h-auto max-w-full rounded-xl 2xl:w-2/3" />
                </div>
            </div>
            <div className='px-4 lg:px-16 py-16'>
                <h2 className='text-2xl font-semibold text-white mb-6'>Main cast</h2>
                
            </div>
            </>
            )
}
