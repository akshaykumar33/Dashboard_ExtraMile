/* eslint-disable react-refresh/only-export-components */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@/themes/theme-provider.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginAndRegistrationForm } from '@/components/ui/pages/login-and-registeration-form.tsx'
import { InputOTPForm } from '@/components/ui/pages/input-otp-form.tsx'
import { ToogleMenu } from '@/components/ui/pages/toogle-menu.tsx'
import DashBoard from '@/components/ui/pages/dashboard.tsx'
import { Toaster } from '@/components/ui/toaster'
import { PanelBoard } from '@/components/ui/pages/panelboard.tsx'
import { PerformanceParticipate } from '@/components/ui/pages/performance-participate.tsx'
import Test from '@/components/ui/pages/test.tsx'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<ToogleMenu />}>
      <Route path='' element={<App />} />
      <Route path='otp' element={<InputOTPForm />} />
      <Route path='form/register' element={<LoginAndRegistrationForm />} />
      <Route path='form/login' element={<LoginAndRegistrationForm />} />
      <Route path='dashboard' element={<DashBoard />} />
      <Route path='/employee/:id' element={<PanelBoard />} />
      <Route path='/performance/:id' element={<PerformanceParticipate />} />
      <Route path='/forgot' element={<InputOTPForm />} />
      <Route path='/test' element={<Test />} />
    </Route>
  </Routes>
)

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
