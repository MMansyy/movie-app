import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios.global';
import { Link } from 'react-router-dom';

interface Gener {
    id: number;
    name: string;
}

export default function Geners() {
    const [geners, setGeners] = useState<Gener[]>([])

    useEffect(() => {
        document.title = 'Geners - Movie App'
        window.scrollTo(0, 0)
    }, [])

    async function fetchGeners() {
        return await axiosInstance.get('genre/movie/list')
    }

    const { data } = useQuery({
        queryKey: ['geners'],
        queryFn: fetchGeners,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) {
            setGeners(data.data.genres)
        }
    }, [data])

    return (
        <div className='min-h-[80vh]'>
            <div className="mt-28 flex flex-col gap-8 px-5 sm:px-20 md:mt-40">
                <div className="space-y-4">
                    <h2 className="text-center text-2xl font-semibold lg:text-3xl">
                        Watch Movies and TV Series organized by category.
                    </h2>
                    <p className="text-center text-base-content lg:px-44">
                        Find a variety of genres like Thriller, Romcom, Mystery, Action, kdrama and more on Wooflix, from classics to the latest news. Browse our categories and find the next great story that will capture your imagination.
                    </p>
                </div>

                <ul className="mt-5 flex flex-wrap justify-center gap-3">
                    {geners?.map((gener, i) => (
                        <Link to={`/discover/movie?with_genres=${gener.id}`} className="text-base-content">
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
