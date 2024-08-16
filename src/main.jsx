import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DashBoardAdmin from './layout/dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import Dash from './pages/dashAdmin/Dash.jsx';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import Register from './pages/landing/Register.jsx';
import LoginPage from './pages/landing/Login.jsx';
import Recovery from './pages/landing/recovery.jsx';
import Profile from './pages/dashAdmin/Profile.jsx';
import Payment from './pages/dashAdmin/Payment.jsx';
import Meter from './pages/dashAdmin/Meter.jsx';
import Client from './pages/dashAdmin/Client.jsx';
import Usage from './pages/dashAdmin/Usage.jsx';
import User from './pages/dashAdmin/Users.jsx';
import Protected from './Hooks/Protected.jsx';
import Verification from './pages/landing/verification.jsx';
import ResetPage from './pages/landing/Reset.jsx';
import Company from './pages/dashAdmin/Company.jsx';
import RechargePage from './pages/landing/recharge.jsx';
import ResetPageFarmer from './pages/landing/verification.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "recovery",
        element: <Recovery />
      },
      {
        path: "verify/client/:emailKey",
        element: <ResetPageFarmer />
      },
      {
        path: "recover/account/:emailKey",
        element: <ResetPage />
      },
      {
        path: "recharge",
        element: <RechargePage />
      }
    ]
  }, {
    path: "/auth/comp/:id",
    element: <Protected><DashBoardAdmin /></Protected>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dash />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
      {
        path: "Payment",
        element: <Payment />,
      },
      {
        path: "Systems",
        element: <Meter />,
      },
      {
        path: "Farmers",
        element: <Client />,
      },
      {
        path: "Usage",
        element: <Usage />,
      },
      {
        path: "Users",
        element: <User />,
      },
      {
        path: "Company",
        element: <Company />,
      },
    ]

  }
], {basename:"/ecoirrigation"})


const lighTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#386641',
    },
    secondary: {
      main: '#fb8500',
    },
  },
  typography: {
    h1: {
      fontSize: '3.4rem',
    },
  },
}
)


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    h1: {
      fontSize: '3.4rem',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={lighTheme}>
    <CssBaseline />
    <React.StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
    </React.StrictMode>
  </ThemeProvider>

)
