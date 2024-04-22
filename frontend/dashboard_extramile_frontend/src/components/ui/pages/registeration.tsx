import { z, ZodError } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { Link } from 'react-router-dom'

// Define schema for registration form
const RegistrationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

function Registeration() {
  const { toast } = useToast()

  const {
    handleSubmit: handleRegisterSubmit,
    control: registerControl,
    formState: { errors: registerErrors },
  } = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
  })

  const registerForm = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
  })

  // eslint-disable-next-line prettier/prettier
  const onRegisterSubmit = async (data: z.infer<typeof RegistrationSchema>) => {
    try {
      // Validate form data
      RegistrationSchema.parse(data)
      console.log('inside submit for register')
      // Initiate OTP verification process
      // Navigate to OTP verification page
      // Implement OTP logic
      toast({
        title: 'SucessFully Done😎 ',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>Registration Successful👍</code>
          </pre>
        ),
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
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
        // Handle unexpected errors
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
    <Card className='mx-auto max-w-xl card-shadow'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign Up</CardTitle>
        <CardDescription className='text-l'>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...registerForm}>
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <FormField
                  control={registerControl}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage>{registerErrors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid gap-2'>
                <FormField
                  control={registerControl}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='Username' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display Username.
                      </FormDescription>
                      <FormMessage>
                        {registerErrors.username?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid gap-2'>
                <FormField
                  control={registerControl}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {registerErrors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid gap-2'>
                <FormField
                  control={registerControl}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Confirm Password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {registerErrors.confirmPassword?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-2 md:ml-28 lg:ml-32 ml-20'>
                <Button className='glow' type='submit'>
                  Create an account
                </Button>
                <Button className='bg-fuchsia-500 shadow-lg shadow-cyan-500/50 text-xl text-white'>
                  Sign up with GitHub
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link to='/form/login' className='underline'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default Registeration
