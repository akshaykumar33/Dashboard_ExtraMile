import { z, ZodError } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useLocation } from 'react-router-dom';

// Define schema for registration form
const RegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Define schema for login form
const LoginSchema = z.object({
  emailOrUsername: z.string(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginAndRegistrationForm() {

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const { toast } = useToast()

  const { handleSubmit: handleRegisterSubmit, control: registerControl, formState: { errors:registerErrors }  } = useForm<z.infer<typeof RegistrationSchema>>({resolver: zodResolver(RegistrationSchema)});
  const { handleSubmit: handleLoginSubmit, control: loginControl, formState: { errors: loginErrors } } = useForm<z.infer<typeof LoginSchema>>({resolver: zodResolver(LoginSchema)});

  
    const registerForm=useForm<z.infer<typeof RegistrationSchema>>({resolver: zodResolver(RegistrationSchema)});
 const loginForm=useForm<z.infer<typeof LoginSchema>>({resolver: zodResolver(LoginSchema)});
  
  // eslint-disable-next-line prettier/prettier
  const onRegisterSubmit = async (data: z.infer<typeof RegistrationSchema>) => {
    try {
      // Validate form data
      RegistrationSchema.parse(data);
       console.log("inside submit for register")
      // Initiate OTP verification process
      // Navigate to OTP verification page
      // Implement OTP logic
      toast({
        title: "SucessFully Done😎 ",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Registration Successful👍</code>
          </pre>
        ),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        console.error('Validation errors:', error.errors);
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Validation failed</code>
            </pre>
          ),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      
      } else {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">An unexpected error occurred</code>
            </pre>
          ),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        
      }
    }
  };

  const onLoginSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      // Validate form data
      LoginSchema.parse(data);
      console.log("inside submit")
      // Initiate login process
      // Implement login logic
      toast({
        title: "SucessFully Done😎 ",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Login Successful 👍</code>
          </pre>
        ),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        console.error('Validation errors:', error.errors);
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Validation failed</code>
            </pre>
          ),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      
      } else {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        toast({
          variant: "destructive",
          title: "Failed",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">An unexpected error occurred</code>
            </pre>
          ),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        
      }
    }
  };

  return (
    <div>
      {pathname && pathname.includes('register') ? (
        <Form {...registerForm}>
        <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
          <FormField
            control={registerControl}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage>{registerErrors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={registerControl}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display Username.
                </FormDescription>
                <FormMessage>{registerErrors.username?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={registerControl}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage>{registerErrors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={registerControl}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" type="password" {...field} />
                </FormControl>
                <FormMessage>{registerErrors.confirmPassword?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
        </Form>
      ) : (
        <Form {...loginForm}>
        <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
          <FormField
            control={loginControl}
            name="emailOrUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username/Email</FormLabel>
                <FormControl>
                  <Input placeholder="Username/Email" {...field} />
                </FormControl>
                <FormMessage>{loginErrors.emailOrUsername?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={loginControl}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage>{loginErrors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
        </Form>
      )}
      
    </div>
  );
}
