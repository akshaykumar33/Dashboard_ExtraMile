import { Button } from '@/components/ui/button'
import { useTheme } from '@/themes/theme-provider'
import '@/App.css'
import { Link } from 'react-router-dom'

function App() {
  const { theme } = useTheme()
  return (
    <>
      <div className='card'>
        <div
          className={`${theme === 'light' ? 'glow' : 'dark glow'} welcomebar`}>
          Welcome to Homepage of ExtraMile <span>😊</span>
        </div>

        <div className='mid'>
          <Link to='/form/register'>
            <Button className='glow'>Register</Button>
          </Link>
          <Link to='/form/login'>
            <Button className='glow'>Login</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default App
