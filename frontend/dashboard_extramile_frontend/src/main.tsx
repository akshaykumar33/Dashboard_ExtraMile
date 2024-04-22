import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@/themes/theme-provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginAndRegistrationForm } from '@/components/ui/pages/login-and-registeration-form.tsx'
import { InputOTPForm } from '@/components/ui/pages/input-otp-form.tsx'
import { ToogleMenu } from '@/components/ui/pages/toogle-menu.tsx'
import DashBoard from '@/components/ui/pages/dashboard.tsx'
import { Toaster } from '@/components/ui/toaster'
import { PanelBoard } from '@/components/ui/pages/panelboard.tsx'
import { PerformanceParticipate } from '@/components/ui/pages/performance-participate.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ToogleMenu />,
    children: [
      {
        path: '',
        element: <App />
      },
      {
        path: 'otp',
        element: <InputOTPForm />
      },
      {
        path: 'form/register',
        element: <LoginAndRegistrationForm />
      },
      {
        path: 'form/login',
        element: <LoginAndRegistrationForm />
      },
      {
        path: 'dashboard',
        element: <DashBoard />
      },
      {
        path: '/employee/:id',
        element: <PanelBoard />
      },
      {
        path: '/performance/:id',
        element: <PerformanceParticipate />
      },

      {
        path: '/forgot',
        element: <InputOTPForm />
      }
    ]
  }
])

// eslint-disable-next-line prettier/prettier
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
