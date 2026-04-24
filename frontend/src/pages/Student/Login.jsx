import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import api from "@/api";
import { Link, useNavigate } from "react-router";

const formSchema = z.object({
  prn: z.string().min(1, { message: "PRN is Required" }),
  password: z.string().min(1, { message: "Password is Required" }),
});

export default function Login() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prn: "",
      password: "",
    },
  });

  async function submit(data) {
    try {
      await api.post("/student/login", data);
      toast.success("Login Success!", { duration: 4000 });
      navigate(`/student/dashboard`);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to Login Student", {
        duration: 4000,
      });
    }
  }

  return (
    <div className="min-h-svh min-w-full flex flex-col justify-center items-center">
      <Card className="my-20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription>
            Enter your email below to Login as Student
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
              <Button type="submit">Login</Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/student/signup"
                  className="underline underline-offset-4"
                >
                  Signup{" "}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
