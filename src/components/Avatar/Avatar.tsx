import React from 'react'

interface AvatarProps {
    imageUrl?: string;
    actorName?: string;
    characterName?: string;
}

export default function Avatar({ imageUrl, actorName, characterName }: AvatarProps) {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='w-24 h-24 rounded-full flex items-center border-2 border-transparent hover:border-secondary transition-all duration-300 justify-center mt-2'>
                <img src={`https://image.tmdb.org/t/p/original/${imageUrl || 'cCzCClIzIh81Fa79hpW5nXoUsHK.png'}`} alt='Avatar' className='w-full h-full rounded-full object-cover' />
            </div>
            <div className='text-white text-center text-sm mt-2'>
                <p className='font-semibold truncate text-base'>{actorName.split(' ').slice(0,2).join(' ') || 'Mansy'}</p>
                <p className='text-gray-400 truncate'>{characterName || 'Jota'}</p>
            </div>
        </div>
    )
}
