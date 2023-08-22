import { useRouter } from "next/router";
import { useState, useEffect, ReactText } from "react";

export const UseActiveLink = (href: string | ReactText) => {
  const [isActive, setActive] = useState<boolean>(false);
  const { pathname } = useRouter();

  useEffect(() => {
    const rootPath = pathname.split("/").filter(Boolean);
    setActive(rootPath[0] === String(href).toLowerCase());
  }, [href, pathname]);

  return isActive;
};
