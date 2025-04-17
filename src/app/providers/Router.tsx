import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TEST from '@/pages/TEST';
import Layout from '../layout';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import { LandingPage } from '@/pages/landing/ui/LandingPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <TEST /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'landing', element: <LandingPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
