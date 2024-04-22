import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

interface Employee {
  id: string | unknown
  // eslint-disable-next-line prettier/prettier
  name: string
}

interface Performance {
  id: string | unknown
  name: string
}

export const PerformanceParticipate: React.FC = () => {
  const { id: employeeIdFromUrl } = useParams()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [performances, setPerformances] = useState<Performance[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch employees and performances from API
    // Example API calls:
    // fetchEmployees().then(setEmployees);
    // fetchPerformances().then(setPerformances);
    // For now, using dummy data:
    const dummyEmployees: Employee[] = [
      { id: '1', name: 'Employee 1' },
      { id: '2', name: 'Employee 2' }
    ]
    const dummyPerformances: Performance[] = [
      { id: '1', name: 'Performance 1' },
      { id: '2', name: 'Performance 2' }
    ]
    setEmployees(dummyEmployees)
    setPerformances(dummyPerformances)
  }, [])

  const FormSchema = z.object({
    currentemp: z.string().default(() => employeeIdFromUrl || ''),
    participatemp: z.string({
      required_error: 'Please Select a Participant Employee Id.'
    }),
    performance: z.string({
      required_error: 'Please select a Performance to Participate.'
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      FormSchema.parse(data)
      console.log('performance', data)
      // Display loading indicator or disable the form
      navigate(`/employee/${employeeIdFromUrl}`)
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
    } catch (error) {
      console.error('Form submission error:', error)
      // Handle form submission error (e.g., display error message)
    }
  }

  return (
    <div className='flex justify-items-center justify-center m-8 p-8'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-2/3 space-y-6'
        >
          <FormField
            control={form.control}
            name='currentemp'
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee</FormLabel>
                <Select disabled defaultValue={employeeIdFromUrl}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Current Employee' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employees.map((employee) => (
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>This is the Current Employee</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='participatemp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participate Employee</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Participate Employee' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employees.map((employee) => (
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is the Employee to Participate With
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='performance'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Performance</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Performance of Employee' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {performances.map((performance) => (
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      <SelectItem key={performance.id} value={performance.id}>
                        {performance.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is the Performance of Employee
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
