import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

interface Gener {
    id: number;
    name: string;
    type?: string;
}

const geners: Gener[] = [
    { id: 10759, name: "Action & Adventure", type: "tv" },
    { id: 28, name: "Action", type: "movie" },
    { id: 12, name: "Adventure", type: "movie" },
    { id: 16, name: "Animation", type: "both" },
    { id: 35, name: "Comedy", type: "both" },
    { id: 80, name: "Crime", type: "both" },
    { id: 99, name: "Documentary", type: "both" },
    { id: 18, name: "Drama", type: "both" },
    { id: 10751, name: "Family", type: "both" },
    { id: 14, name: "Fantasy", type: "movie" },
    { id: 36, name: "History", type: "movie" },
    { id: 27, name: "Horror", type: "movie" },
    { id: 10762, name: "Kids", type: "tv" },
    { id: 10402, name: "Music", type: "movie" },
    { id: 9648, name: "Mystery", type: "both" },
    { id: 10763, name: "News", type: "tv" },
    { id: 10764, name: "Reality", type: "tv" },
    { id: 10765, name: "Sci-Fi & Fantasy", type: "tv" },
    { id: 878, name: "Science Fiction", type: "movie" },
    { id: 10766, name: "Soap", type: "tv" },
    { id: 10767, name: "Talk", type: "tv" },
    { id: 10770, name: "TV Movie", type: "movie" },
    { id: 53, name: "Thriller", type: "movie" },
    { id: 10768, name: "War & Politics", type: "tv" },
    { id: 10752, name: "War", type: "movie" },
    { id: 37, name: "Western", type: "both" }
];


export default function Geners() {

    useEffect(() => {
        document.title = 'Geners - Movie App'
        window.scrollTo(0, 0)
    }, [])



    return (
        <div className='min-h-[80vh]'>
            <div className="mt-28 flex flex-col gap-8 px-5 sm:px-20 md:mt-40">
                <div className="space-y-4">
                    <h2 className="text-center text-2xl font-semibold lg:text-3xl">
                        Watch Movies and TV Series organized by category.
                    </h2>
                    <p className="text-center text-base-content lg:px-44">
                        Find a variety of genres like Thriller, Romcom, Mystery, Action, kdrama and more on NOTFLIX, from classics to the latest news. Browse our categories and find the next great story that will capture your imagination.
                    </p>
                </div>

                <ul className="mt-5 flex flex-wrap justify-center gap-3">
                    {geners?.map((gener, i) => (
                        <Link to={`/gener/${gener?.type}/${gener.id}?name=${encodeURIComponent(gener.name)}`} className="text-base-content">
                            <li key={gener.id} className={`${i % 2 === 0 ? 'text-secondary hover:bg-secondary hover:text-black' : 'hover:text-black hover:bg-white'} transition-all font-bold duration-300 outline-1 rounded-full text-2xl px-4 py-2`}>
                                {gener.name}
                            </li>
                        </Link>
                    ))}

                </ul>
            </div>
        </div>
    )
}
