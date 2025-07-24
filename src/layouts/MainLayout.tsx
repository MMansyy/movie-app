import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </>
    )
}
