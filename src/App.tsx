import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home/Home'
import 'swiper/swiper-bundle.css'
import './App.css'
import Movie from './pages/Movie/Movie'
import MainLayout from './layouts/MainLayout'

export default function App() {

  const queryClinet = new QueryClient()

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/movie/:movieId',
          element: <Movie />
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClinet}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}
