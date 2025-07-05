import MainSlider from '../../components/MainSlider/MainSlider'
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'

export default function Home() {
    return (
        <div className=''>
            <Navbar />
            <MainSlider />
            <Slider text='Trendig this week' />
        </div>
    )
}
