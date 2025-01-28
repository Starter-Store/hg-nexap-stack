import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: UserRole;
    username?: string; // Add username here
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      username?: string; // Add username here
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    name?: string | null;
    email?: string;
    role?: UserRole;
    username?: string; // Add username here
    accessToken?: string;
  }
}
