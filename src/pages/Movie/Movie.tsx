/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Autoplay, EffectFade, FreeMode, Mousewheel, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Movie } from '../../components/MainSlider/MainSlider'
import Avatar from '../../components/Avatar/Avatar'
import Slider from '../../components/Slider/Slider'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../utils/axios.global'
import Loader from '../../components/Loader/Loader'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from "react-icons/fa";
import { motion } from 'framer-motion'
import { addToFavourites, isFavourite } from '../../utils/addFav'

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


export interface TVShow {
    adult: boolean;
    backdrop_path: string | null;
    created_by: {
        id: number;
        credit_id: string;
        name: string;
        original_name: string;
        gender: number;
        profile_path: string | null;
    }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        episode_type: string;
        production_code: string;
        runtime: number;
        season_number: number;
        show_id: number;
        still_path: string | null;
    } | null;
    name: string;
    next_episode_to_air: null;
    networks: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
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
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null;
        season_number: number;
        vote_average: number;
    }[];
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
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






export default function Movie({ type }: { type: 'movie' | 'tv' }) {
    const { movieId } = useParams<{ movieId: string }>()
    const [Film, setFilm] = useState<MovieDetails | TVShow | null>(null)
    const [movieImages, setMovieImages] = useState<MovieImages | null>(null)
    const [movieVideos, setMovieVideos] = useState<MovieVideos[]>([])
    const [cast, setCast] = useState([]);
    const [isFav, setIsFav] = useState(() => !!isFavourite(Film?.id));

    useEffect(() => {
        setIsFav(!!isFavourite(Film?.id));
    }, [Film]);

    const handleFavouriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        addToFavourites(Film);
        setIsFav(!!isFavourite(Film?.id)); // إعادة التقييم بعد الإضافة
    };

    async function fetchMovieDetails(movieId: string) {
        if (!movieId) return null;
        if (type === 'tv') {
            return await axiosInstance(`https://api.themoviedb.org/3/tv/${movieId}`)
        }
        return await axiosInstance(`https://api.themoviedb.org/3/movie/${movieId}`)
    }

    async function fetchMovieImages(movieId: string) {
        if (!movieId) return null;
        if (type === 'tv') {
            return await axiosInstance(`https://api.themoviedb.org/3/tv/${movieId}/images?language=en&include_image_language=en,null`)
        }
        return await axiosInstance(`https://api.themoviedb.org/3/movie/${movieId}/images?language=en&include_image_language=en,null`)
    }

    async function fetchMovieVideos(movieId: string) {
        if (!movieId) return null;
        if (type === 'tv') {
            return await axiosInstance(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`)
        }
        return await axiosInstance(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`)
    }

    async function fetchMovieCast(movieId: string) {
        if (!movieId) return null;
        if (type === 'tv') {
            return await axiosInstance(`https://api.themoviedb.org/3/tv/${movieId}/credits?language=en-US`)
        }
        return await axiosInstance(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`)
    }



    const { data: movieDetails, isLoading: Loading1 } = useQuery({
        queryKey: ['movieDetails', movieId, type],
        queryFn: () => fetchMovieDetails(movieId || ''),
        refetchOnWindowFocus: false,
        enabled: !!movieId,
        // staleTime: 1000 * 60 * 5, // 5 minutes
    })

    const { data: images, isLoading: Loading2 } = useQuery({
        queryKey: ['movieImages', movieId, type],
        queryFn: () => fetchMovieImages(movieId || ''),
        refetchOnWindowFocus: false,
        enabled: !!movieId,
        // staleTime: 1000 * 60 * 5, // 5 minutes
    })

    const { data: videos, isLoading: Loading3 } = useQuery({
        queryKey: ['movieVideos', movieId, type],
        queryFn: () => fetchMovieVideos(movieId || ''),
        refetchOnWindowFocus: false,
        enabled: !!movieId,
        // staleTime: 1000 * 60 * 5, // 5 minutes
    })


    const { data: castData, isLoading: Loading4 } = useQuery({
        queryKey: ['movieCast', movieId, type],
        queryFn: () => fetchMovieCast(movieId || ''),
        refetchOnWindowFocus: false,
        enabled: !!movieId,
        // staleTime: 1000 * 60 * 5, // 5 minutes,
    });



    useEffect(() => {
        if (movieDetails) {
            if (type === 'movie') {
                setFilm(movieDetails.data as MovieDetails);
            } else {
                setFilm(movieDetails.data as TVShow);
            }
        }
    }, [movieDetails, movieId, type]);


    useEffect(() => {
        if (images) {
            setMovieImages(images?.data as MovieImages);
        }
    }, [images, movieId, type]);

    useEffect(() => {
        if (videos) {
            setMovieVideos(videos?.data?.results as MovieVideos[]);
        }
    }, [videos, movieId, type]);

    useEffect(() => {
        if (castData) {
            setCast(castData.data.cast.slice(0, 10));
        }
    }, [castData, movieId]);



    useEffect(() => {
        setFilm(null);
        setMovieImages(null);
        setMovieVideos([]);
    }, [movieId]);

    useEffect(() => {
        document.title = Film ? `${(Film as MovieDetails)?.title || (Film as TVShow)?.name} - Movie App` : 'Movie App';
    }, [Film]);



    return (
        <>
            <div className='w-full h-[90vh] main-slider relative overflow-hidden '>
                <div className='absolute md:w-2/3 w-full left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 flex flex-col md:flex-row items-center justify-center md:justify-between bottom-6 z-20 text-center'>
                    <div className='flex items-center  gap-8 mb-4'>
                        <div className='hidden md:block'>
                            <img
                                className='w-44 rounded-xl'
                                src={movieImages?.posters[0]?.file_path ? `https://image.tmdb.org/t/p/original${movieImages?.posters[0]?.file_path}` : `https://image.tmdb.org/t/p/original${Film?.poster_path}`}
                                alt={(Film as MovieDetails)?.title || (Film as TVShow)?.name}
                            />
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            {movieImages?.logos[0]?.file_path ? <img className='w-56 md:w-64' src={`https://image.tmdb.org/t/p/original${movieImages?.logos[0]?.file_path}`} alt="" /> : <h1 className='text-4xl md:text-4xl md:self-start font-bold text-white'>{(Film as MovieDetails)?.title}</h1>}
                            <p className='font-base font-semibold mt-2 md:mt-5 mb-5 flex gap-4 truncate'><span className='text-yellow-400'> ★ <span className='text-white'>{Film?.vote_average.toString().length > 3 ? Film?.vote_average.toString().slice(0, 3) : Film?.vote_average.toString()}</span></span>  <div className='w-0.5 h-6 rounded-2xl bg-white/30'></div> <span>{(Film as MovieDetails)?.release_date?.split('-')[0] || (Film as TVShow)?.first_air_date?.split('-')[0]}</span>   <div className='w-0.5 h-6 rounded-2xl bg-white/30'></div>  {type === 'movie' && <><span> {(Film as MovieDetails)?.runtime + ' min'}</span>   <div className='w-0.5 h-6 rounded-2xl bg-white/30'></div></>} <span>{Film?.original_language.toUpperCase()}</span>  </p>
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleFavouriteClick}
                                className="cursor-pointer mt-0 flex items-center justify-center rounded-full"
                            >
                                {isFav ? (
                                    <FaHeart className="text-secondary text-4xl" />
                                ) : (
                                    <CiHeart className="text-secondary text-4xl" />
                                )}
                            </motion.button>

                        </div>
                    </div>
                    <div
                        className="hidden relative w-1/3 md:block">
                        <a className="group flex items-center absolute -top-7 left-0  gap-4 cursor-pointer">
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
                {movieImages?.backdrops &&
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
                        {movieImages?.backdrops.length === 0 &&
                            <SwiperSlide className='relative'>
                                <img
                                    src={Film?.backdrop_path ? `https://image.tmdb.org/t/p/original${Film?.backdrop_path}` : ''}
                                    className='w-full h-full object-cover'
                                />
                                <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary  to-transparent z-10'></div>
                                <div className='absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-primary  to-transparent z-10'></div>
                            </SwiperSlide>
                        }
                        {movieImages?.backdrops.map((slide) => (
                            <>
                                <SwiperSlide key={slide?.file_path} className='relative'>
                                    <img
                                        src={slide?.file_path ? `https://image.tmdb.org/t/p/original${slide?.file_path}` : ''}
                                        className='w-full h-full object-cover'
                                    />
                                    <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary  to-transparent z-10'></div>
                                    <div className='absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-primary  to-transparent z-10'></div>
                                </SwiperSlide>
                            </>
                        ))}
                    </Swiper>}
            </div>
            <div className='flex w-full flex-col lg:flex-row lg:justify-between lg:items-center px-4 lg:px-12 py-16'>
                <div className='flex flex-col self-start gap-4 lg:w-1/2'>
                    <div className='flex flex-col'>
                        <p className='text-gray-400 text-sm'>Original Title</p>
                        <h1 className='text-3xl  font-bold text-white'>{(Film as MovieDetails)?.title || (Film as TVShow)?.name}</h1>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-gray-400 text-sm'>Overview</p>
                        <p className='text-gray-300 text-md '>{Film?.overview}</p>
                    </div>
                    <div className='flex gap-4 mt-2'>
                        {Film?.genres.map((genre) => (
                            <span key={genre?.id} className='bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs font-semibold'>{genre.name}</span>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    {movieVideos?.length > 0 && (
                        <iframe
                            title="Final Trailer"
                            rel="preconnect"
                            src={`https://www.youtube-nocookie.com/embed/${movieVideos.find(
                                (video) =>
                                    (video.type === 'Trailer' || video.type === 'Teaser') &&
                                    video.site === 'YouTube' &&
                                    video.official === true
                            )?.key || movieVideos[movieVideos.length - 1]?.key
                                }?autoplay=0&mute=1&controls=1&loop=1`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            width={1920}
                            height={1080}
                            className="m-auto aspect-video h-auto max-w-full rounded-xl 2xl:w-2/3"
                        />
                    )}


                </div>
            </div>
            <div className='px-4 lg:px-12 py-16 overflow-hidden relative'>
                <h2 className='text-3xl font-semibold text-white mb-6'>Main cast</h2>
                <Swiper
                    modules={[Navigation, Mousewheel, FreeMode]}
                    freeMode={true}
                    navigation
                    spaceBetween={0}
                    mousewheel={{ forceToAxis: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            // spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 3,
                            // spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: 4,
                            // spaceBetween: 0,
                        },
                        1280: {
                            slidesPerView: 5,
                            // spaceBetween: 0,
                        },
                        1536: {
                            slidesPerView: 6,
                            // spaceBetween: 0,
                        },
                    }}
                    className="w-full Slider"
                >
                    {cast.map((actor) => (
                        <SwiperSlide key={actor.id}>
                            <Avatar
                                actorName={actor.name}
                                characterName={actor.character}
                                imageUrl={actor.profile_path}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
            <div className='py-16'>
                <Slider text='Recommendation' url={`${type}/${movieId}/recommendations`} path={type} />
            </div>
            {(Loading1 || Loading2 || Loading3 || Loading4) && <Loader />}
        </>
    )
}
