import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import Auth from '../pages/Auth'
import Categories, { categoriesAction, categoryLouder } from '../pages/Categories'
import ErrorPage from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import Layout from '../pages/Layout'
import Transactions, { transactionAction, transactionLoader } from '../pages/Transaction'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'transactions',
        loader: transactionLoader,
        action: transactionAction,
        element: (
          <ProtectedRoute>

            <Transactions />
          </ProtectedRoute>
        ),
      },
      {
        path: 'categories',
        action:categoriesAction,
        loader:categoryLouder,
        element: (
          <ProtectedRoute>

            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
])
