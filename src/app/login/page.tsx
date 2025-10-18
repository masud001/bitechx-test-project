"use client";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.email('Enter a valid email')
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, token, error } = useAppSelector((s) => s.auth);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: process.env.AUTH_EMAIL || '' }
  });

  useEffect(() => {
    if (status === 'succeeded' && token) {
      document.cookie = `auth_token=${token}; Path=/; Max-Age=86400`;
      toast.success('Logged in');
      router.push('/products');
    }
  }, [status, token, router]);

  useEffect(() => {
    if (status === 'failed' && error) {
      toast.error(error);
    }
  }, [status, error]);

  const onSubmit = (data: FormData) => {
    dispatch(login(data.email));
  };

  return (
    <main className="mx-auto max-w-md px-4 py-8 flex items-center justify-center h-screen">
      <Card className="w-full">
        <CardHeader className="text-left space-y-3">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please use the same email address for login that you used when applying for the position
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='space-y-1.5'>
                    <FormLabel className='text-sm font-medium'>Email</FormLabel>
                    <FormControl className='w-full pt-1'>
                      <Input className="w-full shadow-sm placeholder:text-muted-foreground/55" type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage className='text-xs text-destructive' />
                  </FormItem>
                )}
              />
              <CardFooter className="p-0">
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full shadow-sm rounded cursor-pointer hover:bg-primary/90"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Logging in…' : 'Login'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}