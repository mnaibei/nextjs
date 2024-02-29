import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: any }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser?._id.toString();
        return { ...session };
      } catch (error) {
        console.error("Error fetching user in session callback:", error);
        // Handle the error appropriately
      }
    },

    async signIn({ profile }) {
      if (!profile) {
        return false;
      }

      try {
        await connectToDatabase();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile?.name?.replace(/\s/g, "").toLowerCase(),
            image: profile.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
