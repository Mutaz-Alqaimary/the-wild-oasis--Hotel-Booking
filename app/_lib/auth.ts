import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  // Explicitly use JWT sessions
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(String(user?.email));

        if (!existingGuest)
          await createGuest({
            email: String(user?.email),
            fullName: String(user?.name),
          });

        return true;
      } catch {
        return false;
      }
    },
    // Store guestId in the JWT once the user is available (first sign-in)
    async jwt({ token, user }) {
      if (user?.email) {
        const guest = await getGuest(String(user.email));
        if (guest) token.guestId = guest.id;
      }
      return token;
    },
     // Read guestId from the JWT into the session
    async session({ session, token }) {
      if (token?.guestId) {
        // user is guaranteed to exist on session in NextAuth
        session.user.guestId = String(token.guestId);
      } else if (session.user?.email) {
        // Fallback in case jwt didn't have it for some reason
        const guest = await getGuest(String(session.user.email));
        if (guest) session.user.guestId = guest.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
