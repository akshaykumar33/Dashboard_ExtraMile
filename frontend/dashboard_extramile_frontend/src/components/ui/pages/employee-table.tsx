import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { EmployeeTableProps, AddTask } from '@/types/pages'
import DialogDemo from '@/components/ui/pages/edit'
import PopoverDemo from '@/components/ui/pages/add'
import { AlertDialogDemo } from '@/components/ui/pages/delete'

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onUpdate,
  onDelete
}) => {
  const [ids, setIds] = useState<string | unknown>(null)

  const handleId = async (id: string | unknown) => {
    setIds(id)
    console.log('handleid update Emp', ids)
  }

  const onUpdateEmp = async (data: AddTask) => {
    console.log(ids, data, 'inside update Emp')
  }

  return (
    <>
      <PopoverDemo
        name='Add Employee'
        title='Employee'
        subtitle='Add Employee Details here'
        taskname='Email'
        categoryLabel='User Name'
        descriptionLabel='Details'
      />

      <Table>
        <TableHeader>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell className='justify-self-center'>Actions</TableCell>
        </TableHeader>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell className='flex justify-center gap-4'>
              <DialogDemo
                name='Update'
                description='Employee'
                taskname='Email'
                categoryLabel='User Name'
                descriptionLabel='Description'
                onUpdate={onUpdateEmp}
                handleId={() => handleId(employee.id)}
              />
              <AlertDialogDemo onDelete={() => onDelete(employee.id)} />
              <Link to={`/employee/${employee.id}`} className='w-36 h-12'>
                View Performance
              </Link>
              <Link to={`/performance/${employee.id}`} className='w-36 h-12'>
                Performance Particpate
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}

export default EmployeeTable
