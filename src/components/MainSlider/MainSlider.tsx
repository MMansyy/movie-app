import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './MainSlider.css'; // استيراد ملف CSS الخاص بالمكون
import { useState } from 'react';

interface Slide {
    id: number;
    image: string;        // الخلفية (backdrop_path)
    title: string;        // العنوان
    description: string;  // overview
    logo: string;         // البوستر (poster_path)
    link: string;         // لينك الفيلم (مثلاً "/movie/ID")
}


const slides: Slide[] = [
    {
        id: 846422,
        image: "https://image.tmdb.org/t/p/w1280/x58Gk2ZGU5AEBp25MQe2nhZhd5z.jpg",
        title: "The Old Guard 2",
        description: "Andy and her team of immortal warriors fight with renewed purpose as they face a powerful new foe threatening their mission to protect humanity.",
        logo: "https://image.tmdb.org/t/p/w300/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg", // poster_path
        link: "/movie/846422",
    },
    {
        id: 541671,
        image: "https://image.tmdb.org/t/p/w1280/sItIskd5xpiE64bBWYwZintkGf3.jpg",
        title: "Ballerina",
        description: "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
        logo: "https://image.tmdb.org/t/p/w300/mKp4euM5Cv3m2U1Vmby3OGwcD5y.jpg",
        link: "/movie/541671",
    },
    {
        id: 749170,
        image: "https://image.tmdb.org/t/p/w1280/xABhldZaMb6wfCH5oigV333OYnb.jpg",
        title: "Heads of State",
        description: "The UK Prime Minister and US President have a public rivalry that risks their countries' alliance. But when they become targets of a powerful enemy, they're forced to rely on each other...",
        logo: "https://image.tmdb.org/t/p/w300/lVgE5oLzf7ABmzyASEVcjYyHI41.jpg",
        link: "/movie/749170",
    },
    {
        id: 986056,
        image: "https://image.tmdb.org/t/p/w1280/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
        title: "Thunderbolts*",
        description: "After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.",
        logo: "https://image.tmdb.org/t/p/w300/hBH50Mkcrc4m8x73CovLmY7vBx1.jpg",
        link: "/movie/986056",
    },
    {
        id: 1234821,
        image: "https://image.tmdb.org/t/p/w1280/peAzdLKtT6VDWIfPQO9LJD1NCG4.jpg",
        title: "Jurassic World Rebirth",
        description: "Zora Bennett leads a team on a secret mission to secure genetic material from the world's most massive dinosaurs—only to find a shocking discovery.",
        logo: "https://image.tmdb.org/t/p/w300/qwOwDHUPCcDRmdQu8dWCzIVMEgu.jpg",
        link: "/movie/1234821",
    },
];


async function fetchMovies() {
    
}

export default function MainSlider() {

    const [movies, setmovies] = useState<Slide[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const totalSlides = 5;



    return (
        <div className='w-full h-screen main-slider relative'>
            <div className="absolute inset-y-0 right-24 z-10 bottom-1/4 hidden gap-4 md:flex md:flex-col md:items-center md:justify-end">
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
            <Swiper
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className='w-full h-full'
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 3500
                }}
                modules={[Navigation, EffectFade, Autoplay]}
                effect='fade'
                spaceBetween={0}
                speed={800}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className='relative'
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent z-10'></div>
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.8 }}
                            className="absolute bottom-1/3 right-1/3 z-40 hidden md:block">
                            <a className="group flex items-center gap-4 cursor-pointer">
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
                            </a>
                        </motion.div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40, transition: { duration: 0 } }}
                                transition={{ duration: 0.8 }}
                                className='absolute bottom-1/3 md:left-20 text-center md:text-left z-20 text-white'
                            >
                                <h2 className='text-3xl font-bold mb-2'>{slide.title}</h2>
                                <p className='text-xl font-semibold mt-5 mb-5 flex gap-4'><span className='text-yellow-400'> ★ <span className='text-white'>7.9</span></span>  | <span>2025</span>   |  <span>EN</span>  </p>
                                <p className='text-lg mb-4 line-clamp-2  md:w-2/5'>{slide.description}</p>
                                <a href={slide.link} className='text-black bg-[#38BDF8] md:hidden hover:underline px-5 py-2 font-bold  rounded-4xl'>
                                    <span>
                                        Watch Now
                                    </span>
                                </a>
                            </motion.div>
                        </AnimatePresence>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
