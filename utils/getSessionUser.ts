import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

type ExtendedUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
};

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }
    const user = session.user as ExtendedUser;
    return {
      user,
      userId: user.id, 
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
