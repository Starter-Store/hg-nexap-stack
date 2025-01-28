import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role =
          typeof token.role === "string" &&
          ["ADMIN", "USER"].includes(token.role)
            ? token.role
            : undefined;
        // ) as UserRole;
        session.user.username = token.username as string; // Assign username from token
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Ensure role matches the type `"ADMIN" | "USER"`
        token.username = user.username; // Assign username from user object
        token.accessToken = user?.accessToken; // Replace with your logic
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
