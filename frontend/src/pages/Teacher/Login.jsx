import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import api from '@/api';
import { Link, useNavigate } from 'react-router';

const formSchema = z.object({
  faculty_id: z.string().min(1, { message: 'Faculty ID is Required' }),
  password: z.string().min(1, { message: 'Password is Required' }),
});

export default function Login() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      faculty_id: '',
      password: '',
    },
  });

  async function submit(data) {
    try {
      await api.post('/teacher/login', data);
      toast.success('Login Success!', { duration: 4000 });
      navigate(`/teacher/dashboard`);
    } catch (error) {
      toast.error(error.response.data.message || 'Failed to register teacher', {
        duration: 4000,
      });
    }
  }

  return (
    <div className="flex min-h-svh min-w-full flex-col items-center justify-center">
      <Card className="mx-10 my-20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl">
            Login
          </CardTitle>
          <CardDescription className={'text-center'}>
            Enter your details to Login as Teacher
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col space-y-5"
            >
              <FormField
                control={form.control}
                name="faculty_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Faculty ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        type="text"
                        autoComplete="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="123" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <Link
                  to="/teacher/signup"
                  className="underline underline-offset-4"
                >
                  Signup{' '}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
