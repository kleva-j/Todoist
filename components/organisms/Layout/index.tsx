import { useSession, signIn } from "next-auth/react";
import { ReactNode, useEffect } from "react";

import UnAuthenticated from "layout/unauthenticated";
import Authenticated from "layout/authenticated";
interface props {
  children: ReactNode;
}

export default function Layout({ children }: props) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session]);

  if (status === "authenticated") {
    return <Authenticated>{children}</Authenticated>;
  }

  return <Authenticated>{children}</Authenticated>;
}
