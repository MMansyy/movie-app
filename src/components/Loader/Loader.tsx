import React from 'react'
import './Loader.css'; // Import your CSS file for styling

export default function Loader() {
    return (
        <div className='w-full h-screen flex items-center justify-center bg-primary/80 z-[1000] fixed top-0 left-0 bottom-0 right-0'>
            <span className="loader" />
        </div>
    )
}
