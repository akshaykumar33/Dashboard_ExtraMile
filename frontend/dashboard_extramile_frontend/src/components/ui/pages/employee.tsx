import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import PopoverDemo from '@/components/ui/pages/add'
import StripCardsContainer from '@/components/ui/pages/view'

const FormSchema = z.object({
  review: z
    .string()
    .min(10, {
      message: 'Review must be at least 10 characters.'
    })
    .max(160, {
      message: 'Review must not be longer than 30 characters.'
    })
})

function Employee() {
  const username = localStorage.getItem('uname')
  const initials = username ? username.substring(0, 2).toUpperCase() : 'AK'
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const [submittedForms, setSubmittedForms] = React.useState<number[]>([]) // Track submitted form indices

  // Generate unique keys for each form
  const formKeys = Array.from({ length: 5 }).map((_, index) => index)

  // Function to handle form submission

  const handleFormSubmit =
    // eslint-disable-next-line prettier/prettier
    (index: number) => (data: z.infer<typeof FormSchema>) => {
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
      // Update submitted forms state
      setSubmittedForms([...submittedForms, index])
    }

  return (
    <>
      <div className='grid  place-self-end mr-8 pr-8'>
        <HoverCard>
          <HoverCardTrigger>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent>
            <Link to='/'>
              <Button
                className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...'
                onClick={() => localStorage.clear()}
              >
                Logout
              </Button>
            </Link>
          </HoverCardContent>
        </HoverCard>
      </div>
      <h1 className='text-lime-500 text-lg underline decoration-wavy decoration-indigo-500 text-transform: capitalize '>
        Welcome to Employee Dashboard,{username ? username : '😍'}
      </h1>

      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 h-12'>
          <TabsTrigger value='reviews' className='h-10'>
            Reviews
          </TabsTrigger>
          <TabsTrigger value='tasks' className='h-10'>
            Tasks
          </TabsTrigger>
        </TabsList>
        <TabsContent value='reviews'>
          <Carousel
            plugins={[plugin.current]}
            className='size-full  grid  place-self-center'
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {formKeys.map(
                (index) =>
                  // Render form only if it has not been submitted
                  !submittedForms.includes(index) && (
                    <CarouselItem key={index}>
                      <div className='p-1'>
                        <Card>
                          <CardContent className='flex aspect-square items-center justify-center p-6'>
                            <EmployeeForm
                              index={index}
                              onSubmit={handleFormSubmit(index)}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </TabsContent>
        <TabsContent value='tasks'>
          <Card>
            <CardContent className='flex flex-col aspect-square items-center p-6 m-4 gap-4'>
              <PopoverDemo
                name='Add Task'
                title='Task'
                subtitle='Add Category and task for Performance Review'
                taskname='Ecommerce'
                categoryLabel='Category'
                descriptionLabel='Description'
              />
              <StripCardsContainer
                strips={[
                  { content: 'abc', title: 'motor', id: '1' },
                  { content: 'xyz', title: 'medical', id: '2' }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

interface EmployeeFormProps {
  index: number
  onSubmit: (data: z.infer<typeof FormSchema>) => void
}

function EmployeeForm({ index, onSubmit }: EmployeeFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='lg:size-full space-y-6'
      >
        <FormField
          control={form.control}
          name='review'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about your views on performance of this task'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> your views and examples.
                <span>Card Number:{index + 1}</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit Feedback</Button>
      </form>
    </Form>
  )
}

export default Employee
