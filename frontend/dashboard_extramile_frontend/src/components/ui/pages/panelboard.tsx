import { useParams } from 'react-router-dom'
import React, { useState } from 'react'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { AddTask } from '@/types/pages'
import DialogDemo from '@/components/ui/pages/edit'
import PopoverDemo from '@/components/ui/pages/add'

export const PanelBoard: React.FC = () => {
  const { id } = useParams()
  const [ids, setIds] = useState<string | unknown>(null)

  const performances = [
    {
      id: '12',
      name: 'motors',
      category: 'super wheel',
    },
    {
      id: '123',
      name: 'medical',
      category: 'medicinal',
    },
  ]

  const handleId = (id: string) => {
    setIds(id)
    console.log('handleid update perf', ids)
  }

  const onUpdatePerf = (data: AddTask) => {
    console.log(ids, data, 'inside update perf')
  }

  return (
    <>
      <PopoverDemo
        name='Add Performance Review'
        title='Review'
        subtitle='Add Performance Review here'
        taskname='Rating'
        categoryLabel='Level'
        descriptionLabel='Details'
      />

      <Table>
        <TableHeader>
          <TableCell>Name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell className='justify-self-center'>Actions</TableCell>
        </TableHeader>
        {performances.map((performance) => (
          <TableRow key={performance.id}>
            <TableCell>{performance.name}</TableCell>
            <TableCell>{performance.category}</TableCell>
            <TableCell className='flex justify-center gap-4'>
              <DialogDemo
                name='Update'
                description='Performance'
                taskname='Rating'
                categoryLabel='Level'
                descriptionLabel='Details'
                onUpdate={onUpdatePerf}
                handleId={() => handleId(performance.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}
