// @ts-nocheck
import connectDB from "@/config/database";
import User from "@/models/User";
import { Session, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface GoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }: { profile: GoogleProfile }) {
      await connectDB();
      const userExist = await User.findOne({ email: profile.email });

      if (!userExist) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },

    async session({ session }: { session: Session & { user: { id: string } } }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
};
