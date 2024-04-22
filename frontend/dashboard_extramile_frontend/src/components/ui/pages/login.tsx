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

// Define schema for login form
const LoginSchema = z.object({
  emailOrUsername: z.string(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

function Login() {
  const { toast } = useToast()

  const {
    handleSubmit: handleLoginSubmit,
    control: loginControl,
    formState: { errors: loginErrors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })

  // eslint-disable-next-line prettier/prettier
  const onLoginSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      // Validate form data
      LoginSchema.parse(data)
      console.log('inside submit')
      // Initiate login process
      // Implement login logic
      toast({
        title: 'SucessFully Done😎 ',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>Login Successful 👍</code>
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
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <FormField
                  control={loginControl}
                  name='emailOrUsername'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username/Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Username/Email' {...field} />
                      </FormControl>
                      <FormMessage>
                        {loginErrors.emailOrUsername?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid gap-2'>
                <FormField
                  control={loginControl}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center'>
                        <FormLabel>Password</FormLabel>
                        <Link
                          to='/'
                          className='ml-auto inline-block text-sm underline'
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          placeholder='Password'
                          type='password'
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage>{loginErrors.password?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-2 md:ml-28 lg:ml-32 ml-20'>
                <Button className='glow' type='submit'>
                  Login
                </Button>
                <Button className='bg-fuchsia-500 shadow-lg shadow-cyan-500/50 text-xl  text-white'>
                  Login with Google
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link to='/form/register' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default Login
