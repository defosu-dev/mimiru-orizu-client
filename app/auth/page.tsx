'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username or Matrix ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  displayName: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', displayName: '', password: '', confirmPassword: '' },
  });

  const onLogin = async (data: LoginForm) => {
    setIsLoading(true);
    console.log('Login attempt:', data);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const onRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    console.log('Register attempt:', data);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-indigo-950/20 dark:to-purple-950/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/90 supports-backdrop-blur:bg-white/60 supports-backdrop-blur:dark:bg-gray-900/70">
          <CardHeader className="text-center space-y-4 pb-8 pt-10">
            <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-bold">O</span>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Orizu
              </CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-400 mt-2">
                {mode === 'login'
                  ? 'Welcome back! Sign in to continue.'
                  : 'Join Orizu and start chatting securely.'}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pb-10">
            <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'register')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-9 h-12 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 p-1">
                <TabsTrigger
                  value="login"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-indigo-400 transition-all font-medium"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-indigo-400 transition-all font-medium"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {mode === 'login' ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="login-username" className="text-foreground/80">Matrix ID</Label>
                        <Input
                          id="login-username"
                          placeholder="@user:homeserver.org"
                          className="h-12 text-base border-gray-300 dark:border-gray-700 focus-visible:ring-indigo-500 focus-visible:ring-2"
                          autoComplete="username"
                          {...loginForm.register('username')}
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-sm text-destructive">{loginForm.formState.errors.username.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-foreground/80">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          className="h-12 text-base border-gray-300 dark:border-gray-700 focus-visible:ring-indigo-500 focus-visible:ring-2"
                          autoComplete="current-password"
                          {...loginForm.register('password')}
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="reg-username" className="text-foreground/80">Username</Label>
                        <Input
                          id="reg-username"
                          placeholder="myusername"
                          className="h-12 text-base border-gray-300 dark:border-gray-700 focus-visible:ring-indigo-500 focus-visible:ring-2"
                          autoComplete="username"
                          {...registerForm.register('username')}
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-displayname" className="text-foreground/80">Display Name <span className="text-gray-500">(optional)</span></Label>
                        <Input
                          id="reg-displayname"
                          placeholder="My Full Name"
                          className="h-12 text-base border-gray-300 dark:border-gray-700 focus-visible:ring-indigo-500 focus-visible:ring-2"
                          {...registerForm.register('displayName')}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-password" className="text-foreground/80">Password</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          className="h-12 text-base border-gray-300 dark:border-gray-700 focus-visible:ring-indigo-500 focus-visible:ring-2"
                          autoComplete="new-password"
                          {...registerForm.register('password')}
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-confirm" className="text-foreground/80">Confirm Password</Label>
                        <Input
                          id="reg-confirm"
                          type="password"
                          className="h-12 text-base border-gray-300 dark:border-gray-700 focus-visible:ring-indigo-500 focus-visible:ring-2"
                          autoComplete="new-password"
                          {...registerForm.register('confirmPassword')}
                        />
                        {registerForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-destructive">
                            {registerForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}