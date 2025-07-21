import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home/Home'
import 'swiper/swiper-bundle.css'
import './App.css'
import Movie from './pages/Movie/Movie'
import MainLayout from './layouts/MainLayout'
import Geners from './pages/Geners/Geners'
import Gener from './pages/Gener/Gener'
import Search from './pages/Search/Search'
import Movies from './pages/Movies/Movies'
import Fav from './pages/Fav/Fav'
import Series from './pages/Series/Series'

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
          element: <Movie type='movie' />
        },
        {
          path: '/series/:movieId',
          element: <Movie type='tv' />
        },
        {
          path: '/geners',
          element: <Geners />
        },
        {
          path: '/gener/:type/:id',
          element: <Gener />
        },
        {
          path: '/search',
          element: <Search />
        },
        {
          path: '/movies',
          element: <Movies />
        },
        {
          path: '/favourites',
          element: <Fav />
        },
        {
          path: '/tv-shows',
          element: <Series />
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
