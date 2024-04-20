import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@/themes/theme-provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginAndRegistrationForm } from '@/components/ui/pages/login-and-registeration-form.tsx'
import { InputOTPForm } from '@/components/ui/pages/input-otp-form.tsx'
import { Toaster } from '@/components/ui/toaster'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/otp',
    element: <InputOTPForm />,
  },
  {
    path: '/form/register',
    element: <LoginAndRegistrationForm />,
  },
  {
    path: '/form/login',
    element: <LoginAndRegistrationForm />,
  },
])

// eslint-disable-next-line prettier/prettier
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
