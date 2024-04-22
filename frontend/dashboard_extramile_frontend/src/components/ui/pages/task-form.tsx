import { z, ZodError } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { TaskProps } from '@/types/pages'

const taskSchema = z.object({
  category: z.string(),
  description: z.string(),
  taskname: z.string(),
})

function TaskForm({ name, categoryLabel, descriptionLabel, click }: TaskProps) {
  const { toast } = useToast()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
  })

  const taskForm = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
  })

  // eslint-disable-next-line prettier/prettier
  const onTaskSubmit = async (data: z.infer<typeof taskSchema>) => {
    try {
      taskSchema.parse(data)
      await click(data)
      console.log('inside submit for register')
      toast({
        title: 'SucessFully Done😎 ',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>Task Successfully Submitted👍</code>
          </pre>
        ),
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation errors:', error.errors)
        toast({
          variant: 'destructive',
          title: 'Failed',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>Validation failed</code>
            </pre>
          ),
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
      } else {
        console.error('Unexpected error:', error)
        toast({
          variant: 'destructive',
          title: 'Failed',
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>An unexpected error occurred</code>
            </pre>
          ),
          action: <ToastAction altText='Try again'>Try again</ToastAction>,
        })
      }
    }
  }

  return (
    <Form {...taskForm}>
      <form onSubmit={handleSubmit(onTaskSubmit)} className='grid gap-4'>
        <div className='grid items-center'>
          <FormField
            control={control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{categoryLabel}</FormLabel>
                <FormControl>
                  <Input placeholder='Category' {...field} className='h-8' />
                </FormControl>
                <FormMessage>{errors.category?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className='grid items-center'>
          <FormField
            control={control}
            name='taskname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{name}</FormLabel>
                <FormControl>
                  <Input placeholder='Task' {...field} className='h-8' />
                </FormControl>
                <FormMessage>{errors.taskname?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className='grid items-center'>
          <FormField
            control={control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{descriptionLabel}</FormLabel>
                <FormControl>
                  <Input placeholder='Description' {...field} className='h-8' />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <Button type='submit'>Save</Button>
      </form>
    </Form>
  )
}

export default TaskForm
