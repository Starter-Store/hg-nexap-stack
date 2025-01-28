import { auth } from "@/lib/auth";

export const currenUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currenRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
