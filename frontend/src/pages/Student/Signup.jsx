import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const formSchema = z.object({
  fullname: z.string().min(1, { message: 'Name is Required' }),
  prn: z.string().min(1, { message: 'PRN is Required' }),
  password: z.string().min(1, { message: 'Password is Required' }),
});

export default function Signup() {
  const navigate = useNavigate();
  const student = useSelector(state => state.student);

  useEffect(() => {
    if (student._id !== null) navigate(`/student/dashboard`);
  }, [student._id, navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      prn: '',
      password: '',
    },
  });

  async function submit(data) {
    try {
      await api.post('/student/signup', data);
      toast.success('Student Account created!', { duration: 4000 });
      navigate(`/student/login`);
    } catch (error) {
      if (error.response.status === 409) navigate('/student/login');
      toast.error(error.response.data.message || 'Failed to Register Student', {
        duration: 4000,
      });
    }
  }
  return (
    <div className="flex min-h-svh min-w-full flex-col items-center justify-center">
      <Card className="mt-20">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email below to Signup as Student
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
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="test"
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
                name="prn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">PRN</FormLabel>
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
              <Button type="submit">Sign Up</Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link
                  to="/student/login"
                  className="underline underline-offset-4"
                >
                  Login{' '}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
