import { useEffect } from 'react'
import MainSlider from '../../components/MainSlider/MainSlider'
import Slider from '../../components/Slider/Slider'

export default function Home() {

    useEffect(() => {
        document.title = 'Home - Movie App'
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className=''>
            <MainSlider />
            <Slider text='Trendig this week' url='trending/movie/week?language=en-US' />
        </div>
    )
}
