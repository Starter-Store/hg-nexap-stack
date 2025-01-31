import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

// ✅ User Schema
export const userSchema = z
  .object({
    id: z.string().uuid(), // UUID format
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    nomComplet: z.string().min(2, "nomComplet must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.optional(z.string().min(6)),
    sexe: z.enum(["M", "F"]),
    role: z.enum(["ADMIN", "USER"]), // Strict roles
    createdAt: z.string().datetime(), // ISO 8601 format
  })
  .passthrough();

// export const SettingsSchema = z
//   .object({
//     name: z.optional(z.string()),
//     isTwoFactorEnabled: z.optional(z.boolean()),
//     role: z.enum([UserRole.ADMIN, UserRole.USER]),
//     email: z.optional(z.string().email()),
//     password: z.optional(z.string().min(6)),
//     newPassword: z.optional(z.string().min(6)),
//   })
//   .refine(
//     (data) => {
//       if (data.password && !data.newPassword) {
//         return false;
//       }

//       return true;
//     },
//     {
//       message: "New password is required",
//       path: ["newPassword"],
//     }
//   )
//   .refine(
//     (data) => {
//       if (data.newPassword && !data.password) {
//         return false;
//       }

//       return true;
//     },
//     {
//       message: "Password is required",
//       path: ["password"],
//     }
//   );
// ✅ Infer TypeScript Types from Zod
export type User = z.infer<typeof userSchema>;
