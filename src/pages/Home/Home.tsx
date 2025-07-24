import { useEffect } from 'react'
import MainSlider from '../../components/MainSlider/MainSlider'
import Slider from '../../components/Slider/Slider'
import { Link } from 'react-router-dom'





const Movie2 = {
    "backdrop_path": "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    "id": 66732,
    "name": "Stranger Things",
    "original_language": "en",
    "original_name": "Stranger Things",
    "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    "popularity": 166.0623,
    "poster_path": "/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    'logo_path': "/uyVM5qGksUzCgwo6UU0UrHex8Oj.png"
}

export default function Home() {

    useEffect(() => {
        document.title = 'Home - Movie App'
    }, [])

    return (
        <div className=''>
            <MainSlider url='movie/popular?language=en-US&page=1' />
            <Slider text='Trendig this week' url='trending/movie/week?language=en-US' path='movie' />
            <Slider text='Top 10 Movies Today' url='trending/movie/day?language=en-US' type='top10' path='movie' />
            <div className='h-screen my-10 relative overflow-hidden'>
                <img
                    src={`https://image.tmdb.org/t/p/original${Movie2.backdrop_path}`}
                    alt={Movie2.name}
                    className='w-full h-full object-cover'
                />
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary to-transparent z-10'></div>
                <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary to-transparent z-10'></div>
                <div className='absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary to-transparent z-10'></div>
                <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent z-10'></div>
                <div className='absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-end px-20 text-right'>
                    <img
                        src={`https://image.tmdb.org/t/p/original${Movie2.logo_path}`}
                        alt={Movie2.name}
                        className='w-64 rounded-lg shadow-lg'
                    />
                    <p className='text-white text-lg md:max-w-1/2 font-bold mt-4'>
                        {Movie2.overview}
                    </p>
                    <Link to={`series/${Movie2.id}`} className=' flex items-center gap-2 outline-1 outline-secondary text-secondary px-4 py-3 rounded-full mt-4 hover:bg-secondary hover:text-black transition-colors'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 384 512" height={18} width={18} xmlns="http://www.w3.org/2000/svg"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                        <p className='text-xl'>Watch Now</p>
                    </Link>


                </div>
            </div>
            <Slider text='Action Movies' url='discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=28' path='movie' />




        </div>
    )
}
