import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import EmployeeTable from '@/components/ui/pages/employee-table'

const Admin: React.FC = () => {
  const username = localStorage.getItem('uname')
  const initials = username ? username.substring(0, 2).toUpperCase() : 'AK'
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?')
    if (confirmLogout) {
      localStorage.clear()
      navigate('/')
      // Add logic to navigate to logout route or perform other actions if needed
    }
  }

  const onDelete = (id: unknown | string) => {
    console.log('Employee Delete', id)
  }

  const onUpdate = (id: unknown | string) => {
    console.log('Employee Update', id)
  }
  return (
    <>
      <div className='grid place-self-end'>
        <HoverCard>
          <HoverCardTrigger>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent>
            <Button
              className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...'
              onClick={handleLogout}>
              Logout
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>
      <h1 className='text-lime-500 text-xl glow text-transform: capitalize'>
        Welcome to Admin Dashboard, {username ? username : '😍'}
      </h1>
      <EmployeeTable
        employees={[
          {
            email: 'abc@mail.com',
            name: 'abc',
            id: '1'
          },
          {
            email: 'xyz@mail.com',
            name: 'xyz',
            id: '2'
          }
        ]}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </>
  )
}

export default Admin
