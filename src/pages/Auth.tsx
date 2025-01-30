import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const authSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine((email) => !email.endsWith("example.com"), {
      message: "Please use a valid email address, not an example domain",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["artist", "customer"]).optional(),
});

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "customer",
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>, isLogin: boolean) => {
    if (cooldownTime > 0) {
      toast({
        variant: "destructive",
        title: "Please wait",
        description: `Please wait ${cooldownTime} seconds before trying again.`,
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log("Attempting auth with values:", { 
        email: values.email, 
        isLogin, 
        role: values.role 
      });
      
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email.trim(),
          password: values.password,
        });

        console.log("Login response:", { data, error });

        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });

        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email.trim(),
          password: values.password,
          options: {
            data: {
              role: values.role,
            },
          },
        });

        console.log("Signup response:", { data, error });

        if (error) throw error;

        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        });

        navigate("/");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      let errorMessage = "An error occurred during authentication.";
      
      if (error.message === "Invalid login credentials") {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("User already registered")) {
        errorMessage = "This email is already registered. Please try logging in instead.";
      } else if (error.message.includes("invalid")) {
        errorMessage = "Please enter a valid email address. Example domains are not allowed.";
      } else if (error.message.includes("rate limit") || error.code === "over_email_send_rate_limit") {
        const waitTime = parseInt(error.message.match(/\d+/)?.[0] || "60");
        setCooldownTime(waitTime);
        
        // Start countdown
        const timer = setInterval(() => {
          setCooldownTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        errorMessage = `Please wait ${waitTime} seconds before trying again.`;
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Artistcia
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account or sign in
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const isLogin = form.getValues().role === undefined;
              form.handleSubmit((values) => onSubmit(values, isLogin))(e);
            }}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TabsContent value="register" className="space-y-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I want to join as</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="customer">Art Lover</SelectItem>
                          <SelectItem value="artist">Artist</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="login">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              </TabsContent>

              <TabsContent value="register">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  Create Account
                </Button>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;