import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const username = credentials?.username;
        const password = credentials?.password;

        if (typeof username !== "string" || typeof password !== "string") {
          return null;
        }

        const appUsername = process.env.APP_USERNAME;
        const appPasswordHash = process.env.APP_PASSWORD_HASH;

        if (!appUsername || !appPasswordHash) {
          throw new Error(
            "APP_USERNAME atau APP_PASSWORD_HASH belum diset di .env"
          );
        }

        if (username !== appUsername) {
          return null;
        }

        const cocok = await bcrypt.compare(password, appPasswordHash);
        if (!cocok) {
          return null;
        }

        return { id: "pemilik", name: appUsername };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
