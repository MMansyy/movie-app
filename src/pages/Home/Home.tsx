import MainSlider from '../../components/MainSlider/MainSlider'
import Slider from '../../components/Slider/Slider'

export default function Home() {
    return (
        <div className=''>
            <MainSlider />
            <div className=' bg-primary overflow-hidden'>
                <div className='container mx-auto px-4 py-10'>
                    <h1 className='text-3xl font-bold text-left mb-6'>Trending This Week</h1>
                    <Slider />
                </div>
            </div>
        </div>
    )
}
