"use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { PasswordInput } from "@/components/ui/password-input";
// import { loginSchema } from "@/schemas/user";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import OAuthLogin from "@/components/auth/OAuthLogin";
// import { Button } from "@/components/ui/button";
// import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes.config";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useTransition } from "react";
// import { login } from "../../../actions/login";

// const LoginForm = () => {
//   const searchParams = useSearchParams();
//   const callback = searchParams.get("callbackUrl");
//   const [isPending, starttransition] = useTransition();
//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof loginSchema>) {
//     starttransition(async () => {
//       login(values, callback)
//         .then((_value) => {
//           window.location.href = callback || DEFAULT_LOGIN_REDIRECT;
//         })
//         .then((data) => {
//           console.log(data);
//           // if (data?.success) {
//           //   form.reset();
//           // window.location.href = data?.redirectTo;
//           // }
//         });
//     });
//   }

//   return (
//     <>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <div className="grid gap-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem className="grid gap-2">
//                   <FormLabel htmlFor="email">Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       id="email"
//                       placeholder="johndoe@mail.com"
//                       type="email"
//                       autoComplete="email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem className="grid gap-2">
//                   <div className="flex justify-between items-center">
//                     <FormLabel htmlFor="password">Password</FormLabel>
//                     <Link
//                       href="/auth/register"
//                       className="ml-auto inline-block text-sm underline"
//                     >
//                       Forgot your password?
//                     </Link>
//                   </div>
//                   <FormControl>
//                     <PasswordInput
//                       id="password"
//                       placeholder="******"
//                       autoComplete="current-password"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button disabled={isPending} type="submit" className="w-full">
//               Login
//             </Button>
//           </div>
//         </form>
//       </Form>
//       <div className="my-2 flex items-center justify-center">
//         ------OR------
//       </div>
//       <OAuthLogin />
//     </>
//   );
// };

// export default LoginForm;

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema } from "@/schemas/user";
import { useForm } from "react-hook-form";
import { z } from "zod";

import OAuthLogin from "@/components/auth/OAuthLogin";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes.config";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { login } from "../../../actions/login";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        const response = await login(values, callback);
        // .then((data) => {
        //   if (data?.error) {
        //     form.reset();
        //     setError(data.error);
        //   }

        //   if (data?.success) {
        //     form.reset();
        //     setSuccess(data?.success);
        //   }

        //   if (data?.twoFactor) {
        //     setShowTwoFactor(true);
        //   }
        // })
        // .catch(() => setError("Something went wrong"));

        if (response?.error) {
          setErrorMessage(response.error);
          setSuccessMessage(null);
        } else {
          setSuccessMessage("Login successful!");
          setErrorMessage(null);
          window.location.href = callback || DEFAULT_LOGIN_REDIRECT;
        }
      } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again.");
        setSuccessMessage(null);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            {/* Display success or error messages */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm text-center">
                {successMessage}
              </p>
            )}

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="johndoe@mail.com"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="/auth/register"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="******"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className="my-2 flex items-center justify-center">
        ------OR------
      </div>
      <OAuthLogin />
    </>
  );
};

export default LoginForm;
