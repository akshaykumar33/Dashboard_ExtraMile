import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/themes/theme-provider'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const { theme, setTheme } = useTheme()
  return (
    <>
      <div className='themetoggle'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
