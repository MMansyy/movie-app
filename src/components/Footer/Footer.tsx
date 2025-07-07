import React from 'react'

export default function Footer() {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-secondary/20 to-transparent px-8 pb-6 pt-32 sm:gap-0 sm:px-14 sm:pt-36">
            <div><p className="w-full text-start text-xs text-gray-300 md:text-end lg:text-base">© 2025 Mansy. All rights reserved.</p></div><div className=" max-w-sm md:order-first lg:max-w-lg"><p className="w-full text-xs text-gray-300 lg:text-sm">Wooflix does not store any files on it's server, It only links to the media which is hosted on 3rd party services like YouTube, Dailymotion, Ok.ru, Vidsrc and more.</p></div></footer>
    )
}
