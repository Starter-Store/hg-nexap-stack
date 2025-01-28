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
import { useTransition } from "react";
import { toast } from "sonner";
import { login } from "../../../actions/login";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();

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
        await login(values, callback).then((response) => {
          if (response?.error) {
            toast.error(response.error);
          } else {
            toast.success("Connexion réussie !");
            window.location.href = callback || DEFAULT_LOGIN_REDIRECT;
          }
        });
      } catch (error) {
        toast.error(
          "Une erreur inattendue s'est produite. Veuillez réessayer."
        );
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
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
