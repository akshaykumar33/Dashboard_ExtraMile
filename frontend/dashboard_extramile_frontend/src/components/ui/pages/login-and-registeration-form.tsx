import { useLocation } from 'react-router-dom'
import Registeration from '@/components/ui/pages/registeration'
import Login from '@/components/ui/pages/login'

export function LoginAndRegistrationForm() {
  const location = useLocation()
  const { pathname } = location

  console.log(pathname)

  return (
    <div className='w-full'>
      {pathname && pathname.includes('register') ? (
        <Registeration />
      ) : (
        <Login />
      )}
    </div>
  )
}
