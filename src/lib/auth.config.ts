import type { NextAuthConfig } from "next-auth";
import Credentials, { CredentialInput } from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      } as Record<string, CredentialInput>,
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        }; // Explicit typing

        if (!email || !password) {
          throw new Error("Email and Password are required.");
          // return { error: "Email and Password are required." };
        }

        try {
          // Make a POST request to the external API
          const response = await fetch(
            `${process.env.EXTERNAL_API_BASE_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Authentication failed.");
          }

          const data = await response.json();

          // Ensure the returned object matches the expected User type
          return {
            id: data.data?.id,
            email: data.email,
            name: data.data?.nomComplet ?? undefined, // Convert `null` to `undefined`
            accessToken: data.data?.token,
            username: data.data?.nomComplet ?? undefined, // Convert `null` to `undefined`
            role: data.data?.role,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication error occurred.");
          // return { error: error.message || "Authentication error occurred." };
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
