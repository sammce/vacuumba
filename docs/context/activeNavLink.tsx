import React, { createContext, useContext, useState } from "react";
import { useInView } from "react-intersection-observer";

const Ctx = createContext<[string, (link: string) => void]>([
  "",
  (link: string) => void 0,
]);

export function useNavLink() {
  return useContext(Ctx);
}

export default function NavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLink, setActiveLink] = useState("");

  return (
    <Ctx.Provider value={[activeLink, setActiveLink]}>{children}</Ctx.Provider>
  );
}
