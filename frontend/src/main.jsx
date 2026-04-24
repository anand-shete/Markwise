import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router';
import * as Lazy from './pages';
import store from './app/store';
import { Provider } from 'react-redux';
import Layout from './pages/Layout';
import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Lazy.Landing />} />

      <Route path="/teacher">
        <Route path="signup" element={<Lazy.TeacherSignUp />} />
        <Route path="login" element={<Lazy.TeacherLogin />} />
        <Route path="dashboard" element={<Lazy.TeacherDashBoard />} />
        <Route path="logout" element={<Lazy.TeacherLogout />} />
      </Route>

      <Route path="/student">
        <Route path="signup" element={<Lazy.StudentSignUp />} />
        <Route path="login" element={<Lazy.StudentLogin />} />
        <Route path="dashboard" element={<Lazy.StudentDashBoard />} />
        <Route path="logout" element={<Lazy.StudentLogout />} />
        <Route path="scan" element={<Lazy.StudentScanner />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
