"use server";

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/user";
import { AuthError } from "next-auth";

import * as z from "zod";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callback?: string | null
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
