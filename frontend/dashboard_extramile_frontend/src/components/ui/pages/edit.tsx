import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DialogDemoProps } from '@/types/pages'
import TaskForm from '@/components/ui/pages/task-form'

const DialogDemo: React.FC<DialogDemoProps> = ({
  name,
  description,
  taskname,
  categoryLabel,
  descriptionLabel,
  onUpdate,
  handleId
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-16 h-4' onClick={handleId}>
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit {name}</DialogTitle>
          <DialogDescription>
            Make changes to your {description} here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <TaskForm
            click={onUpdate}
            name={taskname}
            categoryLabel={categoryLabel}
            descriptionLabel={descriptionLabel}
          />
        </div>
        
      </DialogContent>
    </Dialog>
  )
}

export default DialogDemo
