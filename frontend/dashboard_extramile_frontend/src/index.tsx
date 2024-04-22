import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@/themes/theme-provider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginAndRegistrationForm } from '@/components/ui/pages/login-and-registeration-form'
import { InputOTPForm } from '@/components/ui/pages/input-otp-form'
import { ToogleMenu } from '@/components/ui/pages/toogle-menu'
import DashBoard from '@/components/ui/pages/dashboard'
import { Toaster } from '@/components/ui/toaster'
import { PanelBoard } from '@/components/ui/pages/panelboard'
import { PerformanceParticipate } from '@/components/ui/pages/performance-participate'
import Test from '@/components/ui/pages/test'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
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
      <Route path='test' element={<Test />} />
    </Route>
  </Routes>
)

root.render(
  <React.StrictMode>
   <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
