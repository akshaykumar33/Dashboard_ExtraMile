import { Card, CardContent } from '@/components/ui/card'
import {
  AddTask,
  StripCardProps,
  StripCardsContainerProps,
} from '@/types/pages'
import DialogDemo from '@/components/ui/pages/edit'
import { AlertDialogDemo } from '@/components/ui/pages/delete'
import { useState } from 'react'

const StripCard: React.FC<StripCardProps> = ({
  title,
  content,
  onDelete,
  onUpdate,
  handleId,
}) => {
  return (
    <Card>
      <CardContent className='flex items-center justify-between m-4 p-4 gap-4'>
        <div className='flex gap-4'>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <div className='flex gap-4'>
          <DialogDemo
            name='Update'
            description='Tasks'
            taskname='Task Name'
            categoryLabel='Category'
            descriptionLabel='Description'
            onUpdate={onUpdate}
            handleId={handleId}
          />
          <AlertDialogDemo onDelete={onDelete} />
        </div>
      </CardContent>
    </Card>
  )
}

const StripCardsContainer: React.FC<StripCardsContainerProps> = ({
  strips,
}) => {
  const [ids, setIds] = useState<string | unknown>(null)

  const handleDelete = async (id: string) => {
    console.log('Deleted', id)
  }

  const handleId = async (id: string | unknown) => {
    setIds(id)
    console.log('handleid update', ids)
  }

  const onUpdate = async (data: AddTask) => {
    console.log(ids, data, 'inside update')
  }

  return (
    <div>
      {strips.map((strip, index) => (
        <StripCard
          key={index}
          title={strip.title}
          content={strip.content}
          onDelete={() => handleDelete(strip.id)}
          onUpdate={onUpdate}
          handleId={() => handleId(strip.id)}
        />
      ))}
    </div>
  )
}

export default StripCardsContainer
