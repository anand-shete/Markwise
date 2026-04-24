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
import api from '@/api/index';
import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const formSchema = z.object({
  fullname: z.string().min(1, { message: 'Name is Required' }),
  faculty_id: z.string().min(1, { message: 'Faculty ID is Required' }),
  subject: z.string().min(1, { message: 'Subject name is Required' }),
  password: z.string().min(1, { message: 'Password is Required' }),
});

export default function Signup() {
  const navigate = useNavigate();
  const teacher = useSelector(state => state.teacher);

  useEffect(() => {
    if (teacher._id !== null) navigate(`/teacher/dashboard`);
  }, [teacher._id, navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      faculty_id: '',
      subject: '',
      password: '',
    },
  });

  async function submit(data) {
    try {
      await api.post('/teacher/signup', data);
      toast.success('Teacher Account created!', { duration: 4000 });
      navigate('/teacher/login');
    } catch (error) {
      if (error.response.status === 409) navigate('/teacher/login');
      toast.error(error.response.data.message || 'Failed to register teacher', {
        duration: 4000,
      });
    }
  }

  return (
    <div className="flex min-h-svh min-w-full flex-col items-center justify-center">
      <Card className="mt-30">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter details below to register as teacher
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
                        autoComplete="name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="faculty_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Faculty ID</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="123"
                        autoComplete="faculty_id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="cn" type="text" {...field} />
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
                  to="/teacher/login"
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
