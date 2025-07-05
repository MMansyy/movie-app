import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home/Home'
import 'swiper/swiper-bundle.css'

export default function App() {

  const queryClinet = new QueryClient()

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    }
  ])

  return (
    <QueryClientProvider client={queryClinet}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}
