import { createBrowserRouter } from 'react-router-dom';

import Login from './features/auth/Pages/Login';
import Register from './features/auth/Pages/Register';
import Home from "./features/auth/Pages/Home"
import InterviewHome from './features/interview/Pages/Home';
import InterviewPage from './features/interview/Pages/interview';
import Protected from './features/auth/Protected/Protected'; // apna sahi path daalo

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/upload',
    element: <InterviewHome />,
  },
  {
    path: '/interview/:interviewId',
    element: (
      <Protected>
        <InterviewPage />
      </Protected>
    ),
  },
]);