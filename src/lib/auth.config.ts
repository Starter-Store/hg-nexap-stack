import { axios } from "@/lib/axios";
import type { NextAuthConfig } from "next-auth";
import Credentials, { CredentialInput } from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

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
          throw new Error("L'e-mail et le mot de passe sont requis.");
          // return { error: "Email and Password are required." };
        }

        // try {
        //   // Make a POST request to the external API
        //   const response = await fetch(
        //     `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/login`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ email, password }),
        //     }
        //   );

        //   if (!response.ok) {
        //     const error = await response.json();
        //     throw new Error(error.message || "L'authentification a échoué.");
        //   } else {
        //     const data = await response.json();
        //     const cookieStore = await cookies();

        //     cookieStore.set("hg-acctok", data.data?.token); // Le token expire dans 7 jours

        //     return {
        //       id: data.data?.id,
        //       email: data.email,
        //       name: data.data?.nomComplet ?? undefined, // Convert `null` to `undefined`
        //       accessToken: data.data?.token,
        //       username: data.data?.nomComplet ?? undefined, // Convert `null` to `undefined`
        //       role: data.data?.role,
        //     };
        //   }
        // } catch (error: any) {
        //   throw new Error(
        //     error.message || "Une erreur d'authentification s'est produite."
        //   );
        //   // return { error: error.message || "Authentication error occurred." };
        // }

        try {
          // Envoi de la requête POST avec Axios
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/login`,
            { email, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Vérification de la réponse
          const data = response.data;
          if (!data || !data.data) {
            throw new Error("Données invalides reçues.");
          }

          // Stockage du token dans les cookies
          const cookieStore = await cookies();
          cookieStore.set("hg-acctok", data?.data?.token);

          // Retour des données utilisateur
          return {
            id: data.data?.id,
            email: data.email,
            name: data.data?.nomComplet ?? undefined,
            accessToken: data.data?.token,
            username: data.data?.nomComplet ?? undefined,
            role: data.data?.role,
          };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            "Une erreur d'authentification s'est produite.";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
