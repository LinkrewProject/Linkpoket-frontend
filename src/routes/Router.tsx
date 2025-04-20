import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import LoginPage from '@/pages/pages/auth/login';
import SignupPage from '@/pages/pages/auth/signup';
import { LandingPage } from '@/pages/pages/landing/ui/LandingPage';
import PageLayout from '@/components/page-layout/PageLayout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <PageLayout /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'landing', element: <LandingPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
