import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { PopoverDemoProps } from '@/types/pages'
import TaskForm from '@/components/ui/pages/task-form'
import { Button } from '@/components/ui/button'
import { AddTask } from '@/types/pages'

const PopoverDemo: React.FC<PopoverDemoProps> = ({
  name,
  title,
  taskname,
  subtitle,
  categoryLabel,
  descriptionLabel
}) => {
  const onAdd = async (data: AddTask | unknown) => {
    console.log('Add', data)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>{name}</Button>
      </PopoverTrigger>

      <PopoverContent className='w-full'>
        <div className='space-y-4'>
          <div>
            <h4 className='font-medium'>{title}</h4>
            <p className='text-sm text-muted-foreground'>{subtitle}</p>
          </div>
          <TaskForm
            click={onAdd}
            name={taskname}
            categoryLabel={categoryLabel}
            descriptionLabel={descriptionLabel}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverDemo
