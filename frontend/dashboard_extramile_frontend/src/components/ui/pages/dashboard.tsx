import Admin from '@/components/ui/pages/admin'
// import Employee from '@/components/ui/pages/employee'

function DashBoard() {
  //const role = localStorage.getItem('role')

  // return <>{role && role === 'admin' ? <Admin /> : <Employee />}</>
  return (
    <>
      <Admin />
    </>
  )
}

export default DashBoard
